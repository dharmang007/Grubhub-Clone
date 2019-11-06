import React, { Component } from "react";
import "../login.css";
import RestaurantNavbar from './RestaurantNavbar';
import {Redirect} from 'react-router';
import SeeOrders from './seeOrders';
import { Button, Card, CardTitle, CardText, NavLink} from 'reactstrap';
import store from "../../stores";
import setToken from '../../utils/setToken';
import axios from "axios";
import defaultValues from "../../constants/defaultValues";
import { async } from "q";
export default class HomeRestaurant extends Component{    
    constructor(){
        super()
        this.state = {
            restuarant : store.getState().user.id
        }

        console.log("Home Page");
        
    }
    
    componentDidMount(){
       
        
    }

    SeeOrders(){

    }

    CheckMenu(){

    }

    render(){
        let nextRedirect = null;
        return(    
                <div>
                    <Button color="danger" onClick={this.SeeOrders()} block> Check Orders </Button>
                    <Button color="danger" onClick={this.CheckMenu()} block> Check Menu </Button>
                    <h3>Home Page </h3>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                        <Card body>
                            <CardTitle>Menu</CardTitle>
                            <CardText>Add, edit and remove the items from your menu</CardText>
                            <Button> <NavLink href="/restaurant/add-menu">Add Menu</NavLink></Button>
                        </Card>
                        <div className="col-md-6 col-sm-6">
                        <Card body className="text-center">
                            <CardTitle>Show Orders</CardTitle>
                            <CardText>See all the order you received</CardText>
                            <Button><NavLink href="/restuarant/see-orders">Show Orders</NavLink></Button>
                        </Card>
                        </div>
                    </div>      
                    </div> 
                     
                </div>
        );
    }

}
