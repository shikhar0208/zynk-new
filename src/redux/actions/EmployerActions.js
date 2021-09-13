import * as api from './api';
import {
  EMPLOYER_LOGIN,
  EMPLOYER_LOGOUT,
  GET_ALL_EMPLOYER_VERIFICATION,
} from '../actionTypes';

export const employerLogin = (loginData, history) => async (dispatch) => {
  try {
    const { data } = await api.employerLogin(loginData);
    const response = await api.getEmployerDetails(data.employer_zynk_id);
    dispatch({
      type: EMPLOYER_LOGIN,
      payload: { employerDetails: response.data },
    });
    history.push('/employer-dashboard');
  } catch (err) {
    const message = err?.response?.data?.message
      ? err.response.data.message
      : 'Something went wrong';
    console.log(message);
  }
};

export const getEmployerVerifications = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAllEmployerVerifications(id);
    dispatch({
      type: GET_ALL_EMPLOYER_VERIFICATION,
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

export const employerLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYER_LOGOUT,
    });
  } catch (err) {
    console.log('something went wrong');
  }
};
