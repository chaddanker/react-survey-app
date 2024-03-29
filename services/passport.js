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
		callbackURL: '/auth/google/callback',
		proxy: true
	}, async (accessToken, refreshToken, profile, done) => {
		const existingUser = await User.findOne({ googleId: profile.id });
		
			if(existingUser){
				//we already have a record with the given profile id
				done(null, existingUser); //done(error, obbject)
			}
			//create a new user, we dont have a record with this user id
			const user = await new User({ googleId: profile.id }).save();
			return done(null, user);

			
		
	})
);

