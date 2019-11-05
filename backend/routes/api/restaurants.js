'use strict';
/***************Import Statements******************/
const express = require('express');
const Restaurant = require('../../models/Restaurant');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const multer = require('multer');
const auth = require('../../middleware/auth');
/*************************************************/ 

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./static/images');
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage});

var { check, validationResult } = require('express-validator');
/**
 * @description This API will create a new Restaurant profile. In case if user enters the invalid details, we will send the 400 Bad Request along with the error messages
 */
router.post('/create-restaurant',upload.single('profileImg'),[
    check('name','Please Enter your Name').not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail(),
    check('password','The length of the password must be 8 or more characters.').isLength({min:8}),
    check('contact','Please enter your contant number').not().isEmpty(),
    check('contact','Please check the length of your contact number').isLength({min:10,max:10}),
    check('cuisine','Please enter the type of cuisine served at your restaurant').not().isEmpty()
    ],async (req,res)=>{
        
       const err = validationResult(req);
       
       if(!err.isEmpty()){
        return res.status(400).json({
            errors:err.array()
        });
       }
       
       try{
            // Step 1 : De-Struct the request body 
            const { email, name, password, contact, cuisine} = req.body;
            let profileImg = "";
            // Step 2 : check for duplicate user
            let restaurant = await Restaurant.findOne({email});
            if(restaurant){
               return res.status(400).json({errors:[{msg:'User already exist'}]})
            }
            if(req.file != null){
                if(req.file.size > 5242880){
                    return res.status(400).json({errors:[{msg:'The image size should be smaller than or equal to 5 MB.'}]});
                }   
                console.
                profileImg = req.file.path1;
            }
            restaurant = new Restaurant({name,email,password,contact,cuisine,profileImg});
            
            // Step 3 : Encrpyt password
            const salt = await bcrpyt.genSalt(10);
            restaurant.password = await bcrpyt.hash(password,salt);

            // Step 4 : Create Restaurant. This will insert the restaurant to the database 
            await restaurant.save();
            
            // Step 5 : Create JWT
            const payload = {
                restaurant: {
                    id: restaurant.id
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
 * @description This api will return the list of all the restaurants in the database which can be viewd by customer.
 * Notice that we will only use sessionStorage variable if the customer is not logged in otherwise we will use the existing customer session
 */
router.get('/view-restaurants',async (req,res)=>{
    try{
        let restaurantList = await Restaurant.find({});
        res.json(restaurantList);
    }catch(err){
        res.status(500).send("Server Error from /view-restaurants"+err);
    }
});

/**
 * @description This Api will get all the details of the user
 * 
 */
router.get('/:restId',auth, async(req,res)=>{
    //try{
        //console.log(req.params.customerId);
        const restId = req.params.customerId;
        let restaurant = await Restaurant.findById(restId);
        
        if(restaurant){
            return res.json({restaurant});
        }
        else{
             return res.json({msg:"No Restuarant Found"});
        }
        
    //}catch(err){
        
     //   res.status(500).send("Error with Server!" + JSON.stringify(err));
   // }


});


module.exports = router;