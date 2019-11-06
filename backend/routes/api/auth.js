/**
 * @author Dharmang Solanki
 */
const express = require('express');
const router = express.Router();
const Customer = require('../../models/Customer');
const Restaurant = require('../../models/Restaurant');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const userType = {
    customer : "Customer",
    restaurant: "Restaurant"
}

/**
 * @description For authentication while creating a new Customer
 * @access Public
 * @returns GET api/auth
 */
router.get('/',auth, async (req,res)=>{
    try{
        // returns all information except the password
        if(req.body.userType == userType.customer){
            const customer = await Customer.findById(req.customer.id).select('-password');
            res.json(customer);
        }
        else{
            const restaurant = await Restaurant.findById(req.restaurant.id).select('-password');
            res.json(restaurant);
        }
    }
    catch(err){
        console.error(err);
        res.sendStatus(500);
    }
});

/**
 * @description This API will be used for login of Customer and Restaurant
 */
router.post('/login',[
    check('email','Please Enter your Email').not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail(),
    check('password','Please password your Email').not().isEmpty(),
    ],
    async (req,res)=>{
       const err = validationResult(req);    
       if(!err.isEmpty()){
        return res.status(400).json({
            errors:err.array()
        });
       }
       
       try{
            // Step 1 : De-Struct the request body 
            const {userType, email, password } = req.body;
            // Step 2 : check for duplicate user
            if(userType == "Customer"){     
                console.log("User is Customer");   
                authCustomer(email,password,req,res);
            }
            else{
                console.log("User is Restaurant");
                console.log(userType);
                authRestaurant(email,password,req,res);
            }
                
                
       }catch(err){

            console.error(err);
            res.sendStatus(500);
       }
       
});

let authCustomer = async (email,password,req,res) => {
    
    let customer = await Customer.findOne({email});
    if(!customer){
        return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
    }

    const matches = await bcrypt.compare(password, customer.password);
    if(!matches){
        return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
    }

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
        res.status(200).json({token,user:customer})
    });
} 

let authRestaurant = async (email,password,req,res) =>{
    let restaurant = await Restaurant.findOne({email});
    if(!restaurant){
        
        return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
    }

    const matches = await bcrypt.compare(password, restaurant.password);
    if(!matches){
        return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
    }

    // Step 5 : Create JWT
    
    const payload = {
        restaurant: {
            id: restaurant.id
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
        res.status(200).json({token,user:restaurant});
    });
}

module.exports = router;