import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from '../navbar';
import store from '../../stores/index';
import setToken from '../../utils/setToken';
import axios from "axios";
import actions from '../../actions';
     
import { connect } from "react-redux";
class Home extends Component{


    constructor(props){
        super(props)
        this.state={
            user: store.getState()
            
        }
    }


    render(){
        
        console.log("Store From Home Page:");
        console.log(this.state.user.user);
        return(    
                <div className="container">

                    <GeneralNavbar/>
                    <h3>Welcome  </h3>      
                    
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