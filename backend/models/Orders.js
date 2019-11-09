/**
 * @author Dharmang Solanki
 * 
 */
const mongoose = require('mongoose');

/**
 * @description Creates the Restaurant Schema
 *  
 * */
const OrderSchema = new mongoose.Schema({
 
  custId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
    },
  restId:{
    type:String,
    require:true
  },
  address:{
    type: String,
    required: true,
    },
  contact:{
    type: String,
    required: true,
    },
  status:{
    type: String,
    required: true,
    },
  items:[
        {
          itemId:{type:mongoose.Schema.Types.ObjectId,required:true},
          qty:{type:Number,required}
        }
       ]
});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Restaurant = mongoose.model('restaurant',RestaurantSchema);