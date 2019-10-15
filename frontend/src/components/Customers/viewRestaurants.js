import React, { Component } from "react";
import "../login.css";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Card,CardImg,CardBody,CardTitle,CardSubtitle} from 'reactstrap';
export default class Home extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            restaurants : [],
            nextPage : null
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:3001/view-restaurants')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    restaurants : response.data 
                });
                console.log(this.state.restaurants);
                
            });
    }

    


    render(){        
        let allRestaurants = this.state.restaurants.map(i =>{
            return(        
                <Card className="container">
                    <div className ="row container">
                        <div className="col-md-6 col-sm-6"><CardImg top width="100%"  alt="Card image cap" /></div>
                        <div className="col-md-6 col-sm-6">
                            <CardBody>
                                <CardTitle><Link to="/restaurantProfile" id={i.restaurant_Id} > {i.restaurantName} </Link> </CardTitle>
                                <CardSubtitle>Contant Number: {i.contactNumber} </CardSubtitle>
                                <CardSubtitle>Zip Code: {i.restaurantZipCode}</CardSubtitle>
                            </CardBody>
                        </div>       
                    </div>
                    
                </Card>
            )
        });
        return(    
            
            <div className="ViewRestaurants">
                <div>
                    <h3>Restaurants</h3>
                </div>
                <div>
                    {allRestaurants}
                </div>
                    
            </div>
                
                
        );
    }

}