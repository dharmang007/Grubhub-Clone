import UserActionConstants from '../constants/actionTypes';

var initialState = {
    user : null
}
export default (state=initialState,action) => {
    
    //let newState = Object.asssign({},state)
    let newState = null;

    switch(action.type){
        case UserActionConstants.USER_LOGGEDIN:
            console.log("Reducer Called!" + JSON.stringify(action.data));
            newState = Object.assign({},state,{
                user : action.data
            })
            return newState;
            //newState['user'] = action.data
    }
    return state


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