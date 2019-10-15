'use strict';

/**
 * This is class contains all the Customer related methods
 */
class Customer{

    constructor(){

    }

    /**
     * This Method handles the Login functionality of User
     * @param {Connection object for MySql database} connection 
     * @param {Request Object} req 
     * @param {Response Object} res 
     */
    static login(connection,req,res) {
        var query = `SELECT * FROM customers WHERE email = '${req.body.email}' AND password = '${req.body.password}';`;
        connection.query(query,(err, rows, fields) => {
        if(err || rows == "" ){
            res.json(err);
        }
        else{
            res.cookie("cookieUser","cookieUser",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = rows;           
            res.json(rows);  
        }   
    })
    }

    static signUp(connection,req,res){    
        var query = `INSERT INTO customers (email, name, password, contactNumber) VALUES (
                    '${req.body.email}', '${req.body.name}', '${req.body.password}', '${req.body.contactNumber}');`;
        connection.query(query,(err, rows, fields) => {
            if(!err){
                console.log(rows);
                var getUserQuery = `SELECT * FROM customers WHERE email = '${req.body.email}'`;
                let userData = null;
                connection.query(getUserQuery,(err,rows,fields)=>{
                    userData = rows;
                })
                res.json(userData);
            }
            else{
            res.json(err);
            }
        });
    }

    static update(connection,user){
        
    }

    static getUser(connection,user){

    }

}
module.exports.default = Customer;