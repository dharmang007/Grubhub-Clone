process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Customer = require("../models/Customer");
let Restaurant = require("../models/Restaurant");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Customer', () => {
  
/*
  * Test the /GET route
  */
  describe('/POST login', function(){
      
      it('Login for Customer', (done) => {
          let user ={
              userType:"Customer",
              email:"user1@gmail.com",
              password:"user1user1" 
          }
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                
                res.should.have.status(200);

              done();
            });
            
          }).timeout(10000);
      
  });

  describe('/GET Customer',()=>{
    it("Get User ",(done)=>{
        chai.request(server)
        .get('/api/customers/5dbe850d8b0f3228a872d2a0')
        .end((err,res) => {
            res.should.have.status(401); // No such url
        })
    }).timeout(10000);
  });
  
  // Get Image 
  describe('/GET Customer',()=>{
    it("Get profil image",(done)=>{
        chai.request(server)
        .get('/api/customers/5dbe850d8b0f3228a872d2a0/profileImg')
        .end((err,res) => {
            res.should.have.status(401);
        })
    }).timeout(10000); 
  });
   
  describe('/GET Customer orders',()=>{
    it("Get orders",(done)=>{
        chai.request(server)
        .get('/api/customers/5dbe850d8b0f3228a872d2a0/orders')
        .end((err,res) => {
            res.should.have.status(200);
        })
    }).timeout(5000);

  });
});

describe('Restaurant', () => {
  
  /*
    * Test the /GET route
    */
    describe('/GET restaurant', function(){
        
        it('getRestaunrants', (done) => {
            
          chai.request(server)
              .get('/api/restaurants/view-restaurants')
              .end((err, res) => {
                  
                  res.should.have.status(200);
  
              });
              
            }).timeout(10000);
        
    });
  
});