//capital as it exports a class as opposed to passport
const sendgrid = require('sendgrid');
const helper = sendgrid.mail; //consistant with sg docs
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey); // pass in api key returns object to comm w/ api
		this.from_email = new helper.Email('chaddanker@gmail.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients); //array of emails //1

		this.addContent(this.body); //built in functions
		this.addClickTracking(); //2
		this.addRecipients(); //3
	}

	formatAddresses(recipients) { //1
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() { //2
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() { //3
		const personalize = new helper.Personalization();

		this.recipients.forEach( recipient => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);

	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON() //defined my Mailer base class
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;