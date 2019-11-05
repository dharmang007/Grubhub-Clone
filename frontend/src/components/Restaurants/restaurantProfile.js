import React, { Component } from "react";
import "../login.css";
import RestaurantNavbar from '../Restaurants/RestaurantNavbar';
import history from '../../history';
export default class RestaurantProfile extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            id :"",
            name : "",
            email : "",
            password: "",
            contactNumber :"",
            status:false
        }
        
        this.onNameChangeEvent = this.onNameChangeEvent.bind(this);
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.onContactChangeEvent = this.onContantChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        
    }
    
    componentDidMount(){
        let restaurantId = this.props.restaurantId;
        // Make a get request to fetch restaurant details
        
        this.setState({
            id:restaurantId
        })
    }

    
    onNameChangeEvent = (e) =>{
        this.setState({
            name : e.target.value
        })
        
    }
    onContantChangeEvent = (e) =>{
        this.setState({
            contantNumber : e.target.value
        })
        
    }
    onEmailChangeEvent = (e) =>{
        this.setState({
            email : e.target.value
        })
        
    }

    onPasswordChangeEvent = (e) =>{
        this.setState({
            password : e.target.value
        })
        
    }

    
    submitButtonEvent = (e) => {
        //send the Get Request to Server 
        e.preventDefault();
               
    }
      
    render(){    
        return (
            <div>
                <RestaurantNavbar/>
                <h1>Restaurant Profile</h1>             
            <div className = "Profile">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1> {this.state.id} </h1>
                    </div>
                </div>            
            </div>
            </div>
        )
    }
}