import axios from 'axios';
// import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'https://zyncbackend.herokuapp.com/',
});

// const API = axios.create({
//   baseURL: 'http://65.2.123.240:2811/',
// });

// API.interceptors.request.use((req) => {
//   if (Cookies.get('userJWT')) {
//     req.headers['x-access-token'] = Cookies.get('userJWT');
//   }
//   return req;
// });

// Verifier Routes
export const verifierLogin = (loginData) =>
  API.post('/verifier-login', loginData);

export const uploadAttachment = (data) => API.post('/upload-attachment', data);

export const verifierSignup = (signupData) =>
  API.post('/verifier-sign-up', signupData);

export const getVerifierDetails = (id) =>
  API.post('/get-verifier-profile', { verifier_zynk_id: id });

export const getAllVerificationDetails = (id) =>
  API.post('/get-all-verifications-verifier', {
    verifier_zynk_id: id,
  });

export const getVerificationSummaryByStatus = (id) =>
  API.post('/get-verification-summary', {
    verifier_zynk_id: id,
  });

export const updateVerifierDetails = (id, changes) =>
  API.post('/update-verifier-profile', {
    verifier_zynk_id: id,
    ...changes,
  });

export const submitNewVerification = (formData) => {
  API.post('/submit-new-verification', formData);
};

export const getEmployers = () => API.post('/get-employers');

export const getVerificationOrder = (formData) =>
  API.post('/get-verification-detail-order', formData);

export const purchaseNewVerification = (formData) =>
  API.post('/purchase-new-verification', formData);

// Employer routes
export const employerLogin = (loginData) =>
  API.post('/employer-login ', loginData);

export const getEmployerDetails = (id) =>
  API.post('/get-employer', { employer_zynk_id: id });

export const getAllEmployerVerifications = (id) =>
  API.post('/get-all-verifications-employer', {
    employer_zynk_id: id,
  });

export const updateEmployerDetails = (id, changes) =>
  API.post('/update-employer', {
    employer_zynk_id: id,
    ...changes,
  });

export const getBusinessUnitSummary = (id) =>
  API.post('/get-business-summary-employer', {
    employer_zynk_id: id,
  });

export const getBusinessUnitSummaryByDate = (formData) =>
  API.post('/get-business-summary-employer-bydates', formData);

export const getVerificationSummaryByDate = (formData) =>
  API.post('/get-verification-summary-employer-bydates', formData);

export const getVerificationSummaryByReason = (id) =>
  API.post('/get-verification-summary-employer', {
    employer_zynk_id: id,
  });

export const uploadVerificationDetails = (fileData, category) =>
  API.post(`/upload-verification-details/${category}`, fileData);

//Admin Routes
export const adminLogin = (formData) => API.post('/admin-login', formData);
export const adminStats = () => API.post('/admin-stats');

export const addEmployer = (formData) => API.post('/add-employer', formData);

export const getAllVerifiers = () => API.post('/all-verifiers');
export const getAllEmployers = () => API.post('/all-employers');
export const getVerificationRequestDetails = () =>
  API.post('/all-verification-requests');
export const getVerificationStatuses = () =>
  API.post('all-verification-statuses');
export const getAllExtracts = () => API.post('/all-extracts');

//Forgot-Password
export const forgotPassLink = (userType, formData) =>
  API.post(`/forgot-password/${userType}`, formData);

export const resetPass = (formData) => API.post('/new-password', formData);
