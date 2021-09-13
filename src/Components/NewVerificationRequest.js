import React, { useState, useEffect } from 'react';
import { validator } from '../utils/helperFunctions';
import { getAllEmployer } from '../redux/actions/api';
import '../Styles/NewVerificationRequest.css';
import axios from 'axios';
const initialData = {
  employerName: '',
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
};

const NewVerificationRequest = (props) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);
  const [boolVal, setBoolVal] = useState(false);

  useEffect(async () => {
    if (!boolVal) {
      const allEmployers = await getAllEmployer();
      console.log(allEmployers);
    }
  }, []);

  var requiredFields = [
    'employerName',
    'employee_full_name',
    'request_type',
    'verification_reason',
  ];

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

    const flag = validator(formData, requiredFields);
    if (flag === true) {
      var employer_id = null;
      axios.post('./all-employers', {}).then(
        (response) => {
          /* gots to map through the response. */
          response.data.map((element) => {
            if (element.business_email_id === formData.business_email_id) {
              employer_id = element.employer_zynk_id;
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );

      axios
        .post('./submit-new-verification', {
          'verifier-zynk-id': props.verifier_zynk_id,
          employer_zynk_id: employer_id,
          employee_full_name: formData.employeeName,
          employee_id: formData.employeeID,
          aadhar_number: formData.aadhaarNumber,
          pan_number: formData.panNumber,
          employee_email_id: formData.email,
          employee_phone: formData.phoneNumber,
          internal_reference: formData.internalReference,
          request_type: formData.requestType,
          salary_range: formData.salaryRange,
          verification_reason: formData.verificationReason,
        })
        .then(
          (response) => {
            /* i get the verification request ID */
            console.log('success');
          },
          (err) => {
            console.log(err);
          }
        );
      setErrors(null);
      alert('Request Submitted');
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
                name='employerName'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${
                  formData.employerName === '' ? 'grayColor' : ''
                } ${errors && errors.employerName !== '' ? 'error' : ''}`}
              >
                <option disabled selected>
                  Select
                </option>
                <option value='employer1'>Employer 1</option>
                <option value='employer2'>Employer 2</option>
              </select>
              {errors && errors.employerName !== '' && (
                <label className='errorMessage' htmlFor='employerNameError'>
                  {errors.employerName}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='employeeName'>
                Employee full name <span className='required'>*</span>
              </label>
              <input
                placeholder='Employee name'
                type='text'
                name='employee_full_name'
                value={formData.employee_full_name}
                onChange={handleFormChange}
                className={
                  errors && errors.employee_full_name !== '' ? 'error' : ''
                }
              />
              {errors && errors.employee_full_name !== '' && (
                <label className='errorMessage' htmlFor='employeeNameError'>
                  {errors.employee_full_name}
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
          </div>
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
                <option value='3'>3 months</option>
                <option value='6'>6 months</option>
                <option value='Y'>12 months</option>
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
