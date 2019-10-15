var Customer = require('./controllers/customers');
var Restaurant = require('./controllers/restuarants');

//import express module 
var express = require('express');
//create  an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');

var cookieParser = require('cookie-parser');
var { check, validationResult } = require('express-validator');
var mysql = require('mysql');
//const port = process.env.PORT || 3001;
const port =  3001;
const connection = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root',
    database: 'grubhub'
});

//specify the path of static directory
app.use(express.static(__dirname + './public')); 
//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests

app.use(session({
    secret: 'Nothing',
    resave: false,
    saveUninitialized: true
  }));

app.get('/', (req,res)=>{
    res.end("Server is Working!!");
})


//Method to handle the login method
app.post('/login',(req,res)=>{
    
    if(req.body.userType === "Customer"){
        Customer.default.login(connection,req,res);        
    }
    else {
        Restaurant.default.login(connection,req,res);
    }
    
})

app.get('/home',(req,res)=>{
    res.end();
})

//This method adds new users in the database
app.post('/create-user',(req,res)=>Customer.default.signUp(connection,req,res))
app.post('/create-restaurant',(req,res)=>Restaurant.default.signUp(connection,req,res))

app.get('/view-restaurants',(req,res)=>{
    
    var getRestaurants = `SELECT * FROM restaurants;`;
    connection.query(getRestaurants,(err,rows,fields)=>{  
        if(!err){
            res.json(JSON.parse(JSON.stringify(rows)));
        }
    })
})


app.listen(process.env.PORT||port, () =>{
    console.log("Server running on host 3001")
})


module.exports = app;