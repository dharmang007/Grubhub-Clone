
import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from '../navbar';
import history from '../../history';
import Axios from "axios";
import { Tabs, Tab, Panel } from '@bumaga/tabs';
import DisplayMenu from "./DisplayMenu";
export default class RestaurantProfile extends Component{    
        
    constructor(props){
        
        super(props);
        this.state = {
            restId : this.props.match.params.restId,
            name: null,
            contact:null,
        }
        
    }
    
    componentDidMount(){
        // Get the basic details of Restaurant  
        try{

        }catch(err){
            
        }
    }
      
    render(){    
        return (
            <div>
                <GeneralNavbar/>
                <h1></h1>             
                <div className = "Profile">
                    <div className="jumbotron">
                    
                    </div>    
                    <Tabs>
                        <div>
                        <Tab><button>Show Menu</button></Tab>
                        </div>
                        <div>
                            <Panel><DisplayMenu restId={this.state.restId}/></Panel>
                        </div>
                    </Tabs>
                </div>
            </div>
        )
    }
}