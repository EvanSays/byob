const   express     = require('express');
const   bodyParser  = require('body-parser');
const   path        = require('path');
const   jwt         = require('jsonwebtoken');
const   app         = express();
const   routes      = require('./routes.js');
const { checkAuth } = require('./serverMiddleware');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const db = require('knex')(configuration);

app.set('port', process.env.PORT || 6333);
app.set('secretKey', process.env.SECRET_KEY);

app.use(express.static(path.join('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, res) => {
  res.sendFile(path.join(`${__dirname}/../index.html`));
});

app.post('/api/v1/admin', (req, res, next) => {
  const payload = req.body;
  console.log('pooload: ', req.body)

  for (const requiredParameter of ['password', 'email']) {
    if (!req.body[requiredParameter]) {
      return res.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      })
    }
  }

  if (req.body.email.endsWith('@turing.io')) {
    Object.assign(payload, { admin: true });
  }

  var token = jwt.sign(
    payload,
    app.get('secretKey'),
    { expiresIn: '7d' }
  )

  res.status(200).json(token)
})

app.delete('/api/v1/genes/:id', checkAuth, (req, res) => {
  const payload = req.body
  const { id } = req.params

  for (const requiredParameter of ['id']) {
    if (!req.params[requiredParameter]) {
      return res.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      })
    }
  }

  db('genes').where('id', id).del()
  .then(data => res.status(200).json({
    resp: `The id '${id}' and all it's corresponding data has been destroyed. Forever.`,
    data,
  }))
  .catch(error => console.log(error))
})

app.route('/api/v1/journals')
  .get((req, res) => {
    // CHECKS OUT
    db('journals').select()
      .then(data => res.status(200).json({ data }))
      .catch(error => console.log(error));
  })
  .post((req, res) => {
    const newJournal = req.body;

    for (const requiredParameter of ['pubmed_journal']) {
      if (!newJournal[requiredParameter]) {
        return res.status(422).json({ error: `Missing required parameter ${requiredParameter}` });
      }
    }

    db('journals').insert(newJournal, 'id')
      .then(journal => {
        res.status(201).json({ id: journal[0] });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });

app.route('/api/v1/genes')
  .get((req, res) => {
    // CHECKS OUT
    db('genes').select()
      .then(data => res.status(200).json({ data }))
      .catch(error => console.log(error));
  })
  .post((req, res) => {
    // CHECKS OUT
    const newGene = req.body;

    for (const requiredParameter of [
      'start', 'end', 'strand', 'cellline',
       'condition', 'sequence', 'symbol', 'ensg',
      'log2fc', 'rc_initial', 'rc_final', 'effect',
      'cas', 'screentype', 'pubmed_journal']) {
      if (!newGene[requiredParameter]) {
        return res.status(422).json({ error: `Missing required parameter ${requiredParameter}` });
      }
    }

    db('genes').insert(newGene, 'id')
      .then((gene) => {
        res.status(201).json({ id: gene[0] });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

app.route('/api/v1/journals/id/:id')
  .get((req, res) => {
    db('journals')
      .where('id', req.params.id)
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
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

app.route('/api/v1/journals/:pubmed/genes')
// CHECKS OUT
  .get((req, res) => {
    db('genes')
      .where('pubmed_journal', req.params.pubmed)
      .select()
      .then((genes) => {
        if (genes.length) {
          res.status(200).json(genes);
        } else {
          res.status(404).json({
            error: `Could not find genes with pubmed id of ${req.params.pubmed}`,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

  app.route('/api/v1/genes/pubmed/:pubmedID')
    .get((req, res) => {

    db('genes').where('pubmed_journal', req.params.pubmedID).select('*')
    .then(gene => {
      res.status(200).json({ gene })
    })
    .catch(error => res.status(500).json({ error }))
  })

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`);
});
