

let mongoose = require("mongoose");
let Token = require('../src/models/Token');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Token', () => {
    beforeEach((done) => { //Before each test we empty the database
        Token.remove({}, (err) => {
            done();
        });
    });
})
/*
Test the /GET route
//      */



describe('/GET token', () => {
    it('it should GET all the tokens', (done) => {
        chai.request(server)
            .get('/api/report')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Retrieved success");
                done();
            });
    });
});

describe('/POST billing', () => {
    it('should generate the token of 8 digit number', (done) => {
        let token = {
            username: "Shallon",
            meter: "112890",
            amount: "10000"
        }
        chai.request(server)
            .post('/api/generate-token')
            .send(token)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('success');
                done();
            });
    });
    it('shouldn\'t generate a token because the amount is not divisable by 100', (done) => {
        let token = {
            username: "Shallon",
            meter: "112900",
            amount: "10"
        }
        chai.request(server)
            .post('/api/generate-token')
            .send(token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message").eql("Invalid Amount");
                done();
            });
    });
    it('shouldn\'t generate a token because the meter is not a 6 digit number', (done) => {
        let token = {
            username: "Shallon",
            meter: "1130",
            amount: "100"
        }
        chai.request(server)
            .post('/api/generate-token')
            .send(token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message").eql("Meter should be 6 digit number");
                res.body.should.have.property("success").eql(false);
                done();
            });
    });
});
