import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { validator } from '../utils/helperFunctions';
import Loader from '../utils/Loader';
import {
  getEmployers,
  getVerificationOrder,
  purchaseNewVerification,
} from '../redux/actions/api';

import '../Styles/NewVerificationRequest.css';
import SubmitVerificationPopup from './SubmitVerificationPopup';

const initialData = {
  employer_zynk_id: '',
  employee_full_name: '',
  employee_id: '',
  aadhar_number: '',
  pan_number: '',
  employee_email_id: '',
  employee_phone: '',
  internal_reference: '',
  request_type: '',
  salary_range: '',
  verification_reason: '',
  business_contact_name: '',
  verifying_employer: '',
};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const NewVerificationRequest = (props) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);
  const [boolVal, setBoolVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [allEmployers, setAllEmployers] = useState([]);
  const [verificationId, setVerificationId] = useState('');

  const { verifier_zynk_id } = useSelector(
    (store) => store.verifierReducer?.verifierData
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEmployers();
      setAllEmployers(data);
      // console.log(data);
    };
    if (!boolVal) {
      fetchData();
      setBoolVal(true);
    }
  }, [boolVal]);

  var requiredFields = [
    'employer_zynk_id',
    'employee_full_name',
    'request_type',
    'verification_reason',
  ];

  const displayRazorpay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
    }

    const { data } = await getVerificationOrder({
      employee_id: formData.employee_id,
      verifier_zynk_id: verifier_zynk_id,
      request_type: formData.request_type,
    });
    const options = {
      key: 'rzp_test_k2yCzup0pdGZjg',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Donation',
      description: 'Thank you for nothing. Please give us some money',
      handler: async function (response) {
        // console.log('response of razorPay ', response);
        const datatoserver = {
          orderCreationId: data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          verifier_zynk_id: verifier_zynk_id,
          employer_zynk_id: formData.employer_zynk_id,
          employee_full_name: formData.employee_full_name,
          employee_id: formData.employee_id,
          aadhar_number: formData.aadhar_number,
          pan_number: formData.pan_number,
          employee_email_id: formData.employee_email_id,
          employee_phone: formData.employee_phone,
          internal_reference: formData.internal_reference,
          request_type: formData.request_type,
          salary_range: formData.salary_range,
          verification_reason: formData.verification_reason,
          verifying_employer: formData.verifying_employer,
          timeStamp: new Date(),
        };
        try {
          setIsLoading(true);
          const result = await purchaseNewVerification(datatoserver);
          setFormData(initialData);
          setVerificationId(result?.data?.verification_id);
          setIsLoading(false);
          setOpenPopup(true);
        } catch (e) {
          alert('Something went wrong, please try later.');
        }
      },
      prefill: {
        name: 'Snehangshu',
        email: 'text@example.com',
        phone_number: '9899999999',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleClosePopup = () => {
    props.setBoolVal(false);
    setOpenPopup(false);
    props.closeModal();
  };

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.requestType === 'I') {
      requiredFields = [...requiredFields, 'salary_range'];
    }

    if (formData.verification_reason === '3') {
      requiredFields = [...requiredFields, 'verifying_employer'];
    }

    const flag = validator(formData, requiredFields);
    if (flag === true) {
      if (
        formData.employee_id === '' &&
        formData.aadhar_number === '' &&
        formData.pan_number === ''
      ) {
        alert(
          'Enter atleast one among Employee id, Aadhaar number and PAN number'
        );
        return;
      }
      setErrors(null);
      // const verificationDetails = { ...formData, verifier_zynk_id };
      displayRazorpay();
    } else {
      setErrors(flag);
    }
  };

  return (
    <div className='modalContainer'>
      <div className='modalContent'>
        <div className='header rowWise'>
          <h1 style={{ marginBottom: '1rem' }}>New verification request</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='employerName'>
                Employer name <span className='required'>*</span>
              </label>
              <select
                name='employer_zynk_id'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${
                  formData.employer_zynk_id === '' ? 'grayColor' : ''
                } ${errors && errors.employer_zynk_id !== '' ? 'error' : ''}`}
              >
                <option
                  disabled
                  selected={formData.employer_zynk_id === ''}
                  value=''
                >
                  Select
                </option>
                {allEmployers.map((employer) => (
                  <option value={employer.employer_zynk_id}>
                    {employer.business_name}
                  </option>
                ))}
              </select>
              {errors && errors.employer_zynk_id !== '' && (
                <label className='errorMessage' htmlFor='employerZynkIdError'>
                  {errors.employer_zynk_id}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='employeeID'>Employee id</label>
              <input
                placeholder='Employee id'
                type='text'
                name='employee_id'
                value={formData.employee_id}
                onChange={handleFormChange}
                className={
                  errors && errors.employee_id && errors.employee_id !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.employee_id && errors.employee_id !== '' && (
                <label className='errorMessage' htmlFor='employeeIDError'>
                  {errors.employee_id}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='aadhaarNumber'>Aadhaar number</label>
              <input
                placeholder='Aadhaar number'
                type='text'
                name='aadhar_number'
                value={formData.aadhar_number}
                onChange={handleFormChange}
                className={
                  errors && errors.aadhar_number && errors.aadhar_number !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.aadhar_number !== '' && (
                <label className='errorMessage' htmlFor='aadhaarNumberError'>
                  {errors.aadhar_number}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='panNumber'>PAN number</label>
              <input
                placeholder='PAN number'
                type='text'
                name='pan_number'
                value={formData.pan_number}
                onChange={handleFormChange}
                className={
                  errors && errors.pan_number && errors.pan_number !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.pan_number !== '' && (
                <label className='errorMessage' htmlFor='panNumberError'>
                  {errors.pan_number}
                </label>
              )}
            </div>
          </div>
          <div className='columnWise'>
            <label htmlFor='employeeName'>
              Employee full name <span className='required'>*</span>
            </label>
            <input
              placeholder='Employee full name'
              type='text'
              name='employee_full_name'
              value={formData.employee_full_name}
              onChange={handleFormChange}
              className={
                errors && errors.employee_full_name !== '' ? 'error' : ''
              }
            />
            {errors && errors.employee_full_name !== '' && (
              <label className='errorMessage' htmlFor='employeeFullNameError'>
                {errors.employee_full_name}
              </label>
            )}
          </div>

          {/*
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='email'>Employee email id</label>
              <input
                placeholder='Email id'
                type='text'
                name='employee_email_id'
                value={formData.employee_email_id}
                onChange={handleFormChange}
                className={
                  errors &&
                  errors.employee_email_id &&
                  errors.employee_email_id !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.employee_email_id !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.employee_email_id}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='phoneNumber'>Phone number</label>
              <input
                placeholder='Phone number'
                type='text'
                name='employee_phone'
                value={formData.employee_phone}
                onChange={handleFormChange}
              />
            </div>
              </div>*/}
          <div className='rowWise'>
            <div className='custom-select columnWise'>
              <label htmlFor='requestType'>
                Request type <span className='required'>*</span>
              </label>
              <select
                name='request_type'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${
                  formData.request_type === '' ? 'grayColor' : ''
                } ${errors && errors.request_type !== '' ? 'error' : ''}`}
              >
                <option
                  disabled
                  selected={formData.request_type === ''}
                  value=''
                >
                  Select
                </option>
                <option value='E'>Employment only</option>
                <option value='I'>Employment and income</option>
              </select>
              {errors && errors.request_type !== '' && (
                <label className='errorMessage' htmlFor='requestTypeError'>
                  {errors.request_type}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='verificationReason'>
                Verification reason <span className='required'>*</span>
              </label>
              <select
                name='verification_reason'
                onChange={handleFormChange}
                className={`${
                  formData.verification_reason === '' ? 'grayColor' : ''
                } ${
                  errors && errors.verification_reason !== '' ? 'error' : ''
                }`}
              >
                <option
                  disabled
                  selected={formData.verification_reason === ''}
                  value=''
                >
                  Select
                </option>
                <option value='1'>Credit application</option>
                <option value='2'>Credit - Re-verification</option>
                <option value='3'>Pre-employment screening</option>
                <option value='4'>Background Check - Property rental</option>
                <option value='5'>Background Check - Visa application</option>
                <option value='6'>
                  Background check - Insurance application
                </option>
                <option value='7'>Other</option>
              </select>
              {errors && errors.verification_reason !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='verificationReasonError'
                >
                  {errors.verification_reason}
                </label>
              )}
            </div>
          </div>
          {formData.request_type === 'I' ? (
            <div className='rowWise'>
              <div className='columnWise'>
                <label htmlFor='salarayRange'>
                  Salary range{' '}
                  {formData.request_type === 'I' && (
                    <span className='required'>*</span>
                  )}
                </label>
                <select
                  name='salary_range'
                  onChange={handleFormChange}
                  className={`${
                    formData.salary_range === '' ? 'grayColor' : ''
                  } ${errors && errors.salary_range !== '' ? 'error' : ''}`}
                >
                  <option
                    disabled
                    selected={formData.salary_range === ''}
                    value=''
                  >
                    Select
                  </option>
                  <option value='1'>1 month</option>
                  <option value='2'>3 months</option>
                  <option value='3'>6 months</option>
                  <option value='4'>12 months</option>
                </select>
                {errors && errors.salary_range !== '' && (
                  <label className='errorMessage' htmlFor='salaryRangeError'>
                    {errors.salary_range}
                  </label>
                )}
              </div>
              <div className='columnWise'>
                <label htmlFor='internalReference'>Internal reference</label>
                <input
                  placeholder='Reference'
                  type='text'
                  name='internal_reference'
                  value={formData.internal_reference}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          ) : (
            <div className='columnWise'>
              <label htmlFor='internalReference'>Internal reference</label>
              <input
                placeholder='Reference'
                type='text'
                name='internal_reference'
                value={formData.internal_reference}
                onChange={handleFormChange}
              />
            </div>
          )}

          {formData.verification_reason === '3' && (
            <div className='columnWise'>
              <label htmlFor='verifyingEmployer'>
                Verifying employer{' '}
                {formData.verification_reason === '3' && (
                  <span className='required'>*</span>
                )}
              </label>
              <input
                placeholder='Verifying employer'
                type='text'
                name='verifying_employer'
                value={formData.verifying_employer}
                onChange={handleFormChange}
                className={
                  errors &&
                  errors.verifying_employer &&
                  errors.verifying_employer !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.verifying_employer !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='verifyingEmployerError'
                >
                  {errors.verifying_employer}
                </label>
              )}
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <div className='buttonDiv'>
              <button type='submit' className='submitButton activeButton'>
                Submit
              </button>
              <button
                className='submitButton nonActiveButton'
                onClick={props.closeModal}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
      {openPopup && (
        <SubmitVerificationPopup
          closePopup={handleClosePopup}
          verification_id={verificationId}
        />
      )}
    </div>
  );
};

export default NewVerificationRequest;
