import {combineReducers} from 'redux';
import userReducer from './userReducer';

// this User Handles both Customer user type and Restuarant UserType
export default combineReducers({
    user : userReducer
})
