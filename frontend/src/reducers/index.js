// Set up your root reducer here...
import {combineReducers} from 'redux';
import auth from "./auth"


const rootReducer = combineReducers({
  auth
});

export default rootReducer;


// const hikingReducers = combineReducers({
//
// });
