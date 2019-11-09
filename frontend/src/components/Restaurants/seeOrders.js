import React, { Component } from "react";
import {Table} from 'reactstrap';
import axios from 'axios';
import "../login.css";
import {Redirect} from 'react-router';
import defaultValues from "../../constants/defaultValues";


export default class SeeOrders extends Component{
    
    constructor(props){
        super(props);
        this.state={
            redirect : null
        }
        
    }

    componentWillMount(){
        if(localStorage.userId){
            axios.get(defaultValues.serverURI+'/api/restaurants/'+localStorage.userId+'/orders')
            .then((response) => {
            //update the state with the response data
            this.setState({
                restaurants : response.data 
            });
            console.log(this.state.restaurants); 
            });
        }
        else 
        {
            this.setState({
                redirect:<Redirect to="/login"/>
            })
        }
        
    }
    

    render(){

        return(    
                
            <div className="Orders">
                <Table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </Table>
            </div>
                
        );
    }

}