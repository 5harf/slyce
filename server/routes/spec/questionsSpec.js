var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var knex = require('../../db/index');
var app = require('../../index');

describe('/questions', function () {

  describe('/:session_id', function () {

    describe('POST', function () {

      it('responds with 201', function (done) {

        var question = {
          asked_by_name: 'test name',
          text: 'test question',
          session_id: 1
        }

        request(app)
          .post('/questions/1')
          .send(question)
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

      it('creates the question object', function (done) {

        var question = {
          asked_by_name: 'test name',
          text: 'test question',
          session_id: 1
        }

        request(app)
          .post('/questions/1')
          .send(question)
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(resp.body.q_id).to.be.a('number');
            done();
          });
      });
    });
  });
});
