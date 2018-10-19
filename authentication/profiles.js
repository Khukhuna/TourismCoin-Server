const user = require('../models/User.js');

exports.getProfile = username =>
	new Promise((resolve,reject) => {
		user.find({ username: username })
		.then(users => {
      resolve(users[0])
    })
		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))
});
