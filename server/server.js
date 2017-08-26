const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
// const routes = require('./routes.js');
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

app.post('/api/v1/admin', (req, res) => {
  const payload = req.body;
  const params = ['appName', 'email'];

  params.forEach((param) => {
    if (!payload[param]) {
      return res.status(422).json({
        error: `Missing required parameter ${param}`,
      });
    }
    return null;
  });
  if (payload.email.endsWith('@turing.io')) {
    Object.assign(payload, { admin: true });
  }
  const token = jwt.sign(payload, app.get('secretKey'), { expiresIn: '7d' });
  res.status(200).json(token);
  return null;
});

app.route('/api/v1/journals') //  WORKS
  .get((req, res) => {
    db('journals')
      .select()
      .then(data => res.status(200).json({ data }))
      .catch(error => console.log(error));
  })
  .post((req, res) => {
    const newJournal = req.body;
    for (let requiredParam of ['pubmed']) {
      if (!req.body[requiredParam]) {
        return res.status(422).json(`Missing required parameter ${requiredParam}`);
      }
    };
    db('journals')
      .insert(newJournal, 'id')
      .then((journal) => {
        res.status(201).json({ id: journal[0] });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    return null;
  });

app.route('/api/v1/genes') // WORKS
  .get((req, res) => {
    db('genes')
      .modify((query) => {
        if (req.query.start) {
          query.where('start', req.query.start);
        }
      })
      .select()
      .then(data => res.status(200).json({ data }))
      .catch(error => console.log(error));
  })
  .post((req, res) => {
    const newGene = req.body;
    const params = [
      'start', 'end', 'strand', 'cellline',
      'condition', 'sequence', 'symbol', 'ensg',
      'log2fc', 'rc_initial', 'rc_final', 'effect',
      'cas', 'screentype', 'pubmed_journal'];

    params.forEach((param) => {
      if (!newGene[param]) {
        return res.status(422).json({ error: `Missing required parameter ${param}` });
      }
      return null;
    });
    db('genes').insert(newGene, 'id')
      .then((gene) => {
        res.status(201).json({ id: gene[0] });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

app.route('/api/v1/journals/:pubmed')
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
      .catch((error) => {
        res.status(500).json({ error });
      });
  })
  .patch(checkAuth, (req, res) => {
    const newPatch = req.body;
    db('journals')
      .where('pubmed', req.params.pubmed)
      .select()
      .update(newPatch, 'id')
      .then((genes) => {
        res.status(201).json(genes);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

app.route('/api/v1/journals/:pubmed/genes') // WORKS
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
// .delete(checkAuth, (req, res) => {
// const { pubmed } = req.params;
//
// for (const requiredParameter of ['pubmed']) {
//   if (!req.params[requiredParameter]) {
//     return res.status(422).json({
//       error: `Missing required parameter ${requiredParameter}`
//     })
//   }
// }
// db('genes')
//   .where('pubmed_journal', req.params.pubmed).del()
//   .then(data => res.status(200).json({
//     resp: `The genes '${genes}' and all it's corresponding data has been destroyed.`,
//     data,
//   }))
//   .catch(error => console.log(error))
// })

app.route('/api/v1/genes/:id') // WORKS
  .get((req, res) => {
    db('genes')
      .where('id', req.params.id)
      .select()
      .then((genes) => {
        res.status(200).json(genes);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })
  .patch(checkAuth, (req, res) => {
    const newPatch = req.body;
    db('genes')
      .where('id', req.params.id)
      .select()
      .update(newPatch, 'id')
      .then((genes) => {
        res.status(201).json(genes);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })
  .delete(checkAuth, (req, res) => {
    const { id } = req.params;
    const params = ['id'];
    params.forEach((param) => {
      if (!req.params[param]) {
        return res.status(422).json({
          error: `Missing required parameter ${param}`,
        });
      }
      return null;
    });
    db('genes')
      .where('id', id)
      .del()
      .then(data => res.status(200).json({
        res: `The id '${id}' and all it's corresponding data has been destroyed. Forever.`,
        data,
      }))
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`);
});

module.exports = app;
