import React, { Component } from "react";
import "./viewRestaurants.css";
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GeneralNavbar from '../navbar';
import defaultValues from '../../constants/defaultValues';
import { Col,Row,FormGroup,Form,Label, Input, Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
export default class ViewRestaurants extends Component{
    
    constructor(){    
        super()
        this.state = {
            restaurants : [],
            currentPage:0,
            nameFilter:null,
            cuisineFilter:null,
            showMenu:null
        }
        this.onNameChangeEvent= this.onNameChangeEvent.bind(this);
        this.onCuisineChangeEvent= this.onCuisineChangeEvent.bind(this);
        this.Filter = this.Filter.bind(this);
        this.DisplayAllRestaurants = this.DisplayAllRestaurants.bind(this);
        this.FilterRestaurantWithName = this.FilterRestaurantWithName.bind(this);
        this.FilterRestaurantWithCuisine = this.FilterRestaurantWithCuisine.bind(this);
        this.FilterRestaurantWithNameAndCuisine = this.FilterRestaurantWithNameAndCuisine.bind(this);
        this.resetPageCount =this.resetPageCount.bind(this);
        this.pageSize = 2;
        this.pagesCount = 5;
        
    }    
    componentDidMount(){
      
      this.DisplayAllRestaurants();
      this.setState({
        showMenu : null
      });

    }

    Filter = (e) => {
      e.preventDefault();
  
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
                restaurants : response.data
            });
            
        });

        this.resetPageCount();

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
                restaurants : response.data 
            });
            console.log(this.state.restaurants); 
        });

        this.resetPageCount();

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
            this.setState({restaurants : response.data,});
        });
      this.resetPageCount();
    }

    DisplayAllRestaurants(){
      axios.get(defaultValues.serverURI+'/api/restaurants/view-restaurants/')
            .then((response) => {
            //update the state with the response data
            console.log(response.data);
            this.setState({
                restaurants : response.data,
                
            });
            
        });
        this.resetPageCount();
      
    }

    resetPageCount(){
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

    render(){        
        
        const { currentPage } = this.state;
        let allRestaurants = [...this.state.restaurants];
        allRestaurants = allRestaurants.slice(currentPage * this.pageSize,(currentPage + 1) * this.pageSize);
        allRestaurants = allRestaurants.map((i,j) =>{
            return(  
              <Col sm={{ size: 'auto', offset: 1 }}>
              <div  style={ { marginbottom:"10px" }}>
                <div className="data-slice" key={j} >
                    <Card className="RestaurantCard">
                        <CardBody>
                            <img className="contain" alt = "No Image" src={defaultValues.serverURI+"/api/restaurants/"+i._id+"/profileImg"} width="200" height="100" />
                            <CardTitle>{i.name}</CardTitle>
                            <CardSubtitle>Contant Number: {i.contact}</CardSubtitle>
                            <CardText>{i.desc}</CardText>
                            <Button><Link to={"/restaurantProfile/"+i._id
                                              }  >See Menu</Link></Button>
                        </CardBody>
                    </Card>
                </div>
              </div>
                 </Col>
            )
        });

        return(    
          <div>
          <GeneralNavbar/>
          <div className="container">
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
        <Row>
          {allRestaurants}
        </Row>
        <Row id="pages">
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
        </Row>
        

    </div>
    </div> 
    </div>
        );
    }

}