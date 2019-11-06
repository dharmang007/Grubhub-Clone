import React, { Component } from "react";
import "../login.css";
import {Redirect} from 'react-router';
import axios from 'axios';
import {Button, Form, FormText, FormGroup,Label, Input} from'reactstrap';
import GeneralNavbar from "../navbar";
import actions from "../../actions";
import {connect} from "react-redux";
import defaultValues from "../../constants/defaultValues";
class SignUpRestaurant extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            name:"",
            owner:"",
            email : "",
            password: "",
            cuisine:"",
            contantNumber:"",
            profileImg:null,
            authToken:null,
            errorMsg:null
        }

        this.onNameChangeEvent = this.onNameChangeEvent.bind(this);
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        this.onContactChangeEvent = this.onContantChangeEvent.bind(this);
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

    onOwnerChangeEvent = (e) =>{
        this.setState({
            owner : e.target.value
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
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('owner',this.state.owner);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);
        formData.append('contact',this.state.contactNumber);
        formData.append('cuisine',this.state.cuisine);
        formData.append('profileImg',this.state.profileImg);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        axios.post(defaultValues.serverURI+'/api/restaurants/create-restaurant',formData,config)
        .then(async response => {
            if(response.status === 200){
                await this.props.userRegisteredPass(response.data);
                this.setState({
                    authToken: response.data.token,
                    errorMsg : null
                });
            }
        }).catch(err => {
            this.setState({
                authToken : null,
                errorMsg: "Server Error!"
            });
        });
    }

    
    render(){    
        let nextRedirect = null, errorMsg=null;
        
        if(this.state.authToken){
            nextRedirect = <Redirect to="/home-restuarant" />
        } 
        else{
            errorMsg = <p>{this.state.errorMsg}</p>;
        }
        
        return (
            <div>
                {nextRedirect}
                <GeneralNavbar/>
            <div id="SignUp">
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
                            <Label for="owner">Owner</Label>
                            <Input type="text" name="owner" id="owner" onChange={this.onOwnerChangeEvent} required/>
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
const dispatchToProps = dispatch => {
    
    return {
        
        userRegisteredPass :  (payload) =>dispatch(actions.userLoginPass(payload))
        
    }

}
export default connect(null,dispatchToProps)(SignUpRestaurant)
