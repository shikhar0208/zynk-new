import { ADMIN_LOGIN, ADMIN_LOGOUT, GET_ALL_EMPLOYERS } from '../actionTypes';

const initialState = {
  adminStats: null,
  verifiersData: [],
  employersData: [],
  verificationRequestDetails: [],
  verificationRequestStatus: [],
  employerExtractDetails: [],
  isAuthenticated: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      // Cookies.set('userJWT', action?.payload?.token, {
      //   expires: 7,
      // });
      return {
        ...state,
        adminStats: action?.payload?.adminStats,
        verifiersData: action?.payload?.allVerifiers,
        employersData: action?.payload?.allEmployers,
        verificationRequestDetails: action?.payload?.allRequests,
        verificationRequestStatus: action?.payload?.allStatuses,
        employerExtractDetails: action?.payload?.allExtracts,
        isAuthenticated: true,
      };

    case GET_ALL_EMPLOYERS:
      return {
        ...state,
        employersData: action?.payload?.allEmployers,
      };
    case ADMIN_LOGOUT:
      // Cookies.remove('userJWT');
      return initialState;

    default:
      return state;
  }
};

export default adminReducer;
