import UserActionConstants from '../constants/actionTypes';

export default{
    
    userLoggedin: (user) => {
        console.log("Action Called!");
        return {
            type : UserActionConstants.USER_LOGGEDIN,
            data : user   
        }
    }
   
}  