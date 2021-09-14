import * as api from './api';
import {
  VERIFIER_LOGIN,
  VERIFIER_LOGOUT,
  VERIFIER_SIGNUP,
  GET_ALL_VERIFICATIONS_DETAILS,
  SET_VERIFIER_PROFILE_DETAILS,
} from '../actionTypes';

export const verifierSignup = (signupData, history) => async (dispatch) => {
  try {
    const { data } = await api.verifierSignup(signupData);
    if (data?.verifier_zynk_id) {
      const response = await api.getVerifierDetails(data.verifier_zynk_id);
      dispatch({
        type: VERIFIER_SIGNUP,
        payload: { verifierDetails: response.data },
      });
      history.push('/verifier-dashboard');
      // console.log(response);
    } else {
      console.log(data.message);
    }
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const verifierLogin = (loginData, history) => async (dispatch) => {
  try {
    const { data } = await api.verifierLogin(loginData);
    if (data.response === 1) {
      const response = await api.getVerifierDetails(data.verifier_zynk_id);
      dispatch({
        type: VERIFIER_LOGIN,
        payload: {
          verifierDetails: response.data,
        },
      });
      history.push('/verifier-dashboard');
    } else {
      console.log(data.message);
    }
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const verifierLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: VERIFIER_LOGOUT,
    });
  } catch (err) {
    console.log('something went wrong');
  }
};

export const getVerificationDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAllVerificationDetails(id);
    dispatch({
      type: GET_ALL_VERIFICATIONS_DETAILS,
      payload: data,
    });
    console.log(data);
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const updateVerifierDetails = (id, updates) => async (dispatch) => {
  try {
    const { data } = await api.updateVerifierDetails(id, updates);
    const response = await api.getVerifierDetails(id);
    dispatch({
      type: SET_VERIFIER_PROFILE_DETAILS,
      payload: response.data,
    });
    console.log(data);
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

// export const setUserDetails = (history) => async (dispatch) => {
//   try {
//     const user = await api.getUser();
//     dispatch({
//       type: SET_USER_DETAILS,
//       payload: user.data,
//     });
//   } catch (err) {
//     const message = err?.response?.data?.message
//       ? err.response.data.message
//       : 'Something went wrong';
//     console.log(message);
//   }
// };
