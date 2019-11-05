/**
 * @author Dharmang Solanki
 * 
 */
const mongoose = require('mongoose');

/**
 * @description Creates the Restaurant Schema
 *  
 * */
const RestaurantSchema = new mongoose.Schema({
 
  name:{
    type: String,
    required: true
    },
  email:{
    type: String,
    required: true,
    unique:true
    },
  password:{
    type: String,
    required: true
    },
  contact:{
    type: String,
    required: true,
    },
  cuisine:{
    type: String,
    required: true,
    },
  profileImg:{
    type:String
    },
  menu:[
        {
          item:{type:String,required:true},
          desc:{type:String},
          price:{type:Number,required:true},
          section:{type:String,required:true}
        }
       ]
});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Restaurant = mongoose.model('restaurant',RestaurantSchema);