const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const { checkAuth } = require('./serverMiddleware');

const app = express();
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const db = require('knex')(configuration);

app.set('port', process.env.PORT || 6333);
app.set('secretKey', process.env.SECRET_KEY);

app.use(express.static(path.join('public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, res) => {
  res.sendFile(path.join(`${__dirname}/../index.html`));
});

app.post('/api/v1/admin', (req, res) => { // TESTED
  const payload = req.body;

  for (const requiredParam of ['appName', 'email']) {
    if (!req.body[requiredParam]) {
      return res.status(422).json({ error: `Missing required parameter ${requiredParam}` });
    }
  }
  if (payload.email.endsWith('@turing.io')) {
    Object.assign(payload, { admin: true });
  } else { Object.assign(payload, { admin: false }) }
  const token = jwt.sign(payload, app.get('secretKey'), { expiresIn: '7d' });
  return res.status(200).json({ token });
});

app.route('/api/v1/journals') // WORKS
  .get((req, res) => { // TESTED
    db('journals')
      .select()
      .then(data => res.status(200).json({ data }))
      .catch(error => res.status(500).json({ error }));
  })
  .post((req, res) => { // TESTED
    const newJournal = req.body;
    for (const requiredParam of ['pubmed']) {
      if (!req.body[requiredParam]) {
        return res.status(422).json(`Missing required parameter ${requiredParam}. Instead recieved '${Object.keys(req.body)}'.`);
      }
    }
    return db('journals')
      .insert(newJournal, 'id')
      .then(journal => res.status(201).json({ id: journal[0] }))
      .catch(error => res.status(500).json({ error }));
  });

app.route('/api/v1/genes') // WORKS // TESTED
  .get((req, res) => {
    db('genes')
      .modify((query) => {
        if (req.query.start) {
          query.where('start', req.query.start);
        }
      })
      .select()
      .then(data => res.status(200).json({ data }))
      .catch(error => res.status(500).json({ error }));
  })
  .post((req, res) => {
    const newGene = req.body;
    const params = [
      'start', 'end', 'strand', 'cellline',
      'condition', 'sequence', 'symbol', 'ensg',
      'log2fc', 'rc_initial', 'rc_final', 'effect',
      'cas', 'screentype', 'pubmed_journal'];

    for (const requiredParam of params) {
      if (!req.body[requiredParam]) {
        return res.status(422).json({ error: `Missing required parameter ${requiredParam}` });
      }
    }
    return db('genes').insert(newGene, 'id')
      .then(gene => res.status(201).json({ id: gene[0] }))
      .catch(error => res.status(500).json({ error }));
  });

app.route('/api/v1/journals/:pubmed') // TESTED
  .get((req, res) => {
    db('journals')
      .where('pubmed', req.params.pubmed)
      .select()
      .then((journals) => {
        if (journals.length) {
          res.status(200).json(journals);
        } else {
          res.status(404).json({
            error: `Could not find journal with pubmed id of ${req.params.pubmed}`,
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  })
  .patch(checkAuth, (req, res) => {
    const newPatch = req.body;
    db('journals')
      .where('pubmed', req.params.pubmed)
      .select()
      .update(newPatch, 'id')
      .then((genes) => {
        res.status(201).json({ id: genes });
      })
      .catch(error => res.status(500).json({ error }));
  });

app.route('/api/v1/journals/:pubmed/genes') // WORKS
  .get((req, res) => {
    const { pubmed } = req.params;
    db('genes')
      .where('pubmed_journal', pubmed)
      .select()
      .then((genes) => {
        if (genes.length) {
          res.status(200).json(genes);
        } else {
          res.status(404).json({
            error: `Could not find genes with pubmed id of ${pubmed}`,
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  })
  .delete(checkAuth, (req, res) => {
    const { pubmed } = req.params;

    for (const requiredParameter of ['pubmed']) {
      if (!req.params[requiredParameter]) {
        return res.status(422).json({
          error: `Missing required parameter ${requiredParameter}`,
        });
      }
    }
    return db('genes')
      .where('pubmed_journal', pubmed)
      .del()
      .then(data => res.status(200).json({
        res: `The genes linked to '${pubmed}' and all it's corresponding data has been destroyed.`,
        data,
      }))
      .catch(error => res.status(500).json({ error }));
  });

app.route('/api/v1/genes/:id') // WORKS
  .get((req, res) => {
    db('genes')
      .where('id', req.params.id)
      .select()
      .then(genes => res.status(200).json(genes))
      .catch(error => res.status(500).json({ error }));
  })
  .patch(checkAuth, (req, res) => {
    const newPatch = req.body;
    db('genes')
      .where('id', req.params.id)
      .select()
      .update(newPatch, 'id')
      .then(genes => res.status(201).json(genes))
      .catch(error => res.status(500).json({ error }));
  })
  .delete(checkAuth, (req, res) => {
    const { id } = req.params;
    for (const requiredParameter of ['id']) {
      if (!req.params[requiredParameter]) {
        return res.status(422).json({
          error: `Missing required parameter ${requiredParameter}`,
        });
      }
    }
    return db('genes')
      .where('id', id)
      .del()
      .then(data => res.status(200).json({
        res: `The id '${id}' and all it's corresponding data has been destroyed. Forever.`,
        data,
      }))
      .catch(error => res.status(500).json({ error }));
  });

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`);
});

module.exports = app;
