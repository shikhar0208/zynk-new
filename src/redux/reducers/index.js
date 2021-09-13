import { combineReducers } from 'redux';

import verifierReducer from './verfierReducer';
import employerReducer from './employerReducer';
export default combineReducers({
  verifierReducer,
  employerReducer,
});
