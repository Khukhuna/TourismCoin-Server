const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./authentication/register');

module.exports = router => {

  router.get('/', (req, res) => res.send('Initial Commit!'));

  router.post('/register', (req, res) => {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password || !username.trim() || !email.trim() || !password.trim()) {
      res.status(400).json({
        message: 'Invalid Request !'
      });
    } else {
      register.registerUser(first_name, last_name, email, username, password)
        .then(result => {
          res.status(result.status).json({
            message: result.message
          })
        })
        .catch(err => res.status(err.status).json({
          message: err.message
        }));
    }
  });
}
