import {
  VERIFIER_LOGIN,
  VERIFIER_SIGNUP,
  VERIFIER_LOGOUT,
  GET_ALL_VERIFICATIONS_DETAILS,
  SET_VERIFIER_PROFILE_DETAILS,
} from '../actionTypes';

const initialState = {
  verifierData: null,
  verificationDetails: [],
  isAuthenticated: false,
};

const verifierReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFIER_LOGIN:
      // Cookies.set('userJWT', action?.payload?.token, {
      //   expires: 7,
      // });
      return {
        ...state,
        verifierData: action?.payload?.verifierDetails,
        isAuthenticated: true,
      };

    case VERIFIER_SIGNUP:
      // Cookies.set('userJWT', action?.payload?.token, {
      //   expires: 7,
      // });
      return {
        ...state,
        verfierData: action?.payload?.verfierDetails,
        isAuthenticated: true,
      };

    case GET_ALL_VERIFICATIONS_DETAILS:
    case SET_VERIFIER_PROFILE_DETAILS:
      return {
        ...state,
        verificationDetails: action?.payload,
      };

    case VERIFIER_LOGOUT:
      // Cookies.remove('userJWT');
      return initialState;

    default:
      return state;
  }
};

export default verifierReducer;
