'use strict';
/***************Import Statements******************/
const express = require('express');
const Restaurant = require('../../models/Restaurant');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const multer = require('multer');
const path = require('path');
const auth = require('../../middleware/auth');
/*************************************************/ 

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./static/images/restaurants');
    },
    filename:(req,file,cb) => {
        try {
            cb(null,req.body.email+path.extname(file.originalname));
        }
        catch(err){ 
            console.error(err);
        }
        
    }
});
const menuItemStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./static/images/restaurants');
    },
    filename:(req,file,cb) => {
        try {
            cb(null,req.body.id+req.body.item+path.extname(file.originalname));
        }
        catch(err){ 
            console.error(err);
        }
        
    }
});
const upload = multer({storage:storage});
const uploadMenuItem = multer({storage:menuItemStorage});

var { check, validationResult } = require('express-validator');
/**
 * @description This API will create a new Restaurant profile. In case if user enters the invalid details, we will send the 400 Bad Request along with the error messages
 */
router.post('/create-restaurant',upload.single('profileImg'),[
    check('name','Please Enter your Name').not().isEmpty(),
    check('owner','Please enter the name of owner').not().isEmpty(),
    check('email','Your email is valid. Please check the format of your email.').isEmail(),
    check('password','The length of the password must be 8 or more characters.').isLength({min:8}),
    check('contact','Please enter your contant number').not().isEmpty(),
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
            const { email,owner, name, password, contact, cuisine} = req.body;
            let profileImg = "";
            // Step 2 : check for duplicate user
            let restaurant = await Restaurant.findOne({email});
            if(restaurant){
               return res.status(400).json({errors:[{msg:'User already exist'}]})
            }
            if(req.file != null){
                
                // File size limit is 5 Mb
                if(req.file.size > 5242880){
                    return res.status(400).json({errors:[{msg:'The image size should be smaller than or equal to 5 MB.'}]});
                }   
                profileImg = req.file.path;
            }
            restaurant = new Restaurant({name,owner,email,password,contact,cuisine,profileImg});
            
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
                    res.json({token,user:restaurant})
                }); 

       }catch(err){
           console.error(err);
           res.status(500).send("Server Error!");
       }     
});

/**
 * @description This api will return the list of all the restaurants in the database which can be viewd by customer.
 * Notice that we will only use sessionStorage variable if the customer is not logged in otherwise we will use the existing customer session
 */
router.get('/view-restaurants',async (req,res)=>{
    try{
        console.log(req.query);
        if(req.query.name!= null && req.query.cuisine != null){
            let restaurantList = await Restaurant.find({
                name: req.query.name,
                cuisine: req.query.cuisine
            });
            res.json(restaurantList);
        }
        else if(req.query.name != null){
            let restaurantList = await Restaurant.find({
                name:req.query.name
            });
            res.json(restaurantList);
        }
        else if(req.query.cuisine != null){
            let restaurantList = await Restaurant.find({
                cuisine:req.query.cuisine
            });
            res.json(restaurantList);
        }        
        else{
            let restaurantList = await Restaurant.find({});
            res.json(restaurantList);
        }
        
    }catch(err){
        res.status(500).send("Server Error from /view-restaurants");
    }
});

/**
 * @description This Api will get all the details of the user
 * 
 */
router.get('/:restId', async(req,res)=>{
    try{
        
        const restId = req.params.restId;
        let restaurant = await Restaurant.findById(restId);
         
        if(restaurant){
            return res.json({restaurant});
        }
        else{
            return res.json({msg:"No Restuarant Found"});
        }   
    }catch(err){
        res.status(500).send("Error with Server!" + JSON.stringify(err));
    }
});

router.get('/:restId/profileImg',async(req,res)=>{
    try{
        const restId = req.params.restId;
        let restaurant = await Restaurant.findById(restId);
        let imagePath = path.resolve(".")+"\\"+restaurant.profileImg;
        res.sendFile(imagePath);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
             
});

router.get('/:restId/menu',async(req,res)=>{
    try{
        let restaurant = await Restaurant.findById(req.params.restId);
        
        console.log(restaurant.menu);
        
        res.json(restaurant.menu);
    }catch(err){
        console.error(err);
        res.status(500).send("server Error!");
    }
});

router.post('/:restId/addmenu',upload.single('img'),
[
    check('item','Please enter name of dish').not().isEmpty(),
    check('price','Enter the price').isEmpty(),
    check('price','The price should be number').not().isNumeric(),
    check('section','Please Enter the section').not().isEmpty(),
    ]
,async(req,res)=>{
 try{
    
    let {item, desc, price, section, img } = req.body;
    let id = req.params.restId;
    let restaurant = await Restaurant.findById(id);
    
    if(req.file != null){           
        // File size limit is 5 Mb
        if(req.file.size > 5242880){
            return res.status(400).json({errors:[{msg:'The image size should be smaller than or equal to 5 MB.'}]});
        }   
        let img = req.file.path;
    }
    restaurant.menu.push({item,desc,price,section,img});
    restaurant.save();
    res.status(200);     
 }catch(err){
     console.error(err);
     res.status(500).send("Server Error");
 }
});

module.exports = router;