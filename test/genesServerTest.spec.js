process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server/server');
const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHTTP);

describe('Client Routes', () => {
  it('01: should return a homepage with text', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html;
      done();
    });
  });

  it('02: should return status 404', (done) => {
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

  describe('GET /genes', () => {
    it('01: should get all genes from database', (done) => {
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
  });


  describe('POST /genes', () => {
    it('01: should be able to post to genes', (done) => {
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


  describe('GET /journals/:pubmed/genes', () => {
    it('01: should get a gene response based on the pubmed id', (done) => {
      chai.request(server)
      .get('/api/v1/journals/24336571/genes')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body[0].should.be.a('object');
        done();
      });
    });
  });

  describe('POST /journals', () => {
    it('01: should sucessfully use the id from the previous test as a query parameter', (done) => {
      chai.request(server)
      .post('/api/v1/journals')
      .send({ id: 12231, pubmed: 435367 })
      .end((err, response) => {
        response.body.should.have.property('id');
        response.body.id.should.equal(12231);

        chai.request(server)
        .get('/api/v1/journals/435367')
        .end((err, response) => {
          response.should.have.status(200);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(12231);
          done();
        });
      });
    });
  });


  describe('GET /journals/:pubmed/genes', () => {
    it('01: should get genes associated with pubmed id', (done) => {
      chai.request(server)
      .get('/api/v1/journals/24336571/genes')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body[0].should.be.a('object');
        response.body[0].pubmed_journal.should.equal(24336571);
        done();
      });
    });
  });
});
