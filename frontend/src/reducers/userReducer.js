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
            console.log("From Reducer"); 
            
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('userId',action.payload.user._id);
            localStorage.setItem('email',action.payload.user.email);
            return {
                ...state,
                ...action.payload,
                isLoggedIn:true,
                loading:false,
                user:action.payload.user
            }
        case UserActionConstants.USER_LOGIN_FAIL:
        case UserActionConstants.USER_AUTH_FAIL:
        case UserActionConstants.USER_LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
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
