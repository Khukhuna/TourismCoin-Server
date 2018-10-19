const jwt = require('jsonwebtoken');

const register = require('./authentication/register');
const login = require("./authentication/login.js");
const profile = require("./authentication/profiles.js");

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

  router.post('/login', (req, res) => {
		const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
			res.status(400).json({ message: 'Invalid Request !' });
		}else {
			login.loginUser(username, password)
			   .then(result => {
				       const token = jwt.sign(result, "SECRET_KEY", { expiresIn: 1440 });
				       res.status(result.status).json({ message: result.message, token: token });
			   })
         .catch(err => {
           res.status(505).json({ message: err.message })
         });
		}
  });

  router.get('/profiles/:username', (req, res) => {
    const username = req.params.username;
    // Token validation will be implemented later if i'll have enough time
    if(!username){
      res.status(400).json({ message: "Invalid Request! "});
    }else{
      profile.getProfile(username)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(res.status).json({ message: err.message });
      });
    }
  });
}
