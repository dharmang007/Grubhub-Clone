'use strict';
/***************Import Statements******************/
const express = require('express');
const Restaurant = require('../../models/Restaurant');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
/*************************************************/ 

const router = express.Router();
var { check, validationResult } = require('express-validator');

/**
 * @description This API will create a new Restaurant profile. In case if user enters the invalid details, we will send the 400 Bad Request along with the error messages
 */
router.post('/create-restaurant',[
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
            const { email, name, password, contact, cuisine, profileImg } = req.body;

            // Step 2 : check for duplicate user
            let restaurant = await Restaurant.findOne({email});
            if(restaurant){
               return res.status(400).json({errors:[{msg:'User already exist'}]})
            }
            restaurant = new  Restaurant({name,email,password,contact,cuisine,profileImg});
            
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
    //try{
        let restaurantList = await Restaurant.find({});
        res.json(restaurantList);
    //}catch(err){
    //    res.status(500).send(err);
   // }
});

/**
 * @description Restaurant class contains all the Restaurant related methods
 */
/*
class Restaurant{

    constructor(){

    }

    static getOrders(connection,req,res){
        var query = `Select * From orders where idRestaurant= '${req.body.restaurant_id}'`;
        
    }

    static login(connection,req,res) {
    
        var query = `SELECT * FROM restaurants WHERE email = '${req.body.email}' AND password = '${req.body.password}';`;
        connection.query(query,(err, rows) => {
        if(err || rows == "" ){
            res.json(err);
        }
        else{
            res.cookie("cookieRestaurant","cookieRestaurant",{maxAge: 900000, httpOnly: false});
            req.session.user = rows;           
            res.json(rows);  
        }   
    })
    }

    static signUp(connection,req,res){
        var query = `INSERT INTO restaurants (email, restaurantName, password, contactNumber,restaurantZipCode,restaurantImgPath) VALUES (
            '${req.body.email}', '${req.body.name}', '${req.body.password}', '${req.body.contactNumber}','${req.body.zipCode}','');`;

        connection.query(query,(err, rows, fields) => {
        if(!err){
            var getRestaurantQuery = `SELECT * FROM restaurants WHERE email = '${req.body.email}'`;
            let restaurantData = null;
            console.log(rows.body);
            connection.query(getRestaurantQuery,(err,rows,fields)=>{
                restaurantData = rows;
            })
            
            var restaurantTableName = req.body.name.toString().trim().toLowerCase();
            console.log(restaurantTableName);
            // Now create a table for the Restaurant
            query = `CREATE TABLE '${restaurantTableName}' (
                itemid INT NOT NULL AUTO_INCREMENT,
                itemName VARCHAR(45) NULL,
                itemDescription VARCHAR(255) NULL,
                itemPrice INT NOT NULL,
                itemImage VARCHAR(255) NULL,
                PRIMARY KEY (itemid)); `;
            connection.query(query,(err)=>{ 
                if(err){
                    res.json(err);
                }
                else{
                    res.json(restaurantData);
                }
            })

        }

        else{
            res.json([err]);
        }
    });

    }

    static update(connection,restaurant){

    }

    static getrestaurant(connection,restaurant){
        
    }

}
*/
module.exports = router;