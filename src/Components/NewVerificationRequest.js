import React, { useState } from 'react';
import '../Styles/NewVerificationRequest.css';
const initialData = {
  employerName: '',
  employeeName: '',
  aadhaarNumber: '',
  panNumber: '',
  employeeEmail: '',
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

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
              <input
                placeholder='Employer Name'
                type='text'
                name='employerName'
                value={formData.employerName}
                onChange={handleFormChange}
              />
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
              />
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
              />
            </div>
            <div className='columnWise'>
              <label htmlFor='panNumber'>Pan Number</label>
              <input
                placeholder='Pan Number'
                type='text'
                name='panNumber'
                value={formData.panNumber}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='employeeEmail'>Employee Email Id</label>
              <input
                placeholder='Email'
                type='email'
                name='employeeEmail'
                value={formData.employeeEmail}
                onChange={handleFormChange}
              />
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
            <div className='custom-select columnWise'>
              <label htmlFor='requestType'>
                Request Type <span className='required'>*</span>
              </label>
              <select
                name='requestType'
                id='selectMenu'
                onChange={handleFormChange}
              >
                <option disabled selected>
                  Select
                </option>
                <option value='E'>E</option>
                <option value='I'>I</option>
              </select>
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
                id='selectMenu'
                onChange={handleFormChange}
              >
                <option disabled selected>
                  Select
                </option>
                <option value='mid'>2-3 lacs</option>
                <option value='high'>3-5 lacs</option>
              </select>
            </div>
            <div className='columnWise'>
              <label htmlFor='verificationReason'>
                Verification Reason <span className='required'>*</span>
              </label>
              <select name='verificationReason' onChange={handleFormChange}>
                <option disabled selected className='demo-select'>
                  Select
                </option>
                <option value='P'>Pre-employment screening</option>
                <option value='O'>Others</option>
              </select>
            </div>
          </div>
          {formData.verificationReason === 'P' && (
            <div className='columnWise'>
              <label htmlFor='newEmployerName'>
                New Employer Name <span className='required'>*</span>
              </label>
              <input
                placeholder='Reference'
                type='text'
                name='internalReference'
                value={formData.internalReference}
                onChange={handleFormChange}
              />
            </div>
          )}
          <div className='columnWise'>
            <label htmlFor='verifyingEmployer'>
              Verifying Employer{' '}
              {formData.verificationReason === 'P' && (
                <span className='required'>*</span>
              )}
            </label>
            <input
              placeholder='Verifying Employer'
              type='text'
              name='verifyingEmployer'
              value={formData.verifyingEmployer}
              onChange={handleFormChange}
            />
          </div>
          <div className='buttonDiv'>
            <button type='submit' className='submitButton activeButton'>
              Submit
            </button>
            <button
              className='submitButton nonActiveButton'
              onClick={props.closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVerificationRequest;
