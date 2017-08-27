/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server/server');

const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHTTP);

describe('API Routes', () => {
  beforeEach((done) => {
    db.migrate.latest()
      .then(() => db.seed.run())
      .then(() => done());
  });

  describe('POST /admin', () => {
    it('01: should return a jwt encrypted token', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('02: should break when improper values (appName) are passed', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ crappName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing required parameter appName');
          done();
        });
    });

    it('03: should break when improper values (email) are passed', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', emale: 'bucket@turing.io' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing required parameter email');
          done();
        });
    });

    it('04: should deny patch priveledges when admin:false', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'BYOB', email: 'bucket@poo.io' })
        .end((err, res) => {
          res.should.have.status(200);
          const token = res.body.token;
          chai.request(server)
            .patch('/api/v1/journals/435367')
            .set({ authorization: `${token}` })
            .send({ pubmed: 132435 })
            .end((err, res) => {
              res.error.text.should.equal('{"error":"Your admin stats is set to false. It must be set to true to proceed"}');
              res.should.have.status(403);
              done();
            });
        });
    });
  });

  describe('POST /journals', () => {
    it('01: should add journal', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({ id: 12231, pubmed: 435367 })
        .end((err, res) => {
          res.body.should.have.property('id');
          res.body.id.should.equal(12231);

          chai.request(server)
            .get('/api/v1/journals/435367')
            .end((err, res) => {
              res.should.have.status(200);
              res.body[0].should.have.property('id');
              res.body[0].id.should.equal(12231);
              done();
            });
        });
    });

    it('02: should not add journal with missing params', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.equal("Missing required parameter pubmed. Instead recieved ''.");
          done();
        });
    });

    it('03: should not POST when invalid values are passes', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({ pubemed: 533665 })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.equal("Missing required parameter pubmed. Instead recieved 'pubemed'.");
          done();
        });
    });
    describe('GET /journals', () => {
      it('01: should return all journals', (done) => {
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
  });
  describe('POST /journals', () => {
    it('01: should return a journal based on pubmed param', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({ id: 122311, pubmed: 43536637 })
        .end((err, response) => {
          response.body.should.have.property('id');
          response.body.id.should.equal(122311);

          chai.request(server)
            .get('/api/v1/journals/43536637')
            .end((err, response) => {
              response.should.have.status(200);
              response.should.be.json;
              response.body[0].should.have.property('id');
              response.body[0].id.should.equal(122311);
              response.body[0].should.have.property('pubmed');
              response.body[0].should.have.property('created_at');
              response.body[0].should.have.property('updated_at');
              done();
            });
        });
    });
  });
  describe('PATCH /api/v1/journals/pubmed ', () => {
    it('01: should patch journals', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({ id: 12231, pubmed: 435367 })
        .end((err, res) => {
          res.body.should.have.property('id');
          res.body.id.should.equal(12231);
          chai.request(server)
            .post('/api/v1/admin')
            .send({ appName: 'Crisper', email: 'bucket@turing.io' })
            .end((err, res) => {
              const token = res.body.token;
              chai.request(server)
                .patch('/api/v1/journals/435367')
                .set({ authorization: `${token}` })
                .send({ pubmed: 132435 })
                .end((err, res) => {
                  res.body.id.should.deep.equal([12231]);
                  done();
                });
            });
        });
    });
    it('02 should not patch journals without admin privledges', (done) => {
      chai.request(server)
        .post('/api/v1/journals')
        .send({ id: 12231, pubmed: 435367 })
        .end((err, response) => {
          response.body.should.have.property('id');
          response.body.id.should.equal(12231);

          chai.request(server)
            .post('/api/v1/admin')
            .send({ appName: 'Crisper', email: 'bucket@poo.io' })
            .end((err, res) => {
              res.should.have.status(200);
              const token = res.body.token;

              chai.request(server)
                .patch('/api/v1/journals/435637')
                .set({ authorization: `${token}` })
                .end((err, res) => {
                  res.should.have.status(403);
                  res.body.error.should.equal('Your admin stats is set to false. It must be set to true to proceed');
                  done();
                });
            });
        });
    });
  });
  describe('GET /journals:id', () => {
    it('should retrieve a journal', (done) => {
      chai.request(server)
        .get('/api/v1/journals/26627737')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('pubmed');
          res.body[0].pubmed.should.equal(26627737);
          done();
        });
    });
    it('should not retrieve a journal without a proper id', (done) => {
      chai.request(server)
        .get('/api/v1/journals/12345678')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.equal('Could not find journal with pubmed id of 12345678');
          done();
        });
    });
  });
});
