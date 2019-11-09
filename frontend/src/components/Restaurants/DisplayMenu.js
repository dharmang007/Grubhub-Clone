/**************************************************************************************
*
* @author Dharmang Solanki
* @description The DisplayMenu Component is the part of RestaurantProfile Component 
*
***************************************************************************************/

/** */
import React, { Component } from 'react';
import axios from 'axios';
import './DisplayMenu.css';
import defaultValues from '../../constants/defaultValues';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import GeneralNavbar from '../navbar';
import { Col,Row, Card, Button,CardTitle, CardText, 
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink,ButtonGroup
} from 'reactstrap';
export default class DisplayMenu extends Component {
    constructor(props){
        super(props)

        console.log(this.props);
        this.state = {
            restId : this.props.restId,
            currentPage:0,
            redirectPage:null,
            menu:[],
            cart:[],
            totalCost:0
        }
        this.getMenuFromServer = this.getMenuFromServer.bind(this);
        //this.getCartFromServer = this.getCartFromServer.bind(this);
        this.pageSize = 2;
        this.pagesCount = 5;
        
    }

    componentDidMount() {
        if(this.state.restId){

            this.getMenuFromServer();
            //this.getCartFromServer();      
        }
        else{
            this.setState({
                redirectPage:<Redirect to='/view-restaurants'/>
            });
        }
        
    }

    getMenuFromServer(){
        axios.get(defaultValues.serverURI+'/api/restaurants/'+this.state.restId+"/menu")
        .then((response) => {
        //update the state with the response data
            if(response.status === 200){
                this.setState({
                    menu : response.data
                })
            }
            
        }).catch(err=>{
          console.log(err); 
        });
    }

    

    handleClick(e, index) 
    {
        e.preventDefault();
        this.setState({
          currentPage: index
        });   
    }

    getMenuArray = (currentPage) =>{
        let menu = this.state.menu;
        console.log(menu);
        menu = menu.slice(currentPage * this.pageSize,(currentPage + 1) * this.pageSize);
        menu = menu.map((i,j) =>{
            return(  
              <Col sm={{ size: 'auto', offset: 1 }}>
              <div  style={ { marginbottom:"10px" }}>
                <div className="data-slice" key={j} >
                    <Card className="menuItem">
                        <CardBody>
                            <div className='row'>
                                <div id="itemImg" className='col-md-3'>
                                    <img className="contain" alt = "No Image" src={defaultValues.serverURI+"/api/restaurants/"+i._id+"/profileImg"} width="200" height="100" />
                                </div> 
                                <div id="itemDetials" className='col-md-9'>
                                    <CardTitle>{i.name}</CardTitle>
                                    <CardSubtitle>Contant Number: {i.contact}</CardSubtitle>
                                    <CardText>{i.desc}</CardText>
                                    <CardText>Price : {i.price}</CardText>
                                    <ButtonGroup>
                                        <Button color='danger'>Add</Button>
                                        
                                        <Button color="success">Remove</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
              </div>
                 </Col>
            )
        });
        return menu;
    } 
    showTotalCost =()=>{
        return "No Items in the Cart";
    }
    render(){        
        const { currentPage } = this.state;
        let menuItems = this.getMenuArray(currentPage);
        var customerCart = null;
        if(localStorage.userId){
            //customerCart = <Cart/>
        }
        return(    
            
        <div className="container">
            <div>
                <h3>Have a look at our menu!</h3>
            </div>   

            <div className="row">
            <div className="col-md-6">
            <div className="pagination-wrapper">
                <div className="row">
                    {menuItems}
                </div>
                <div className="row" id="pages">
                <Pagination >
                    <PaginationItem disabled={currentPage <= 0}>
                        
                        <PaginationLink
                        onClick={e => this.handleClick(e, currentPage - 1)}
                        previous
                        href="#"
                        />                
                    </PaginationItem>

                    {[...Array(this.pagesCount)].map((page, i) => 
                        <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                        
                        <PaginationLink
                        onClick={e => this.handleClick(e, currentPage + 1)}
                        next
                        href="#"
                        />
                        
                    </PaginationItem>
                </Pagination>
                </div>
            </div>
            </div>
            <div className="col-md-6">
                {customerCart}       
            </div>
        </div>
        
        </div> 
        
        );
    }
}
