import React, { useState } from 'react';
import { validator } from '../utils/helperFunctions';
import '../Styles/NewVerificationRequest.css';

const initialData = {
  employerName: '',
  employeeName: '',
  aadhaarNumber: '',
  panNumber: '',
  email: '',
  phoneNumber: '',
  internalReference: '',
  requestType: '',
  salaryRange: '',
  verificationReason: '',
  newEmployerName: '',
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
      requiredFields = [
        ...requiredFields,
        'newEmployerName',
        'verifyingEmployer',
      ];
    }

    const flag = validator(formData, requiredFields);
    if (flag === true) {
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
          <h1 style={{ marginBottom: '1rem' }}>New Verification Request</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='employerName'>
                Employer Name <span className='required'>*</span>
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
                Employee Full Name <span className='required'>*</span>
              </label>
              <input
                placeholder='Employee Name'
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
              <label htmlFor='aadhaarNumber'>Aadhaar Number</label>
              <input
                placeholder='Aadhaar Number'
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
              <label htmlFor='panNumber'>PAN Number</label>
              <input
                placeholder='PAN Number'
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
              <label htmlFor='email'>Employee Email Id</label>
              <input
                placeholder='Email'
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
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input
                placeholder='Phone Number'
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
                Request Type <span className='required'>*</span>
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
                <option value='E'>Employment Only</option>
                <option value='I'>Employment and Income</option>
              </select>
              {errors && errors.requestType !== '' && (
                <label className='errorMessage' htmlFor='requestTypeError'>
                  {errors.requestType}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='verificationReason'>
                Verification Reason <span className='required'>*</span>
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
                  Background Check - Insurance application
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
                Salary Range{' '}
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
              <label htmlFor='internalReference'>Internal Reference</label>
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
              <label htmlFor='newEmployerName'>
                New Employer Name <span className='required'>*</span>
              </label>
              <input
                placeholder='Employer Name'
                type='text'
                name='newEmployerName'
                value={formData.newEmployerName}
                onChange={handleFormChange}
                className={
                  errors &&
                  errors.newEmployerName &&
                  errors.newEmployerName !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.newEmployerName !== '' && (
                <label className='errorMessage' htmlFor='newEmployerNameError'>
                  {errors.newEmployerName}
                </label>
              )}
            </div>
          )}
          <div className='columnWise'>
            <label htmlFor='verifyingEmployer'>
              Verifying Employer{' '}
              {formData.verificationReason === '3' && (
                <span className='required'>*</span>
              )}
            </label>
            <input
              placeholder='Verifying Employer'
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
              <label className='errorMessage' htmlFor='verifyingEmployerError'>
                {errors.verifyingEmployer}
              </label>
            )}
          </div>
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
