import {UserActionConstants} from '../constants/actionTypes';

export default{
    
    userLoginPass: (payload) => {
        return {
            type : UserActionConstants.USER_LOGIN_PASS,
            payload : payload    
        }
    },
    userLoginFail: () =>{
        return{
            type : UserActionConstants.USER_LOGIN_FAIL
        }
    },

    userLoad: () => {
        return {
            type: UserActionConstants.USER_LOAD
        }
    },

    authError: () =>{
        return {
            type: UserActionConstants.USER_AUTH_FAIL
        }
    }
   
}  