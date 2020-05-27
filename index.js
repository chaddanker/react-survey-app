const express = require('express'); //common js modules
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User'); //require models before passport
require('./services/passport');
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}); //hides mongo URI in cofig/keys file

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms - time before cookie expires
	keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//making sure express will serve up production assets like main.js
	app.use(express.static('client/build'));
	//NB order of operations
	//express will serve up index.html if it doesn't recognise the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
};

const PORT = process.env.PORT || 5000;

//change to PORT
app.listen(PORT, function(){
	console.log('Server has started...')
});