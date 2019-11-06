import React, { Component } from "react";
import "../login.css";
import {Redirect} from 'react-router';
import axios from 'axios';
import {Button, Form, FormText, FormGroup,Label, Input} from'reactstrap';
import GeneralNavbar from "../navbar";
import actions from "../../actions";
import {connect} from "react-redux";
import defaultValues from "../../constants/defaultValues";
export default class AddMenu extends Component{    
        
    constructor(props){
        super(props);
        this.state = {
            item:null,
            desc:null,
            price:null,
            section:null,
            img:null,
            itemList : [],
            restid : localStorage.id
        };
        this.onItemChangeEvent = this.onItemChangeEvent.bind(this);
        this.onDescChangeEvent = this.onDescChangeEvent.bind(this);
        this.onPriceChangeEvent = this.onPriceChangeEvent.bind(this);
        this.onSectionChangeEvent = this.onSectionChangeEvent.bind(this);
        this.onImgChangeEvent = this.onImgChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
        console.log(defaultValues.serverURI+'/api/restaurant/'+localStorage.userId+'/menu');
        
    }

    componentDidMount(){
        axios.get(defaultValues.serverURI+'/api/restaurants/'+localStorage.userId+'/menu')
        .then(async res => {
            console.log(res.data);
            this.setState({
                itemList: res.data
            })
        });
    }

    onItemChangeEvent = (e) =>{
        this.setState({
            item : e.target.value
        })
        
    }
    onDescChangeEvent = (e) =>{
        this.setState({
            desc : e.target.value
        })
        
    }
    onPriceChangeEvent = (e) =>{
        this.setState({
            price : e.target.value
        })
        
    }
    onSectionChangeEvent = (e) =>{
        this.setState({
            section : e.target.value
        })
        
    }
    onImgChangeEvent = (e) =>{
        this.setState({
            password : e.target.value
        })
        
    }
    // Sign Up 
    submitButtonEvent = (e) => {
        //send the Get Request to Server 
        e.preventDefault();
        const formData = new FormData();
        formData.append('item',this.state.item);
        formData.append('desc',this.state.desc);
        formData.append('price',this.state.price);
        formData.append('section',this.state.section);
        formData.append('img',this.state.img);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        axios.post(defaultValues.serverURI+'/api/restaurants/'+localStorage.userId+"/addmenu",formData,config)
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
                errorMsg: JSON.stringify(JSON.stringify(err.response.data.errors))
            });
        });
    }
    render(){    
      console.log(this.state.itemList);
        return (
            <div>
                <GeneralNavbar/>
            <div id="SignUp">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1> Add Item </h1>
                    <Form>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name="item" id="item" onChange={this.onItemChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="desc"> Description </Label>
                            <Input type="text" name="desc" id="desc" onChange={this.onDescChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="text" name="price" id="price" onChange={this.onPriceChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="section">Section</Label>
                            <Input type="text" name="section" id="section" onChange={this.onSectionChangeEvent} required />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="img">Image</Label>
                            <Input type="file" name="img" id="img" onChange={this.onImgChangeEvent} />
                            <FormText color="muted">
                                The file size should be less than 5MB.
                            </FormText>
                        </FormGroup>
                        <FormGroup>                       
                            <Button color="danger" onClick={this.submitButtonEvent} block> Add Item </Button>
                        </FormGroup>                        
                    </Form>

                    <h2> Menu </h2 >   
                    </div>
                </div>            
            </div>
            </div>
        )
    }
}
