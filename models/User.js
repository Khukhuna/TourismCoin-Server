const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true},
  username: { type: String, unique: true},
  hashed_password: String,
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tourismncoin');

module.exports = mongoose.model('user', userSchema);
