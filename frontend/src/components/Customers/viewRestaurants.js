import React, { Component } from "react";
import "./viewRestaurants.css";
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GeneralNavbar from '../navbar';
import DefaultValues from '../../constants/defaultValues';
import {
    Container, Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
export default class ViewRestaurants extends Component{
    
    constructor(){
        
        super()
        this.state = {
            restaurants : [],
            currentPage:0,
            nextRestaurantId:null
        }
        this.pageSize = 2;
        this.pagesCount = 5;

    }    
    componentDidMount(){

        axios.get('http://localhost:3001/api/restaurants/view-restaurants')
                .then((response) => {
                //update the state with the response data
                console.log(response.data);
                this.setState({
                    restaurants : response.data,
                    nextRestaurantId:null 
                });
                console.log(this.state.restaurants); 
            });

        this.setState({
            pagesCount : Math.ceil(this.state.restaurants.length / this.pageSize)
        });
    

    }

    handleClick(e, index) 
    {
    
        e.preventDefault();
        this.setState({
          currentPage: index
        });
        
    }

    restaurantPage = (restuarantId) =>{
      this.setState({
        nextRestaurantId: restuarantId 
      });
    }
    render(){        

        var selectedRestaurant = null;
        if(this.state.nextRestaurantId != null){
          selectedRestaurant = <Redirect to='/restaurantProfile'/>
        }      
        const { currentPage } = this.state;
        let allRestaurants = [...this.state.restaurants];
        allRestaurants = allRestaurants.slice(currentPage * this.pageSize,(currentPage + 1) * this.pageSize);
        allRestaurants = allRestaurants.map((i,j) =>{
            return(  
                <div className="data-slice" key={j} >
                    <Card className="RestaurantCard">
                        <CardImg top width="100%" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>{i.name}</CardTitle>
                            <CardSubtitle>Contant Number: {i.contact}</CardSubtitle>
                            <CardText>{i.desc}</CardText>
                            <Button>See Menu</Button>
                        </CardBody>
                    </Card>
                </div> 
            )
        });

        return(    
        
        <div className="ViewRestaurants">
            {}
            <div>
                <h3>Restaurants</h3>
            </div>   
        <div className="pagination-wrapper">
        {allRestaurants}
          <Pagination aria-label="Page navigation example">
            
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
        );
    }

}