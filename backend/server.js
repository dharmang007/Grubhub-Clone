/************* Import Statements ***************/
var Customer = require('./controllers/customers');
var Restaurant = require('./controllers/restuarants');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const connectToDataBase = require("./config/db");
var cookieParser = require('cookie-parser');
var { check, validationResult } = require('express-validator');
/***********************************************/
const port = process.env.PORT || 3001;
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})
app.use(session({
    secret: 'Nothing',
    resave: false,
    saveUninitialized: true
  }));

connectToDataBase();
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
    if(process.env.PORT){
        console.log("Server running on host "+ process.env.PORT.toString());
    }
    else{
        console.log("Server running on host "+ port.toString());
    }
    
})


module.exports = app;