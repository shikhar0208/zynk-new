import {
  VERIFIER_LOGIN,
  VERIFIER_SIGNUP,
  VERIFIER_LOGOUT,
  GET_ALL_VERIFICATIONS_DETAILS,
  SET_VERIFIER_PROFILE_DETAILS,
} from '../actionTypes';

import Cookies from 'js-cookie';

const initialState = {
  verifierData: null,
  verificationDetails: [],
  isAuthenticated: false,
};

const verifierReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFIER_LOGIN:
      Cookies.set('verifier_zynk_id', action?.payload?.verifier_zynk_id, {
        expires: 7,
      });
      return {
        ...state,
        verifierData: action?.payload?.verifierDetails,
        isAuthenticated: true,
      };

    case VERIFIER_SIGNUP:
      return {
        ...state,
        verifierData: action?.payload?.verifierDetails,
        isAuthenticated: true,
      };

    case GET_ALL_VERIFICATIONS_DETAILS:
      return {
        ...state,
        verificationDetails: action?.payload,
      };
    case SET_VERIFIER_PROFILE_DETAILS:
      return {
        ...state,
        verifierData: action?.payload,
      };
    case VERIFIER_LOGOUT:
      Cookies.remove('verifier_zynk_id');
      return initialState;

    default:
      return state;
  }
};

export default verifierReducer;
