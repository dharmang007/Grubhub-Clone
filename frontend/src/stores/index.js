import { createStore,applyMiddleware, combineReducers } from "redux";
import userReducer from '../reducers/userReducer';


const reducers = combineReducers({
    user : userReducer
})

const store = createStore(reducers);
export default store; 
