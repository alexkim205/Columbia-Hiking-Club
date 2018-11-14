// Set up your root reducer here...
import { combineReducers } from 'redux';
import auth                from './auth';
import hike                from './hike';

const rootReducer = combineReducers({
  auth,
  hike,
});

export default rootReducer;

// const hikingReducers = combineReducers({
//
// });
