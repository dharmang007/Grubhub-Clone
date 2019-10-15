import React, { Component } from "react";
import "../login.css";

import {Redirect} from 'react-router';
import axios from 'axios';
import history from '../../history';
import GeneralNavbar from '../Customers/navbar';
import {Button, Form, FormGroup,Label, Input} from'reactstrap';


export default class SignUpRestaurant extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email : "",
            password: "",
            zipCode:"",
            status:false,
            contantNumber:""
        }

        this.onNameChangeEvent = this.onNameChangeEvent.bind(this);
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        this.onContactChangeEvent = this.onContantChangeEvent.bind(this);
    }

    UNSAFE_componentWillMount(){
        this.setState({
            status: false
        })
    }

    onNameChangeEvent = (e) =>{
        this.setState({
            name : e.target.value
        })
        
    }

    onEmailChangeEvent = (e) =>{
        this.setState({
            email : e.target.value
        })
        
    }

    onContantChangeEvent = (e) =>{
        this.setState({
            contantNumber : e.target.value
        })
        
    }

    onPasswordChangeEvent = (e) =>{
        this.setState({
            password : e.target.value
        })
        
    }
    
    onZipcodeChangeEvent = (e) =>{
        this.setState({
            zipCode : e.target.value
        })
        
    }

    // Sign Up 
    submitButtonEvent = (e) => {
        //send the Get Request to Server 
        e.preventDefault();
        const req = {
            userType : this.state.userType,
            email: this.state.email,
            password: this.state.password,
            name:this.state.name,
            contactNumber:this.state.contantNumber,
            zipCode : this.state.zipCode

        }
        axios.post('http://localhost:3001/create-restaurant',req)
        .then(response => {
            if(response.status === 200 && response.data != ""){
                
                this.setState({
                    status : true
                })
                console.log("Response Data "+response.data);
                history.push('/home-restaurant',response.data);
                console.log(history);
            }else{
                this.setState({
                    status : false
                })
                
            }
        });

       
    }

    render(){    
        let redirectVar = null, errorMsg=null;
        
        if(this.state.status){
            redirectVar = <Redirect to="/home-restuarant" />
        } 
        
        return (
            <div>
                {redirectVar}
                <GeneralNavbar/>
            <div id="SignInSignUp">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1> Restaurant SignUp </h1>
                    <p>Grow your restaurant business</p>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.onNameChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" onChange={this.onEmailChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" onChange={this.onPasswordChangeEvent} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contantNumber">Contact Number</Label>
                            <Input type="text" name="contactNumber" id="contantNumber" onChange={this.onContantChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="zipcode">Zip Code</Label>
                            <Input type="text" name="zipcode" id="zipcode" onChange={this.onZipcodeChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>                       
                            <Button color="danger" onClick={this.submitButtonEvent} block> Sign Up </Button>
                        </FormGroup>
                        {errorMsg}
                    </Form>
                    </div>
                </div>            
            </div>
            </div>
        )
    }
}
