import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from './navbar';
import store from '../../stores/index';
export default class Home extends Component{


    constructor(props){
        super(props)
        this.state={
            user: store.getState()
        }
        console.log("From Home Page");
    }
    componentDidMount(){
            
    }
    render(){
        console.log("State : "+JSON.stringify(this.state.user.user.user.email));
        return(    
                <div className="container">

                    <GeneralNavbar/>
                    <h3>Welcome {this.state.user.user.user.email} </h3>      

                    <div className="row">
                        <div className="col-md-6"><p></p></div>
                        <div className="col-md-6"><p> </p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><p></p></div>
                        <div className="col-md-6"><p></p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><p></p></div>
                        <div className="col-md-6"><p></p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6"></div>
                    </div>

                </div>
        );
    }

}