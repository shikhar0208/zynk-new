import * as api from './api';
import { ADMIN_LOGIN, ADMIN_LOGOUT, GET_ALL_EMPLOYERS } from '../actionTypes';

export const adminLogin = (loginData, history) => async (dispatch) => {
  try {
    const { data } = await api.adminLogin(loginData);
    if (data.response === 1) {
      const response = await api.adminStats();
      const verifiers = await api.getAllVerifiers();
      const employers = await api.getAllEmployers();
      const requestDetails = await api.getVerificationRequestDetails();
      const statuses = await api.getVerificationStatuses();
      const extracts = await api.getAllExtracts();
      dispatch({
        type: ADMIN_LOGIN,
        payload: {
          adminStats: response.data,
          allVerifiers: verifiers.data,
          allEmployers: employers.data,
          allRequests: requestDetails.data,
          allStatuses: statuses.data,
          allExtracts: extracts.data,
          adminLogin: true,
        },
      });
      history.push('/admin/dashboard');
    }
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
    alert(message);
  }
};

export const addEmployer = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addEmployer(formData);
    console.log(data);
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const getAllEmployers = () => async (dispatch) => {
  try {
    const employers = await api.getAllEmployers();
    dispatch({
      type: GET_ALL_EMPLOYERS,
      payload: {
        allEmployers: employers.data,
      },
    });
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const adminLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGOUT,
    });
  } catch (err) {
    console.log('something went wrong');
  }
};

// export const getVerificationDetails = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.getAllVerificationDetails(id);
//     dispatch({
//       type: GET_ALL_VERIFICATIONS_DETAILS,
//       payload: data,
//     });
//     console.log(data);
//   } catch (err) {
//     const message = err?.response?.data?.message
//       ? err.response.data.message
//       : 'Something went wrong';
//     console.log(message);
//   }
// };
