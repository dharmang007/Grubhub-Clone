/**
 * @author Dharmang Solanki
 * 
 */
'use strict';
/***************Import Statements******************/
const express = require('express');
const Customer = require('../../models/Customer');
const Orders = require('../../models/CustomerOrders');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
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
       console.log("Create User Called!" + JSON.stringify(req.body));
       if(!err.isEmpty()){
           console.log(err.array());
           console.log("Error Found");
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
                expiresIn: 360000
            },
            (err,token) => {
                if(err){
                    throw err;
                }
                res.json({token})
            }); 

       }catch(err){
           console.error(err.message);
          res.status(500).send(err);
       }
       
});

/**
 * @description This Api will get all the details of the user
 * 
 */
router.get('/:customerId',auth, async(req,res)=>{
    try{
        const customerId = req.params.customerId;
        let customer = await Customer.findById(customerId);
        if(customer){
            return res.json({customer});
        }
        else{
             return res.json({msg:"No Customer Found"});
        }
        
    }catch(err){
        
        console.error(err.message);
        res.status(500).send("Error with Server!");
    }


});



/**
 * @description  This API will Query to get customer's orders 
 */
router.get('/:customerId/orders',async (req,res)=>{
    try{
        const customerId = req.params.customerId;
        const orders = await Orders.findOne({customerId});
        if(orders){
            return res.json({orders});
         }
         else{
             return res.json({msg:"No Orders Found"});
         }
        
    }catch(err){
        console.error(err.message);
        res.status(500).send("Sever Error !");
    }
});

module.exports = router;