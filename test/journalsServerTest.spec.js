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

  describe('ADMIN', () => { // GOOD

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
        res.body.should.equal('Missing required parameter appName')
        done();
      });
    });

    it('03: should break when improper values (email) are passed', (done) => {
      chai.request(server)
      .post('/api/v1/admin')
      .send({ appName: 'Crisper', emale: 'bucket@turing.io' })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.equal('Missing required parameter email')
        done();
      });
    });

    it('04: should', (done) => {
      chai.request(server)
      .post('/api/v1/admin')
      .send({ appName: 'BYOB', email: 'bucket@poo.io' })
      .end((err, res) => {
        res.should.have.status(200)
        let token = res.body.token

        chai.request(server)
        .patch('/api/v1/journals/435367')
        .set({"authorization": `${token}`})
        .send({ pubmed: 132435 })
        .end((err, res) => {
          res.error.text.should.equal('{"error":"Your admin stats is set to false. It must be set to true to proceed"}')
          res.should.have.status(403)
          done()
        });
      });
    });
  });

  describe('POST api/v1/journals', () => {
    it('01: should not create a journal with missing data', (done) => {
      chai.request(server)
      .post('/api/v1/journals')
      .send({})
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.equal("Missing required parameter pubmed. Instead recieved ''.");
        done();
      });
    });

    it('02: should not POST when invalid values are passes', (done) => {
      chai.request(server)
      .post('/api/v1/journals')
      .send({ pubemed: 533665 })
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.equal("Missing required parameter pubmed. Instead recieved 'pubemed'.")
        done()
      })
    })
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

    it('02: should require admin priveledges to update journals', (done) => {
      chai.request(server)
      .post('/api/v1/journals')
      .send({id: 12231, pubmed: 435367})
      .end((err, response) => {
        response.body.should.have.property('id');
        response.body.id.should.equal(12231);

        chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          response.should.have.status(201)
          let token = res.body.token

          chai.request(server)
          .patch('/api/v1/journals/435367')
          .set({"authorization": `${token}`})
          .send({ pubmed: 132435 })
          .end((err, res) => {
            response.body.id.should.deep.equal(12231)
            done()
          });
        });
      });
    });

    it.only('should be denied update priveledges if admin is set to false', (done) => {
      chai.request(server)
      .post('/api/v1/journals')
      .send({id: 12231, pubmed: 435367})
      .end((err, response) => {
        response.body.should.have.property('id');
        response.body.id.should.equal(12231);

        chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@poo.io' })
        .end((err, res) => {
          res.should.have.status(200)
          let token = res.body.token;

          chai.request(server)
          .patch('/api/v1/journals/435637')
          .set({"authorization": `${token}`})
          .end((err, res) => {
            res.should.have.status(403)
            res.body.error.should.equal("Your admin stats is set to false. It must be set to true to proceed")
            done()
          })
        });
      });
    });
  });
});
