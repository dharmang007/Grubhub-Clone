import {UserActionConstants} from '../constants/actionTypes';
import { jsxExpressionContainer } from '@babel/types';

var initialState = {
    token : localStorage.getItem('token'),
    isLoggedIn : null,
    loading: true,
    user:null
}
export default (state=initialState, action) => {
   
    
    switch(action.type){
        case UserActionConstants.USER_LOGIN_PASS:
            localStorage.setItem('token',action.payload.token);
            console.log("From User Reducer:: "+JSON.stringify(action.payload.user));
            return {
                ...state,
                ...action.payload,
                isLoggedIn:true,
                loading:false,
                user:action.payload.user
            }
        case UserActionConstants.USER_LOGIN_FAIL:
        case UserActionConstants.USER_AUTH_FAIL:
            localStorage.removeItem('token');
            console.log("From User Reducer : Login Failed");
            return{
                ...state,
                token: null,
                isLoggedIn:false,
                loading:false
            }
        case UserActionConstants.USER_LOAD:
            return {
                ...state,
                isLoggedIn:true,
                loading:false,
                user:action.payload
            }
        default:
            return state;
            
    }
    


}
/*
export default class UserReducer{
    
    static userReducer=(state=initialState,action)=>{
        let newState = Object.assign({},state); // Creating a complete new state
        
        switch(action.type){
            case UserActionConstants.USER_LOGGEDIN: 
            newState['user'] = action.data
        }
    }
   
}*/