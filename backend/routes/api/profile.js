/**
 * This file contains all the APIs for managing the profile of the users(Customers and Restaurant)
 * It will have the api for editing, updating fetching the details 
 */

const express = require('express');
const router = express.Router();

/**
 * @description Test route
 * @access Public
 * @returns GET api/profiles
 */
router.get('/',(req,res)=>res.send('User route'));
/**
 * @description Customer class contains all the Customer related methods
 */
module.exports = router;