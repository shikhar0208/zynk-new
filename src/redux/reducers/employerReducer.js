import {
  EMPLOYER_LOGIN,
  EMPLOYER_LOGOUT,
  GET_ALL_EMPLOYER_VERIFICATION,
  SET_EMPLOYER_PROFILE_DETAILS,
} from '../actionTypes';

const initialState = {
  employerData: null,
  isAuthenticated: false,
  verificationDetails: [],
};

const employerReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYER_LOGIN:
      // Cookies.set('userJWT', action?.payload?.token, {
      //   expires: 7,
      // });
      return {
        ...state,
        employerData: action?.payload?.employerDetails,
        isAuthenticated: true,
      };

    // case SET_USER_DETAILS:
    //   return {
    //     ...state,
    //     userData: action?.payload,
    //     isAuthenticated: true,
    //   };
    case GET_ALL_EMPLOYER_VERIFICATION:
      return {
        ...state,
        verificationDetails: action?.payload,
      };
    case SET_EMPLOYER_PROFILE_DETAILS:
      return {
        ...state,
        employerData: action?.payload,
      };
    case EMPLOYER_LOGOUT:
      // Cookies.remove('userJWT');
      return initialState;

    default:
      return state;
  }
};

export default employerReducer;
