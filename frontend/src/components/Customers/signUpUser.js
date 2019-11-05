import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from '../navbar';
import {Redirect} from 'react-router';
import axios from 'axios';
import history from '../../history';
import {Button, Form, FormGroup,Label, Input } from'reactstrap';
     
export default class SignUpUser extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            name :"",
            email : "",
            password: "",
            contactNumber :"",
            profileImg:"",
            status:false
        }
        this.onNameChangeEvent = this.onNameChangeEvent.bind(this);
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.onContactChangeEvent = this.onContactChangeEvent.bind(this);
        this.onProfileImgChangeEvent = this.onProfileImgChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        
    }
    
    componentDidMount(){
        this.setState({
            status: false
        })
    }

    onNameChangeEvent = (e) =>{
        this.setState({
            name : e.target.value
        })
        
    }
    onContactChangeEvent = (e) =>{
        this.setState({
            contactNumber : e.target.value
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
        });
        
    }

    onProfileImgChangeEvent= (e) => {
        this.setState({
            profileImg : e.target.files[0]
        });
    }
    
    submitButtonEvent = (e) => {
        //send the Get Request to Server 
        e.preventDefault();
        const req = {
            name:this.state.name,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contactNumber,
            //TODO : Add profile image for user
            profileImg:this.state.profileImg
        }
        axios.post('http://localhost:3001/api/customers/create-user',req)
        .then(response => {
            console.log(response);
            if(response.status === 200 && response.data != ""){
                
                this.setState({
                    status: true
                })
                

            }else{
                
                this.setState({
                    status:false
                })
                
            }
            console.log("Response Data "+response.data);
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
            <div id = "SignUpSigIn">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1> Sign Up User </h1>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.onNameChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contactNumber">Contact Number</Label>
                            <Input type="text" name="contactNumber" id="contactNumber" onChange={this.onContactChangeEvent} required/>
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
                            <Label for="profileImg">File Upload</Label>
                            <Input type="file" name="profileImg" onChange= {this.onProfileImgChangeEvent} />
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