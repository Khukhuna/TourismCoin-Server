const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

exports.loginUser = (username, password) =>

  new Promise((resolve, reject) => {

    User.find({username: username})
      .then(users => {
        if (users.length == 0) {
          reject({status: 404, message: 'User Not Found !'});
        }else {
          return users[0];
        }
      })
      .then(user => {
        const hashed_password = user.hashed_password;

        if (bcrypt.compareSync(password, hashed_password)) {
          resolve({status: 200, message: username});
        }else {
          reject({status: 401, message: 'Invalid Credentials !'});
        }
      })
      .catch(err => reject({status: 500, message: 'Internal Server Error !'}));
  });
