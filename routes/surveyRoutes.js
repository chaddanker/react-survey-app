const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash'); //NB
const { Path } = require('path-parser');
const { URL } = require('url');//default/ integrated module w/ node - has helpers to parse urls

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id })
			.select({ recipients: false });

		res.send(surveys);
	});

	app.get('/api/surveys/:survey_id/:choice', (req, res) => {
		res.send('thanks for voting');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:survey_id/:choice');
		//REFACTORED WITH LODASH CHAIN:
		_.chain(req.body) //iterate over
						.map(({ url, email }) => { //use of lodash - map over
							const match = p.test(new URL(url).pathname); //returns object with survey_id and choice
							if(match){
								return { email, survey_id: match.survey_id, choice: match.choice };
							}
						})
						.compact() 
						.uniqBy('email', 'survey_id')
						.each(({survey_id, email, choice}) => {
							Survey.updateOne(
								{
									_id: survey_id,
									recipients: {
										$elemMatch: { email: email, responded: false }
									}
								}, {
									$inc: { [choice]: 1 }, //increment choice by 1
									$set: { 'recipients.$.responded': true }, //update responded property to true
									lastResponded: new Date()
								}).exec(); //executes query
						})
						.value();

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body; //destructuring

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now() 
		});

		//send emails
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();

			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user); //send back updated user model with updated credits
		} catch (err){
			res.status(422).send(err);
		}
	});

};