const app = require('./index');
const should = require('should');
const request = require('supertest');

describe('GET /users는', () => {


  describe('성공했을 경우....', () => {
    it('...한다', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          console.log(res.body);
          done();
        })
    });
  });

  describe('실패했을 경우....', () => {
    it('...한다', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });
  });





});
