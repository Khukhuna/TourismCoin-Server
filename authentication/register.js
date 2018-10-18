const user = require('../models/User.js');
const bcrypt = require('bcryptjs');

exports.registerUser = (first_name, last_name, email, username, password) =>
  new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new user({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      hashed_password: hash
    });

    newUser.save()
      .then(() => resolve({
        status: 201,
        message: 'User Registered Sucessfully !'
      }))
      .catch(err => {
        if (err.code == 11000) {
          reject({
            status: 409,
            message: 'User Already Registered !'
          });
        } else {
          reject({
            status: 500,
            message: 'Internal Server Error !'
          });
        }
      });
  });
