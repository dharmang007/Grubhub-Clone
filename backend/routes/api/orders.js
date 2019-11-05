/**
 * @author Dharmang Solanki
 * 
 */
const express = require('express');
const router = express.Router();

/**
 * @description Test route
 * @access Public
 * @returns GET api/orders
 */
router.get('/',(req,res)=>res.send('Order route'));
/**
 * @description Customer class contains all the Customer related methods
 */
module.exports= router;