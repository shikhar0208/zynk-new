import * as api from './api';
import {
  EMPLOYER_LOGIN,
  EMPLOYER_LOGOUT,
  GET_ALL_EMPLOYER_VERIFICATION,
  SET_EMPLOYER_PROFILE_DETAILS,
} from '../actionTypes';

export const employerLogin = (loginData, history) => async (dispatch) => {
  try {
    const { data } = await api.employerLogin(loginData);
    const response = await api.getEmployerDetails(data.employer_zynk_id);
    dispatch({
      type: EMPLOYER_LOGIN,
      payload: {
        employerDetails: response.data,
        employer_zynk_id: data.employer_zynk_id,
      },
    });
    history.push('/employer-dashboard');
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
    alert(message);
  }
};

export const setEmployerDetails = (employerId, history) => async (dispatch) => {
  try {
    // const { data } = await api.employerLogin(loginData);
    const response = await api.getEmployerDetails(employerId);
    dispatch({
      type: EMPLOYER_LOGIN,
      payload: { employerDetails: response.data, employer_zynk_id: employerId },
    });
    return history.push('/employer-dashboard');
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
    alert(message);
  }
};

export const getEmployerVerifications = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAllEmployerVerifications(id);
    dispatch({
      type: GET_ALL_EMPLOYER_VERIFICATION,
      payload: data,
    });
    // console.log(data);
    return data;
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const updateEmployerDetails = (id, updates) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployerDetails(id, updates);
    const response = await api.getEmployerDetails(id);
    dispatch({
      type: SET_EMPLOYER_PROFILE_DETAILS,
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

export const uploadVerificationDetails =
  (fileData, category) => async (dispatch) => {
    try {
      const { data } = await api.uploadVerificationDetails(fileData, category);
      return data;
    } catch (err) {
      console.log('something went wrong');
      return err;
    }
  };

export const employerLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYER_LOGOUT,
    });
  } catch (err) {
    console.log('something went wrong');
  }
};
