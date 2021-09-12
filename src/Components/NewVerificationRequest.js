import React, { useState } from 'react';
import { validator } from '../utils/helperFunctions';
import '../Styles/NewVerificationRequest.css';
import axios from 'axios'
const initialData = {
  employerName: '',
  employeeName: '',
  employeeID:'',
  aadhaarNumber: '',
  panNumber: '',
  email: '',
  phoneNumber: '',
  internalReference: '',
  requestType: '',
  salaryRange: '',
  verificationReason: '',
  verifyingEmployer: '',

};

const NewVerificationRequest = (props) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);

  var requiredFields = [
    'employerName',
    'employeeName',
    'requestType',
    'verificationReason',
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
      requiredFields = [...requiredFields, 'salaryRange'];
    }
    if (formData.verificationReason === '3') {
      requiredFields = [...requiredFields, 'verifyingEmployer'];
    }
    
    const flag = validator(formData, requiredFields);
    if (flag === true) {
      
      var employer_id = null;
      axios.post('./all-employers', {})
        .then((response) => {
           
          /* gots to map through the response. */
          response.data.map(element => {
            if (element.business_email_id === formData.business_email_id ) {
              employer_id = element.employer_zynk_id;
            }
          });
        }, (errors) => {
          console.log(errors);
        });

      axios.post('./submit-new-verification', {
        "verifier-zynk-id": props.verifier_zynk_id,
        "employer_zynk_id": employer_id,
        "employee_full_name": formData.employeeName,
        "employee_id": formData.employeeID,
        "aadhar_number": formData.aadhaarNumber,
        "pan_number": formData.panNumber,
        "employee_email_id": formData.email,
        "employee_phone": formData.phoneNumber,
        "internal_reference": formData.internalReference,
        "request_type": formData.requestType,
        "salary_range": formData.salaryRange,
        "verification_reason": formData.verificationReason
      })
        .then((response) => {
          /* i get the verification request ID */
          console.log('success');
        }, (errors) => {
          console.log(errors);
        });
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
                name='employeeName'
                value={formData.employeeName}
                onChange={handleFormChange}
                className={errors && errors.employeeName !== '' ? 'error' : ''}
              />
              {errors && errors.employeeName !== '' && (
                <label className='errorMessage' htmlFor='employeeNameError'>
                  {errors.employeeName}
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
                name='aadhaarNumber'
                value={formData.aadhaarNumber}
                onChange={handleFormChange}
                className={
                  errors && errors.aadhaarNumber && errors.aadhaarNumber !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.aadhaarNumber !== '' && (
                <label className='errorMessage' htmlFor='aadhaarNumberError'>
                  {errors.aadhaarNumber}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='panNumber'>PAN number</label>
              <input
                placeholder='PAN number'
                type='text'
                name='panNumber'
                value={formData.panNumber}
                onChange={handleFormChange}
                className={
                  errors && errors.panNumber && errors.panNumber !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.panNumber !== '' && (
                <label className='errorMessage' htmlFor='panNumberError'>
                  {errors.panNumber}
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
                name='email'
                value={formData.email}
                onChange={handleFormChange}
                className={
                  errors && errors.email && errors.email !== '' ? 'error' : ''
                }
              />
              {errors && errors.email !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.email}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='phoneNumber'>Phone number</label>
              <input
                placeholder='Phone number'
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
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
                name='requestType'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${formData.requestType === '' ? 'grayColor' : ''} ${
                  errors && errors.requestType !== '' ? 'error' : ''
                }`}
              >
                <option disabled selected>
                  Select
                </option>
                <option value='E'>Employment only</option>
                <option value='I'>Employment and income</option>
              </select>
              {errors && errors.requestType !== '' && (
                <label className='errorMessage' htmlFor='requestTypeError'>
                  {errors.requestType}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='verificationReason'>
                Verification reason <span className='required'>*</span>
              </label>
              <select
                name='verificationReason'
                onChange={handleFormChange}
                className={`${
                  formData.verificationReason === '' ? 'grayColor' : ''
                } ${errors && errors.verificationReason !== '' ? 'error' : ''}`}
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
              {errors && errors.verificationReason !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='verificationReasonError'
                >
                  {errors.verificationReason}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='salarayRange'>
                Salary range{' '}
                {formData.requestType === 'I' && (
                  <span className='required'>*</span>
                )}
              </label>
              <select
                name='salaryRange'
                onChange={handleFormChange}
                className={`${formData.salaryRange === '' ? 'grayColor' : ''} ${
                  errors && errors.salaryRange !== '' ? 'error' : ''
                }`}
              >
                <option disabled selected>
                  Select
                </option>
                <option value='1'>1 month</option>
                <option value='3'>3 months</option>
                <option value='6'>6 months</option>
                <option value='Y'>12 months</option>
              </select>
              {errors && errors.salaryRange !== '' && (
                <label className='errorMessage' htmlFor='salaryRangeError'>
                  {errors.salaryRange}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='internalReference'>Internal reference</label>
              <input
                placeholder='Reference'
                type='text'
                name='internalReference'
                value={formData.internalReference}
                onChange={handleFormChange}
              />
            </div>
          </div>
          {formData.verificationReason === '3' && (
            <div className='columnWise'>
              <label htmlFor='verifyingEmployer'>
                Verifying employer{' '}
                {formData.verificationReason === '3' && (
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
