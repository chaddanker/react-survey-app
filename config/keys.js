if (process.env.NODE_ENV === "production"){ //automatically happens on heroku
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}