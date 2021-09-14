import { combineReducers } from 'redux';

import verifierReducer from './verfierReducer';
import employerReducer from './employerReducer';
import adminReducer from './adminReducer';

export default combineReducers({
  verifierReducer,
  employerReducer,
  adminReducer,
});
