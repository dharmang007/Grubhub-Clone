/**
 * @author Dharmang Solanki
 * 
 */
const mongoose = require('mongoose');

const CustomerOrders = new mongoose.Schema({
    customerEmail:{
        type: String
    },
    restaurantEmail:{
        type:String
    },
    date:{
        type:mongoose.Schema.Types.Date
    },
    status:{
        type:String
    },
    address:{
        type:String
    },
    items:{
        type:[{
            item:{
                type:String,
                qty:Number,
                price:Number
            }
        }]
    }
});

module.exports = Orders = mongoose.model('orders',CustomerOrders);