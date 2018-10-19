const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes')(router);
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
