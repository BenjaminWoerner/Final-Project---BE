const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  favorites: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;