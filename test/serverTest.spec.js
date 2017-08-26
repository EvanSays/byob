process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server/server');

const should = chai.should();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHTTP);

describe('Client Routes', () => {

  it('should return a homepage with text', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  it('should return status 404', (done) => {
    chai.request(server)

      .get('/home')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {
  beforeEach((done) => {
    db.migrate.latest()
      .then(() => db.seed.run())
      .then(() => done());
  });

  describe('GET api/v1/journals', () => {
    it('should return all journals', (done) => {
      chai.request(server)
        .get('/api/v1/journals')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('pubmed');
          res.body.data[0].should.have.property('created_at');
          res.body.data[0].should.have.property('updated_at');
          done();
        });
    });
  });

  describe('POST api/v1/journals', () => {
    it('should not create a journal with missing data', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.equal('Missing required parameter pubmed');
          done();
        });
    });
  });

  xit('GET api/v1/genes', (done) => {
    chai.request(server)
      .get('/api/v1/genes')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.should.be.a('object');
        response.body.data.should.be.a('array');
        response.body.data[0].should.be.a('object');
        response.body.data[0].should.have.property('id');
        response.body.data[0].should.have.property('start');
        response.body.data[0].should.have.property('end');
        response.body.data[0].should.have.property('chr');
        response.body.data[0].should.have.property('strand');
        response.body.data[0].should.have.property('cellline');
        response.body.data[0].should.have.property('condition');
        response.body.data[0].should.have.property('sequence');
        response.body.data[0].should.have.property('symbol');
        response.body.data[0].should.have.property('ensg');
        response.body.data[0].should.have.property('log2fc');
        response.body.data[0].should.have.property('rc_initial');
        response.body.data[0].should.have.property('rc_final');
        response.body.data[0].should.have.property('effect');
        response.body.data[0].should.have.property('cas');
        response.body.data[0].should.have.property('screentype');
        response.body.data[0].should.have.property('pubmed_journal');
        response.body.data[0].should.have.property('created_at');
        response.body.data[0].should.have.property('updated_at');
        done();
      });
  });

  describe('GENES POST', () => {
    let responseID;
    it.only('POST api/v1/genes', (done) => {
      chai.request(server)
      .get('/api/v1/genes')
      .end((err, response) => {
        response.body.data.should.have.length(30)

        chai.request(server)
        .post('/api/v1/genes')
        .send({
          id: 1,
          start: 1234,
          end: 5678,
          chr: 'chrString',
          strand: 'strandSting',
          cellline: 'celllineString',
          condition: 'conditionString',
          sequence: 'sequenceString',
          symbol: 'symbolString',
          ensg: 'ensgString',
          log2fc: 4.9884,
          rc_initial: 'rc_initialString',
          rc_final: 'rc_finalString',
          effect: 429884,
          cas: 'casString',
          screentype: 'screentypeString',
          pubmed_journal: 24336569
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('id')
          response.body.id.should.equal(1)

          chai.request(server)
          .get('/api/v1/genes')
          .end((err, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.data.should.be.a('array')
            response.body.data.should.have.length(31)
            done()
          })

        })

      })


    })
  })

  let pubmedQuery;
  let idQuery;

  xit('should get a specified response based on id', (done) => {
    chai.request(server)
      .get('/api/v1/journals/id/1')
      .end((err, response) => {
        // console.log(response.body);
        // pubmedQuery = response.body[0].pubmed;
        // response.should.have.status(200);
        // response.should.be.json;
        // response.body[0].should.have.property('id');
        // response.body[0].id.should.equal(1);
        // response.body[0].should.have.property('pubmed');
        // response.body[0].should.have.property('created_at');
        // response.body[0].should.have.property('updated_at');
        done();
      });
  });

  xit('should get a response based on the pubmed id', (done) => {
    chai.request(server)

      .get('/api/v1/journals/24336571/genes')
      .end((err, response) => {
        // idQuery = response.body[0].id;
        // response.should.have.status(200);
        // response.body.should.be.a('array');
        // response.body[0].should.be.a('object');
        // response.body[0].pubmed_journal.should.equal(pubmedQuery);
        done();
      });
  });

  xit('should sucessfully use the id from the previous test as a query parameter', done => {
    chai.request(server)
      .get(`/api/v1/journals/id/${idQuery}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body[0].pubmed.should.equal(pubmedQuery);
        done();
      });
  });

  xit('should', (done) => {
    chai.request(server)
      .get(`/api/v1/genes/pubmed/${pubmedQuery}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.gene.should.be.a('array');
        response.body.gene[0].should.be.a('object');
        response.body.gene[0].pubmed_journal.should.equal(pubmedQuery);
        response.body.gene[0].id.should.equal(idQuery);
        done();
      });
  });
});
