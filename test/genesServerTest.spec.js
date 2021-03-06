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
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('start');
          res.body.data[0].should.have.property('end');
          res.body.data[0].should.have.property('chr');
          res.body.data[0].should.have.property('strand');
          res.body.data[0].should.have.property('cellline');
          res.body.data[0].should.have.property('condition');
          res.body.data[0].should.have.property('sequence');
          res.body.data[0].should.have.property('symbol');
          res.body.data[0].should.have.property('ensg');
          res.body.data[0].should.have.property('log2fc');
          res.body.data[0].should.have.property('rc_initial');
          res.body.data[0].should.have.property('rc_final');
          res.body.data[0].should.have.property('effect');
          res.body.data[0].should.have.property('cas');
          res.body.data[0].should.have.property('screentype');
          res.body.data[0].should.have.property('pubmed_journal');
          res.body.data[0].should.have.property('created_at');
          res.body.data[0].should.have.property('updated_at');
          done();
        });
    });
  });

  describe('POST /genes', () => {
    it('01: should be able to post to genes', (done) => {
      chai.request(server)
        .get('/api/v1/genes')
        .end((err, res) => {
          res.body.data.should.have.length(30);

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
              pubmed_journal: 24336569,
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.id.should.equal(1);

              chai.request(server)
                .get('/api/v1/genes')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.data.should.be.a('array');
                  res.body.data.should.have.length(31);
                  done();
                });
            });
        });
    });
    it('should not create gene with missing data', (done) => {
      chai.request(server)
        .post('/api/v1/genes')
        .send({
          id: 1,
          start: 1234,
          end: 5678,
          chr: 'chrString',
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
          pubmed_journal: 24336569,
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Missing required parameter strand');
          done();
        });
    });
  });

  describe('GET /journals/:pubmed/genes', () => {
    it('01: should get a gene response based on the pubmed id', (done) => {
      chai.request(server)
        .get('/api/v1/journals/24336571/genes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.be.a('object');
          res.body[0].pubmed_journal.should.equal(24336571);
          done();
        });
    });
    it('should not get genes with wrong pubmed id', (done) => {
      chai.request(server)
        .get('/api/v1/journals/24336341/genes')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Could not find genes with pubmed id of 24336341');
          done();
        });
    });
  });

  describe('DELETE /journals/:pubmed/genes', () => {
    it('should delete genes', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          chai.request(server)
            .delete('/api/v1/journals/27661255/genes')
            .set({ authorization: `${res.body.token}` })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('data');
              res.body.should.have.property('res');
              res.body.data.should.equal(2);
              res.body.res.should.equal('The genes linked to \'27661255\' and all it\'s corresponding data has been destroyed.');
              done();
            });
        });
    });
    it('should not delete genes with wrong pubmed', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          chai.request(server)
            .delete('/api/v1/journals/12345678/genes')
            .set({ authorization: `${res.body.token}` })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('data');
              res.body.should.have.property('res');
              res.body.data.should.equal(0);
              res.body.res.should.equal('The genes linked to \'12345678\' and all it\'s corresponding data has been destroyed.');
              done();
            });
        });
    });
  });
  describe('DELETE /genes/:id', () => {
    it('should delete all data pertaining to the id entered in the params', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          res.should.have.status(200);
          const token = res.body.token;
          chai.request(server)
            .delete('/api/v1/genes/2')
            .set({ authorization: `${token}` })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.res.should.equal('The id "2" and all its corresponding data has been destroyed. Forever.');
              done();
            });
        });
    });
    it('should not delete if required params are incorrrect', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          res.should.have.status(200);
          const token = res.body.token;
          chai.request(server)
            .delete('/api/v1/genes/two')
            .set({ authorization: `${token}` })
            .end((err, res) => {
              res.should.have.status(500);
              done();
            });
        });
    });
  });
  describe('PATCH /genes/:id', () => {
    it('should update a gene', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          const token = res.body.token;
          chai.request(server)
            .post('/api/v1/genes/')
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
              pubmed_journal: 24336569,
            })
            .end((req, res) => {
              chai.request(server)
                .patch('/api/v1/genes/1')
                .set({ authorization: `${token}` })
                .send({ sequence: 'THISISEVANSEQUENCEHERE' })
                .end((err, res) => {
                  chai.request(server)
                    .get('/api/v1/genes/1')
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body[0].should.have.property('sequence');
                      res.body[0].sequence.should.equal('THISISEVANSEQUENCEHERE');
                      done();
                    });
                });
            });
        });
    });
    it('should not update a gene', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          const token = res.body.token;
          chai.request(server)
            .post('/api/v1/genes/')
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
              pubmed_journal: 24336569,
            })
            .end((req, res) => {
              chai.request(server)
                .patch('/api/v1/genes/1')
                .set({ authorization: `${token}` })
                .send({ wrong: 'THISISEVANSEQUENCEHERE' })
                .end((err, res) => {
                  res.should.have.status(500);
                  done();
                });
            });
        });
    });
  });
  describe('GET genes/id', () => {
    it('should get a gene', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          const token = res.body.token;
          chai.request(server)
            .post('/api/v1/genes/')
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
              pubmed_journal: 24336569,
            })
            .end((req, res) => {
              chai.request(server)
                .get('/api/v1/genes/1')
                .end((req, res) => {
                  res.should.have.status(200);
                  res.body[0].should.have.property('id');
                  res.body[0].id.should.equal(1);
                  done();
                });
            });
        });
    });
    it('should not retrieve a gene without proper id', (done) => {
      chai.request(server)
        .post('/api/v1/admin')
        .send({ appName: 'Crisper', email: 'bucket@turing.io' })
        .end((err, res) => {
          const token = res.body.token;
          chai.request(server)
            .post('/api/v1/genes/')
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
              pubmed_journal: 24336569,
            })
            .end((req, res) => {
              chai.request(server)
                .get('/api/v1/genes/wrong')
                .end((req, res) => {
                  res.should.have.status(500);
                  done();
                });
            });
        });
    });
  });
  describe('QUERY genes', () => {
    it('should search by query', (done) => {
      chai.request(server)
        .get('/api/v1/genes')
        .end((req, res) => {
          res.body.data.should.have.length(30);
          chai.request(server)
            .get('/api/v1/genes?cellline=A375')
            .end((req, res) => {
              res.should.have.status(200);
              res.body.data.should.have.length(4);
              done();
            });
        });
    });
    it('should not return a wrong query', (done) => {
      chai.request(server)
        .get('/api/v1/genes?wrong=query')
        .end((req, res) => {
          res.should.have.status(200);
          res.body.data.should.have.length(30);
          done();
        });
    });
  });
});
