import React, { Component } from "react";
import "../login.css";
import RestaurantNavbar from './RestaurantNavbar';
import SeeOrders from './seeOrders';
import {Button} from 'reactstrap';
import cookie from "react-cookies";
export default class HomeRestaurant extends Component{
    
    constructor(props){
        super(props)
        this.state ={
            id : cookie.load("restaurantId"),
            view : (<SeeOrders/>)
        }
        console.log(props);
    }

    SeeOrders(){

    }

    CheckMenu(){

    }

    render(){

        return(    
                <div>
                    <RestaurantNavbar/>
                    <Button color="danger" onClick={this.SeeOrders()} block> Check Orders </Button>
                    <Button color="danger" onClick={this.CheckMenu()} block> Check Menu </Button>
                    Home Page for Restaurant
                    <div className="container" id="orders">
                        <SeeOrders rest />
                    </div>                   
                </div>
        );
    }

}