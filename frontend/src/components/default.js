import React, { Component } from "react";
import "./login.css";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

export default class Default extends Component{


    render(){
        let redirectToLogin = null;
        if(!cookie.load('cookieUser')){
            redirectToLogin = <Redirect to= "/login"/>
        }
        else {
            redirectToLogin = <Redirect to="/home"/>
        }
        return(    
            <div>
                {redirectToLogin}
            </div>
                
        );
    }

}