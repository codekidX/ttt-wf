const app = require('../index');
var chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

// use module
chai.use(chaiHttp);


// Integration
describe('Integration Test', function () {
  it('should have respose code 200', function (done) {
    chai.request(app)
        .get('/')
        .end(function (req, res) {
          res.should.have.status(200);
          done();
        });
  });

  it('should also respond on accessing localhost silently', function (done) {
    chai.request('http://localhost:8080')
        .get('/')
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
  });
  it('should respond 404 for unmapped routes', function (done) {
    chai.request(app)
        .get('/test')
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
  });
});

//api
describe('API', function () {

  it('nnumber api should have key word in it\'s response', function (done) {
    chai.request(app)
        .get('/api/nnumber/4/true')
        .end(function (req, res) {
          expect(res.text).to.include('word');
          done();
        })
  });

  it('nnumber api should return empty array on 0 input', function (done) {
    chai.request(app)
        .get('/api/nnumber/0/true')
        .end(function (req, res) {
          console.log(res.length);
          expect(res.text).to.equal('[]');
          done();
        });
  });
});
