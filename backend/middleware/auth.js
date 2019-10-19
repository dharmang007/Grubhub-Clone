const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) => {
    
    // get token
    const t = req.header('x-auth-token');

    // no token found
    if(!t){
        // 401 is for not authorized
        return res.status(401).json({msg:'Access Denied'});
    }

    // Verification of the received token
    try {
        const decodedToken = jwt.verify(t,config.get('jwtSecretToken'));
        // Once we get this req.customer then we can use this customer in any of our 
        // protected routes
        req.customer = decodedToken.customer;
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({error:'invalid token'});
    }

}