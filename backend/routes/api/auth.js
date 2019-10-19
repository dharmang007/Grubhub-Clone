/**
 */

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Customer = require('../../models/Customer');
const Restaurant = require('../../models/Restaurant');
const userType = {
    customer : "customer",
    restaurant: "restaurant"
}
/**
 * @description For authentication while creating a new Customer
 * @access Public
 * @returns GET api/auth
 */

router.get('/',auth,async (req,res)=>{
    try{
        // returns all information except the password
        if(req.body.userType == userType.customer){
            const customer = await Customer.findById(req.customer.id).select('-password');
            res.json(customer);
        }
        else{
            const restaurant = await Restaurant.findById(req.customer.id).select('-password');
            res.json(restaurant);
        }
    }
    catch(err){
        res.send(500).send('Server Error');
    }
});

module.exports = router;