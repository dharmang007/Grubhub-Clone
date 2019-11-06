
/* #region Import statements */
import React, { Component } from "react";
import GeneralNavbar from '../components/navbar';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./login.css";
import {Button, Form, FormGroup,Label, Input, Dropdown,
     DropdownMenu, DropdownItem, DropdownToggle } from'reactstrap';
     
import { connect } from "react-redux";
import actions from '../actions';
import defaultValues from '../constants/defaultValues';

/* #endregion */

const userType = {customer:"Customer",restaurant:"Restaurant"}
/**
 * @description This login component will be used for both Customer and Restaurant
 */
class Login extends Component{    
    
    constructor(){
        super();  
        this.state = {
            email : "",
            name : "",
            password: "",
            dropdownOpen: false,
            userType: userType.customer,
            authToken:null,
            errorMsg :null
        }
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        this.userTypeChangeEvent = this.userTypeChangeEvent.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        this.setState({
            authToken:null,
            userType: userType.customer
        })   
    }


    /* #region OnChange methods and Submit Method */
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

    userTypeChangeEvent = (e) =>{        
        this.setState({
            userType:  e.target.value
        })   
    }
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }
     
    // Login 
    submitButtonEvent = (e) => {
        //send the Get Request to Server 
        e.preventDefault();
        
        const req = {
            userType : this.state.userType,
            email: this.state.email,
            password: this.state.password
        }     
        
        axios.post(defaultValues.serverURI+'/api/auth/login',req)
        .then(async response => {
            
            if(response.status === 200){
                
                await this.props.userLoginPass(response.data);
                this.setState({
                    authToken:response.data.token
                });
            }
            
        }).catch( err=> {  
            //let fullError = err.response.data.errors.join(",");
            this.setState({
                authToken : null,
                errorMsg: "Incorrect Credential"
            });
        });    
}
    /* #endregion */
    
    render(){    
        
        let signUpLink = null;
        let errorMsg = null;
        let nextRedirect = null;
        if(this.state.userType == userType.customer){
            signUpLink = <Link to='/create-user'>Not a user? Sign Up</Link>
        }
        else{
            signUpLink = <Link to='/create-restaurant'> Expand your Business! Sign Up</Link>
        }

        if(this.state.authToken){
            
            if(this.state.userType == userType.customer){
                nextRedirect = (<Redirect to='/home'/>);    
            }
            else {
                nextRedirect = (<Redirect to='/home-restaurant' />);
            }
        }
        else{
            errorMsg = <p>{this.state.errorMsg}</p>;
            
        }

        return (
            <div>
                {nextRedirect}
            <GeneralNavbar/>
            <div className = "Login">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1> Login </h1>
                    <Dropdown id="userSelection" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.state.userType}
                        </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem value={userType.customer} onClick={this.userTypeChangeEvent}>Customer</DropdownItem>
                            <DropdownItem value={userType.restaurant} onClick={this.userTypeChangeEvent}>Restuarant</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Form>
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
                        
                        <FormGroup>                       
                            {signUpLink}
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

const dispatchToProps = dispatch => {
    
    return {

        userLoginPass :  (payload) =>dispatch(actions.userLoginPass(payload))
    }

}
export default connect(null,dispatchToProps)(Login)