import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from '../navbar';
import store from '../../stores/index';
import {Redirect}  from 'react-router';
import setToken from '../../utils/setToken';
import axios from "axios";
import actions from '../../actions';
import defaultValues from "../../constants/defaultValues";
     
import { connect } from "react-redux";
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            user: store.getState(),
        }

    }
    
    componentWillMount(){
        if(localStorage.token)
        {
            setToken(localStorage.token);
            
            if(localStorage.userId){
                axios.get(defaultValues.serverURI+"/api/customers/"+localStorage.userId)
                .then(res =>{
                    console.log(res.data);
                    this.setState({
                        user:res.data
                    });
                }).
                catch(err => {
                    console.log(err);
                })
            }
        }
    }
    render(){
        var nextRedirect = null;
        
        return(    
                <div className="container">
                   
                    <GeneralNavbar/>
                    
                    <h3>Welcome  {this.state.user.name}</h3>      
                    <div className="row">                        
                        <img className="contain" src={defaultValues.serverURI+"/api/customers/"+this.state.user._id+"/profileImg"} />
                        <p>{defaultValues.serverURI+"/api/customers/"+this.state.user._id+"/profileImg"}</p>
                    </div>         
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
const dispatchToProps = dispatch => {
    
    return {
        
        userLoad :  (payload) =>dispatch(actions.userLoad(payload))
        
    }

}

export default connect(null,dispatchToProps)(Home)