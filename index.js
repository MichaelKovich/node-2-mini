const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const controller = require('./controller');
require('dotenv').config();

// Instantiate Express
const app = express();

// Invoke massive, pass in CONNECTION_STRING from .env, and then
massive(process.env.CONNECTION_STRING).then((dbInstance) => {
  app.set('db', dbInstance); // Give our Express application access to the database.
  // dbInstance.new_planes() // Call dbInstance.new.planes
  //   .then(planes => console.log(planes)) // .then console.log(planes)
  //   .catch(err => console.log(err)); // Catch and console.log errors
  // dbInstance.get_planes()
  //   .then(planes => console.log(planes))
  //   .catch(err => console.log(err));
});

app.use(bodyParser.json());
app.use(cors());

app.get('/api/planes', controller.getPlanes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
