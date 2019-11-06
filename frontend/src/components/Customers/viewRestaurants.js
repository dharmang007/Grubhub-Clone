import React, { Component } from "react";
import "./viewRestaurants.css";
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GeneralNavbar from '../navbar';
import DefaultValues from '../../constants/defaultValues';
import {
    Container,FormGroup,Form,Label, Input, Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import defaultValues from "../../constants/defaultValues";
export default class ViewRestaurants extends Component{
    
    constructor(){    
        super()
        this.state = {
            restaurants : [],
            currentPage:0,
            nameFilter:null,
            cuisineFilter:null,
            nextRestaurantId:null
        }
        this.onNameChangeEvent= this.onNameChangeEvent.bind(this);
        this.onCuisineChangeEvent= this.onCuisineChangeEvent.bind(this);
        this.Filter = this.Filter.bind(this);
        this.DisplayAllRestaurants = this.DisplayAllRestaurants.bind(this);
        this.FilterRestaurantWithName = this.FilterRestaurantWithName.bind(this);
        this.FilterRestaurantWithCuisine = this.FilterRestaurantWithCuisine.bind(this);
        this.FilterRestaurantWithNameAndCuisine = this.FilterRestaurantWithNameAndCuisine.bind(this);
        this.pageSize = 2;
        this.pagesCount = 5;
    }    
    componentDidMount(){
      
      this.DisplayAllRestaurants();
      

    }

    Filter = (e) => {
      e.preventDefault();
      console.log("nameFilter: "+ this.state.nameFilter);
      console.log("cuisineFilter: "+ this.state.cuisineFilter);
      if(this.state.nameFilter && this.state.cuisineFilter){
        this.FilterRestaurantWithNameAndCuisine();
      }
      else if(this.state.nameFilter && (!this.state.cusineFilter || this.state.cuisineFilter.toString().length === 0 ))
      {
        this.FilterRestaurantWithName();
      }
      else if(this.state.cuisineFilter && (!this.state.nameFilter || this.state.nameFilter.toString().length === 0 )){
        this.FilterRestaurantWithCuisine();
      }
      else{
        this.DisplayAllRestaurants();
      }
      
    }
    FilterRestaurantWithName(){
      let para = {
        params :{
          name:this.state.nameFilter
        }
      }
      axios.get(defaultValues.serverURI+'/api/restaurants/view-restaurants/',para)
            .then((response) => {
            //update the state with the response data
            
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
    FilterRestaurantWithCuisine(){
      let para = {
        params :{
          cuisine:this.state.cuisineFilter
        }
      }
      axios.get(defaultValues.serverURI+'/api/restaurants/view-restaurants/',para)
            .then((response) => {
            //update the state with the response data
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
    FilterRestaurantWithNameAndCuisine(){
      let para = {
        params :{
          name:this.state.nameFilter,
          cusine:this.state.cusineFilter
        }
      };
      
      axios.get(defaultValues.serverURI+'/api/restaurants/view-restaurants/',para)
            .then((response) => {
            //update the state with the response data
            
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

    DisplayAllRestaurants(){
      axios.get(defaultValues.serverURI+'/api/restaurants/view-restaurants/')
            .then((response) => {
            //update the state with the response data
            console.log(response.data);
            this.setState({
                restaurants : response.data,
                nextRestaurantId:null 
            });
            
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

    onNameChangeEvent = (e) =>{
        
      this.setState({
          nameFilter : e.target.value
      })
      
    }
    onCuisineChangeEvent = (e) =>{
        
      this.setState({
          cuisineFilter : e.target.value
      })
      
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
          
            <div>
                <h3>Restaurants</h3>
            </div>   
              <Form>
                <FormGroup>
                    <Label for="name">Restaurant Name</Label>
                    <Input type="text" name="name" id="name" onChange={this.onNameChangeEvent}/>
                </FormGroup>
                <FormGroup>
                    <Label for="cuisine">Cuisine</Label>
                    <Input type="text" name="cuisine" id="cuisine" onChange={this.onCuisineChangeEvent}/>
                </FormGroup>
                <FormGroup>                       
                    <Button color="danger" onClick={this.Filter} block> Filter </Button>
                </FormGroup>
              </Form>
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