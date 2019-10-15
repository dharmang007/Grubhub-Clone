'use strict';
class Restaurant{

    constructor(){

    }

    static getOrders(connection,req,res){
        var query = `Select * From orders where idRestaurant= '${req.body.restaurant_id}'`;
        
    }

    static login(connection,req,res) {
    
        var query = `SELECT * FROM restaurants WHERE email = '${req.body.email}' AND password = '${req.body.password}';`;
        connection.query(query,(err, rows) => {
        if(err || rows == "" ){
            res.json(err);
        }
        else{
            res.cookie("cookieRestaurant","cookieRestaurant",{maxAge: 900000, httpOnly: false});
            req.session.user = rows;           
            res.json(rows);  
        }   
    })
    }

    static signUp(connection,req,res){
        var query = `INSERT INTO restaurants (email, restaurantName, password, contactNumber,restaurantZipCode,restaurantImgPath) VALUES (
            '${req.body.email}', '${req.body.name}', '${req.body.password}', '${req.body.contactNumber}','${req.body.zipCode}','');`;

        connection.query(query,(err, rows, fields) => {
        if(!err){
            var getRestaurantQuery = `SELECT * FROM restaurants WHERE email = '${req.body.email}'`;
            let restaurantData = null;
            console.log(rows.body);
            connection.query(getRestaurantQuery,(err,rows,fields)=>{
                restaurantData = rows;
            })
            
            var restaurantTableName = req.body.name.toString().trim().toLowerCase();
            console.log(restaurantTableName);
            // Now create a table for the Restaurant
            query = `CREATE TABLE '${restaurantTableName}' (
                itemid INT NOT NULL AUTO_INCREMENT,
                itemName VARCHAR(45) NULL,
                itemDescription VARCHAR(255) NULL,
                itemPrice INT NOT NULL,
                itemImage VARCHAR(255) NULL,
                PRIMARY KEY (itemid)); `;
            connection.query(query,(err)=>{ 
                if(err){
                    res.json(err);
                }
                else{
                    res.json(restaurantData);
                }
            })

        }

        else{
            res.json([err]);
        }
    });

    }

    static update(connection,restaurant){

    }

    static getrestaurant(connection,restaurant){
        
    }

}
module.exports.default = Restaurant;