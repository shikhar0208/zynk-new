import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { validator } from '../utils/helperFunctions';
import {
  getEmployers,
  getVerificationOrder,
  purchaseNewVerification,
} from '../redux/actions/api';

import '../Styles/NewVerificationRequest.css';

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
  const [allEmployers, setAllEmployers] = useState([]);

  const { verifier_zynk_id, entity_type } = useSelector(
    (store) => store.verifierReducer?.verifierData
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEmployers();
      setAllEmployers(data);
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
    // console.log(data);
    const options = {
      key: 'rzp_test_k2yCzup0pdGZjg',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Donation',
      description: 'Thank you for nothing. Please give us some money',
      handler: async function (response) {
        console.log('response of razorPay ', response);
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
        };

        // purchaseNewVerification(datatoserver)
        //   .then((res) => {
        //     setFormData(initialData);
        //     if (res.response.message === 'Mail Sent succesfully') {
        //       alert(res.response.message);
        //       props.closeModal();
        //     }
        //   })
        //   .catch((err) => {
        //     setFormData(initialData);
        //     // console.log('err', err.response);
        //     alert('E');
        //   });
        // console.log(result);
        try {
          const result = await purchaseNewVerification(datatoserver);
          alert(
            `Your request has been received and check mail sent to your registered email.`
          );
          // console.log(result.data);
          props.closeModal();
        } catch (e) {
          alert(
            'Your request has been received and check mail sent to your registered email.'
          );
          setFormData(initialData);
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

    if (entity_type === 'B') {
      requiredFields = [...requiredFields, 'business_contact_name'];
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
                <option disabled selected>
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
          {entity_type === 'B' ? (
            <div className='rowWise'>
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
                  <label
                    className='errorMessage'
                    htmlFor='employeeFullNameError'
                  >
                    {errors.employee_full_name}
                  </label>
                )}
              </div>
              <div className='columnWise'>
                <label htmlFor='businessContactName'>
                  Business contact name
                </label>
                <input
                  placeholder='Business contact name'
                  type='text'
                  name='business_contact_name'
                  value={formData.business_contact_name}
                  onChange={handleFormChange}
                  className={
                    errors &&
                    errors.business_contact_name &&
                    errors.business_contact_name !== ''
                      ? 'error'
                      : ''
                  }
                />
                {errors && errors.business_contact_name !== '' && (
                  <label className='errorMessage' htmlFor='aadhaarNumberError'>
                    {errors.business_contact_name}
                  </label>
                )}
              </div>
            </div>
          ) : (
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
          )}

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
                <option disabled selected>
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
                <option disabled selected className='demo-select'>
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
                  <option disabled selected>
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
                name='verifyingEmployer'
                value={formData.verifyingEmployer}
                onChange={handleFormChange}
                className={
                  errors &&
                  errors.verifyingEmployer &&
                  errors.verifyingEmployer !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.verifyingEmployer !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='verifyingEmployerError'
                >
                  {errors.verifyingEmployer}
                </label>
              )}
            </div>
          )}

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
        </form>
      </div>
    </div>
  );
};

export default NewVerificationRequest;
