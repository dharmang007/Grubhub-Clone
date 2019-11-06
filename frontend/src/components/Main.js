import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './login';
import Home from './Customers/home';
import SignUpRestaurant from './Restaurants/signUpRestaurant';
import SignUpUser from './Customers/signUpUser';
import CustomerOrders from './Customers/CustomerOrders';
import ViewResturants from './Customers/viewRestaurants';
import RestaurantProfile from './Restaurants/restaurantProfile';
import HomeRestaurant from './Restaurants/homeRestaurant';
import SeeOrders from './Restaurants/seeOrders';
import AddMenu from './Restaurants/AddMenu';
import Default from './default';
import setToken from '../utils/setToken';

//Create a Main Component
class Main extends Component {
    render(){
        return(
                <div>                
                    <Switch>
                    <Route path="/create-user" component={SignUpUser}/>
                    <Route path="/create-restaurant" component={SignUpRestaurant}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/customer/my-orders" component={CustomerOrders}/>
                    <Route path="/restaurant/see-orders" component={HomeRestaurant}/>
                    <Route path="/restaurant/add-menu" component={AddMenu}/>
                    <Route path="/restaurantProfile" component={RestaurantProfile}/>
                    <Route path="/home-restaurant" component={HomeRestaurant}/>
                    <Route path="/view-restaurants" component={ViewResturants}/>
                    <Route path="/see-orders" component={SeeOrders}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Default}/>
                    </Switch>
                </div>
        )
    }
}
//Export The Main Component
export default Main;