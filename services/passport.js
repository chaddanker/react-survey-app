const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => { //first arg - whatever you put into cookie
	User.findById(id).then(user => {
		done(null, user);
	});
});


passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID, 
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ googleId: profile.id }).then((existingUser) => { 
			if(existingUser){
				//we already have a record with the given profile id
				done(null, existingUser); //done(error, obbject)
			} else {
				//create a new user, we dont have a record with this user id
				new User({ googleId: profile.id }).save().then((user) => done(null, user)); //creates new model instance - saves instance - always make us eof object in callback
			}
		});

		
	})
);

