import React, { Component } from "react";
import "../login.css";

import {Redirect} from 'react-router';
import axios from 'axios';
import history from '../../history';
import {Button, Form, FormText, FormGroup,Label, Input} from'reactstrap';
import GeneralNavbar from "../navbar";
export default class SignUpRestaurant extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email : "",
            password: "",
            cuisine:"",
            status:false,
            contantNumber:"",
            profileImg:null
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
    
    onCusineChangeEvent = (e) =>{
        this.setState({
            cuisine : e.target.value
        })
        
    }

    onProfileImgChangeEvent = (e) => {
        this.setState({
            profileImg: e.target.files[0]
        });
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
            contact:this.state.contantNumber,
            cuisine : this.state.cuisine,
            profileImg: this.state.profileImg
        }
        axios.post('http://localhost:3001/api/restaurants/create-restaurant',req)
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
                            <Label for="cuisine">Cuisine</Label>
                            <Input type="text" name="cuisine" id="cuisine" onChange={this.onCusineChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="profileImg">Profile Image</Label>
                            <Input type="file" name="profileImg" id="profileImg" onChange={this.onProfileImgChangeEvent} />
                            <FormText color="muted">
                                The file size should be less than 5MB.
                            </FormText>
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
