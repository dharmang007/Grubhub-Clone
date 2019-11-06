import React, { Component } from "react";
import {Table} from 'reactstrap';
import axios from 'axios';
import "../login.css"
import defaultValues from "../../constants/defaultValues";


export default class SeeOrders extends Component{
    
    constructor(props){
        super(props);
        this.state={
            
        }
        
    }

    componentWillMount(){
        axios.get(defaultValues.serverURI+'/api/restaurants/orders')
        .then((response) => {
        //update the state with the response data
        this.setState({
            restaurants : response.data 
        });
        console.log(this.state.restaurants); 
        });
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
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
                
        );
    }

}