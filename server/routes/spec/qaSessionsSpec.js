var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var knex = require('../../db/index');
var app = require('../../index');

describe('/qa', function () {

  describe('/', function () {

    describe('POST', function () {

      it('responds with 201', function (done) {

        var qa = {
          host_name: 'test_name',
          start_time: '2001-09-28 01:00:00'
        }

        request(app)
          .post('/qa')
          .send(qa)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(resp.body).to.be.an('object');
            done();
          });
      });

      it('creates the qa session', function (done) {

        var qa = {host_name: 'test_name', start_time: '2001-09-28 01:00:00'}
        request(app)
          .post('/qa')
          .send(qa)
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(resp.body.qa_id).to.be.a('number');
            done();
          });
      });
    });
  });

  describe('/:session_id', function () {

    describe('GET', function () {

      it('responds with 200', function (done) {

        request(app)
          .get('/qa/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(resp.body).to.be.an('object');
            done();
          });
      });

      it('sends back a qa session', function (done) {

        request(app)
          .get('/qa/1')
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(resp.body.qa_id).to.be.a('number');
            done();
          });
      });
    });
  });

  describe('/:session_id/questions', function () {

    describe('GET', function () {
      
      it('responds with 200', function (done) {

        request(app)
          .get('/qa/1/questions')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            done();
          });
      });

      it('sends back an array of questions', function (done) {
        
        request(app)
          .get('/qa/1/questions')
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(Array.isArray(resp.body)).to.equal(true);
            done();
          });
      });
    });
  });

});
