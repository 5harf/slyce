var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var knex = require('../../db/index');
var app = require('../../index');

describe('/answers', function () {

  before(function (done) {
    var qa = {host_name: 'test_name', start_time: '2001-09-28 01:00:00'}
    request(app)
      .post('/qa')
      .send(qa)
      .set('Accept', 'application/json')
      .end(function (err, resp) {
        if (err) {
          throw new Error(err);
        }
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
            done();
          });
      })
  })

  describe('/:question_id', function () {

    describe('POST', function () {

      it('responds with 201', function (done) {

        var answer = {
          answered_by_name: 'test name',
          text: 'test answer',
          question_id: 1,
          image_url: "www.google.com"
        }

        request(app)
          .post('/answers/1')
          .send(answer)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            console.log('resp.body =', resp.body);
            expect(resp.body).to.be.an('object');
            done();
          });

      });

      it('creates the answer object', function (done) {

        var answer = {
          answered_by_name: 'test name',
          text: 'test answer 2',
          question_id: 1,
          image_url: "www.google.com"
        }

        request(app)
          .post('/answers/1')
          .send(answer)
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            if (err) {
              throw new Error(err);
            }
            expect(resp.body.a_id).to.be.a('number');
            done();
          });
      });
    });
  });
});
