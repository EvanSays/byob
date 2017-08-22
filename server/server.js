const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const db = require('knex')(configuration);

app.set('port', process.env.PORT || 3300);

app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/../public/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`)
});
