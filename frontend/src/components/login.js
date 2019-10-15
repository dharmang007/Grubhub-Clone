import React, { Component } from "react";
import "./login.css";
import cookie from 'react-cookies';
import GeneralNavbar from './Customers/navbar';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import history from '../history';
import {Button, Form, FormGroup,Label, Input, Dropdown,
     DropdownMenu, DropdownItem, DropdownToggle } from'reactstrap';
     
import { connect } from "react-redux";
import actions from '../actions';
const userType = {customer:"Customer",restaurant:"Restaurant"}
class Login extends Component{    
    constructor(props){
        super(props);
        this.state = {
            email : "",
            name : "",
            password: "",
            dropdownOpen: false,
            userType: userType.customer,
            authFlag:false,
            errorMsg :null
        }
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        this.userTypeChangeEvent = this.userTypeChangeEvent.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    UNSAFE_componentWillMount(){
        this.setState({
            authFlag:false,
            userType: userType.customer
        })
    }
    onEmailChangeEvent = (e) =>{
        console.log(e.target.value);
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
        

        if(this.state.email == "user@gmail.com" && this.state.password=="user1")
        {
            this.setState({
                authFlag:true                
            })   
            let user = {
                email:this.state.email,
                password:this.state.password
            };
            this.props.userLoggedin(user);
        }
        else{
            this.setState({
                errorMsg:"Please check your credentials.",
                authFlag:false
            })
        }
        /*
        const req = {
            userType : this.state.userType,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:3001/login',req)
        .then(response => {
            if(response.status === 200 && response.data != null){
                console.log("responseData");
                console.log(response.data[0]);
                //localStorage.setItem(response.data)
                if(this.state.userType == userType.customer){
                    cookie.save('cookie', response.data[0].customer_id, { path: '/' });
                    sessionStorage.setItem("email",response.data[0].email);
                    sessionStorage.setItem("name",response.data[0].name);
                    
                }
                else{
                    cookie.save('restaurantId', response.data[0].restaurant_id, { path: '/' })
                    sessionStorage.setItem("email",response.data[0].email);
                    sessionStorage.setItem("name",response.data[0].name);
                }
                 
                
                
                this.setState({
                
                    authFlag:true
                })
            }else{
                
                this.setState({
                    errorMsg : "Invalid Credentials!",
                    authFlag:false
                })
            }           
        });*/   
    }

    render(){    
        
        let signUpLink = null,redirectVar = null;
        if(this.state.userType == userType.customer){
            signUpLink = <Link to='/create-user'>Not a user? Sign Up</Link>
        }
        else{
            signUpLink = <Link to='/create-restaurant'> Expand your Business! Sign Up</Link>
        }


        if(this.state.authFlag){
            if(this.state.userType == userType.customer){
                redirectVar = <Redirect to='/home'/>
            }
            else {
                redirectVar = <Redirect to='/home-restuarant'/>
            }
        }
        console.log(this.state.errorMsg);
        return (
            <div>
                {redirectVar}
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
                        {this.state.errorMsg}
                    </Form>
                    </div>
                </div>            
            </div>
            </div>
        )
    }
}
const stateToProps = (state) =>{
    return {
        //user: state.user
    }
}
const dispatchToProps = (dispatch) =>{
    return {

        userLoggedin :  (user) =>dispatch(actions.userLoggedin(user))
    }
}
export default connect(stateToProps,dispatchToProps)(Login)