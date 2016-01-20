var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var knex = require('../../db/index');
var app = require('../../index');

describe('/qa', function () {
  describe('/', function () {
    describe('POST', function () {

      it('responds with 201', function (done) {
        var qa = {host_name: 'test_name', start_time: '2001-09-28 01:00:00'}
        request(app)
          .post('/qa')
          .send(qa)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, resp) {
            expect(resp.body).to.be.an('object');
            done();
          });
      })

      it('creates the qa session', function (done) {
        var qa = {host_name: 'test_name', start_time: '2001-09-28 01:00:00'}
        request(app)
          .post('/qa')
          .send(qa)
          .set('Accept', 'application/json')
          .end(function (err, resp) {
            expect(resp.body.session_id).to.be.a('number');
            done();
          });
      })
    })
  })
})
