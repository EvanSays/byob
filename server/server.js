const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const db = require('knex')(configuration);
const routes = require('./routes.js');

app.set('port', process.env.PORT || 6333);

app.use(express.static(path.join('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.sendFile(path.join(`${__dirname}/../index.html`));
});

//= --> GET ALL JOURNALS FROM 'JOURNALS' <--=//
app.get(routes.getAllJournals, (request, response) => {
  db('journals').select()
    .then(data => response.status(200).json({ data }))
    .catch(error => console.log(error));
});

//= --> GET ALL GENES FROM 'GENES' <--=//
app.get(routes.getAllGenes, (request, response) => {
  db('genes').select()
    .then(data => response.status(200).json({ data }))
    .catch(error => console.log(erorr));
});

//= --> GET SPECIFIED JOURNAL FROM 'JOURNALS' <--=//
app.get(`${routes.getAllJournals}:pubmed`, (request, response) => {
  for (const requireParameter of [request.params]) {
    if (!request.params[requireParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requireParameter}`,
      });
    }
  }

  db('journals').where('pubmed', request.params.pubmed).select()
    .then(data => response.status(200).json({ data }))
    .catch(error => console.log(error));
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`);
});
