const express = require('express'); //common js modules
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User'); //require models before passport
require('./services/passport');
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}); //hides mongo URI in cofig/keys file

const app = express();

app.use(
	cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms - time before cookie expires
	keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;

//change to PORT
app.listen(PORT, function(){
	console.log('Server has started...')
});