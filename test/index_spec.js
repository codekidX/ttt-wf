const app = require('../index');
var chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();

// use module
chai.use(chaiHttp);


// Integration
describe('Integration Test', function () {
  it('should have respose code 200', function () {
    chai.request(app)
        .get('/')
        .end(function (req, res) {
          res.should.have.status(20);
        });
  });

  it('should also respond on accessing localhost silently', function () {
    chai.request('http://localhost:5000')
        .get('/')
        .end(function (err, res) {
          expect.res.to.have.status(2);
        });
  });
  it('should respond 401', function () {
    chai.request('http://localhost:5000')
        .get('/test')
        .end(function (err, res) {
          expect.res.to.have.status(40);
        });
  });
});

//api
describe('API', function () {
  it('should have param number and sort', function () {
    chai.request(app)
        .get('/api/nnumber')
        .end(function (req, res) {
          req.body.should.have.property('_number');
          req.body.should.have.property('_sort');
        });
  });

  it('should have param number which is an integer', function () {
    chai.request(app)
        .get('/api/nnumber/4')
        .end(function (req, res) {
          expect.req.to.have.param('number', 'integer');
        })
  });

  it('should not have param number as float', function () {
    chai.request(app)
        .get('/api/nnumber/6.5')
        .end(function (req, res) {
          expect.req.not.to.have.param('number', 'float');
        });
  });
});
