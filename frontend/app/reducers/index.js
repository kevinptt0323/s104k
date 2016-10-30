import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import user from './user';
import profile from './profile';

export default combineReducers({
  auth,
  user,
  profile,
  routing,
});
