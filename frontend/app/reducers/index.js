import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  auth,
  profile,
  routing,
});
