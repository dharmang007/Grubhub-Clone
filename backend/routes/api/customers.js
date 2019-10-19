'use strict';
/***************Import Statements******************/
const express = require('express');
const Customer = require('../../models/Customer');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
/*************************************************/ 


const router = express.Router();
var { check, validationResult } = require('express-validator');

/**
 * @description This API will create a new Customer profile. In case if user enters the invalid details, we will send the 400 Bad Request along with the error messages
 */
router.post('/create-user',[
    check('name','Please Enter your Name').not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail(),
    check('password','The length of the password must be 8 or more characters.').isLength({min:8}),
    check('contact','Please enter your contant number').not().isEmpty(),
    check('contact','Please check the length of your contact number').isLength({min:10,max:10})
    ],async (req,res)=>{
       const err = validationResult(req);
       
       if(!err.isEmpty()){
        return res.status(400).json({
            errors:err.array()
        });
       }
       
       try{
            // Step 1 : De-Struct the request body 
            const { email, name, password, contact, profileImg } = req.body;

            // Step 2 : check for duplicate user
            let customer = await Customer.findOne({email});
            if(customer){
               return res.status(400).json({errors:[{msg:'User already exist'}]})
            }

            customer = new Customer({name,email,password,contact,profileImg});
            // Step 3 : Encrpyt password
            const salt = await bcrpyt.genSalt(10);
            customer.password = await bcrpyt.hash(password,salt);

            // Step 4 : Create User 
            await customer.save();
            
            // Step 5 : Create JWT
            const payload = {
                customer: {
                    id: customer.id
                }
            }

            jwt.sign(payload,config.get('jwtSecretToken'),
            {
                expiresIn: 36000
            },
            (err,token) => {
                if(err){
                    throw err;
                }
                res.json({token})
            }); 

       }catch(err){
            res.status(500).send(err);
       }
       
});




/**
 * @description Customer class contains all the Customer related methods
 */
/*
class Customer{

    constructor(){

    }

    static login(connection,req,res) {
        var query = `SELECT * FROM customers WHERE email = '${req.body.email}' AND password = '${req.body.password}';`;
        connection.query(query,(err, rows, fields) => {
        if(err || rows == "" ){
            res.json(err);
        }
        else{
            res.cookie("cookieUser","cookieUser",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = rows;           
            res.json(rows);  
        }   
    })
    }

    static signUp(connection,req,res){    
        var query = `INSERT INTO customers (email, name, password, contactNumber) VALUES (
                    '${req.body.email}', '${req.body.name}', '${req.body.password}', '${req.body.contactNumber}');`;
        connection.query(query,(err, rows, fields) => {
            if(!err){
                console.log(rows);
                var getUserQuery = `SELECT * FROM customers WHERE email = '${req.body.email}'`;
                let userData = null;
                connection.query(getUserQuery,(err,rows,fields)=>{
                    userData = rows;
                })
                res.json(userData);
            }
            else{
            res.json(err);
            }
        });
    }

    static update(connection,user){
        
    }

    static getUser(connection,user){

    }

    static getAllUsers(){
        
    }

}

*/

module.exports = router;