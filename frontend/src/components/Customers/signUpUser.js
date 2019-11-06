import React, { Component } from "react";
import "./SignUp.css";
import GeneralNavbar from '../navbar';
import {Redirect} from 'react-router';
import axios from 'axios';
import { connect } from "react-redux";
import actions from '../../actions';
import {Button, Form,FormText, FormGroup,Label, Input } from'reactstrap';
import defaultValues from "../../constants/defaultValues";
     
class SignUpUser extends Component{    
        
    constructor(props){
        super(props);
        
        this.state = {
            name :"",
            email : "",
            password: "",
            contactNumber :"",
            profileImg:"",
            errorMsg:null,
            authToken:null,
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
            authToken:null
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
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);
        formData.append('contact',this.state.contactNumber);
        formData.append('profileImg',this.state.profileImg);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        /*
        const req = {
            name:this.state.name,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contactNumber,
            profileImg:this.state.profileImg
        }
        */
        axios.post(defaultValues.serverURI+'/api/customers/create-user',formData)
        .then(async response => {
            if(response.status === 200){
                await this.props.userRegisteredPass(response.data);
                this.setState({
                    authToken: response.data.token,
                    errorMsg:null
                }); 
            }
        }).catch(err=>{
            //let fullError = err.response.data.errors.join(",");
            console.log(err);
            this.setState({
                authToken : null,
                errorMsg: JSON.stringify(JSON.stringify(err.response))
            });
        });

       
    }
      
    render(){    
        let errorMsg =null;
        let nextRedirect = null;
        
        if(this.state.authToken){
            
            nextRedirect = <Redirect to="/home"/>
        }
        else{
            errorMsg = <p>{this.state.errorMsg}</p>;
            
        }
        return (
            <div>
                {nextRedirect}
                <GeneralNavbar/>
            <div id = "SignUp">
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
                            <Label for="profileImg">Profile Image</Label>
                            <Input type="file" name="profileImg" id="profileImg" onChange={this.onProfileImgChangeEvent} />
                            <FormText color="muted">
                                The file size should be less than 5MB.
                            </FormText>
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
const dispatchToProps = dispatch => {
    
    return {
        
        userRegisteredPass :  (payload) =>dispatch(actions.userLoginPass(payload))
        
    }

}
export default connect(null,dispatchToProps)(SignUpUser)