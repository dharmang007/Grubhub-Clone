import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from '../navbar';
import {Redirect} from 'react-router';
import axios from 'axios';
import history from '../../history';
import store from '../../stores';
import {Button, Form,FormText, FormGroup,Label, Input } from'reactstrap';

     
export default class CustomerOrders extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            customer : store.getState().user,
            orders: []
        }
        console.log(this.state.customer);   
    }
    
    componentWillMount(){
        
    }
      
    render(){    
        return (
            <div>
                <h2>Customer Orders</h2>    
            </div>
        )
    }
}