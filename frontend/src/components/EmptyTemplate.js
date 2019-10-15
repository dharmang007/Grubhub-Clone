import React, { Component } from "react";
import "./login.css";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import history from '../history';
import {Button, Form, FormGroup,Label, Input } from'reactstrap';

export default class SignUpUser extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            name :"",
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
        const req = {
            name:this.state.name,
            email: this.state.email,
            password: this.state.password,
            contactNumber: this.state.contactNumber

        }
        axios.post('http://localhost:3001/create-user',req)
        .then(response => {
            console.log(response);
            if(response.status === 200 && response.data != ""){
                
                this.setState({
                    status: true
                })
                console.log("Response Data "+response.data);
                history.push('/home',response.data);
                console.log(history);
            }else{
                
                console.log("error")
                this.setState({
                    status:false
                })
                
            }
        });

       
    }
      
    render(){    
        let errorMsg=null;
        let redirectVar = null;
        if(this.state.status){

            redirectVar = <Redirect to="/home"/>
            errorMsg = "";
        }
        else{
            errorMsg = "You are already registered! Please use the login page";
        }
        return (
            <div>
                {redirectVar}
                <GeneralNavbar/>
            <div className = "SignUpUser">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1> Sign Up User </h1>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.onNameChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contantNumber">Contact Number</Label>
                            <Input type="text" name="contactNumber" id="contantNumber" onChange={this.onContantChangeEvent} required/>
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
                            <Button color="danger" onClick={this.submitButtonEvent} block> Login </Button>
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