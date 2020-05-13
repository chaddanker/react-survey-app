const mongoose = require('mongoose');
const { Schema } = mongoose; //destructuring. this is = to const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String
}); // can add/ remove properties

mongoose.model('users', userSchema); //tells mongoose to make a new collection called users

