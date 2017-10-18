const app = require('../index');
var chai = require('chai');
const chaiHttp = require('chai-http');

// use module
chai.use(chaiHttp);


// Integration
describe('Integration Test', function () {
  it('should have respose code 200', function () {
    chai.request(app)
        .get('/')
        .end(function (req, res) {
          expect.res.to.have.status(200);
        });
  });

  it('should also respond on accessing localhost silently', function () {
    chai.request('http://localhost:5000')
        .get('/')
        .end(function (err, res) {
          expect.res.to.have.status(200);
        });
  });
});

//api
describe('API', function () {
  it('should have param number', function () {
    chai.request(app)
        .get('/api/nnumber/4')
        .end(function (req, res) {
          expect.req.to.have.param('number');
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
        .get('/api/nnumber/6')
        .end(function (req, res) {
          expect.req.not.to.have.param('number', 'float');
        });
  });
});
