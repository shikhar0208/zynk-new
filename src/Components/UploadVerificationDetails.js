import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../utils/helperFunctions';
import '../Styles/UploadVerificationDetails.css';

const initialData = {
  dataType: '',
  extractDate: '',
  attachmentFile: '',
};

const UploadVerificationDetails = () => {
  const history = useHistory();

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);

  var requiredFields = ['dataType', 'extractDate', 'attachmentFile'];

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const flag = validator(formData, requiredFields);
    if (flag === true) {
      setErrors(null);
      alert('Request Submitted');
    } else {
      setErrors(flag);
    }
  };

  const handleCloseButton = () => {
    history.push('/employer-dashboard');
  };

  return (
    <div className='parentContainer'>
      <div className='contentDiv'>
        <div className='upload-detail-header'>
          <h1 style={{ marginBottom: '1rem' }}>Upload Verification Details</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='custom-select columnWise'>
            <label htmlFor='dataType'>
              Data type <span className='required'>*</span>
            </label>
            <select
              name='dataType'
              onChange={handleFormChange}
              className={`${formData.dataType === '' ? 'grayColor' : ''} ${
                errors && errors.dataType !== '' ? 'error' : ''
              }`}
            >
              <option disabled selected>
                Select
              </option>
              <option value='E'>Employee Master</option>
              <option value='P'>Payroll</option>
              <option value='C'>Custom Format</option>
            </select>
            {errors && errors.dataType !== '' && (
              <label className='errorMessage' htmlFor='dataTypeError'>
                {errors.dataType}
              </label>
            )}
          </div>
          <div className='columnWise'>
            <label htmlFor='extractDate'>
              Extract date <span className='required'>*</span>
            </label>
            <input
              type='date'
              name='extractDate'
              value={formData.extractDate}
              onChange={handleFormChange}
              className={errors && errors.extractDate !== '' ? 'error' : ''}
            />
            {errors && errors.extractDate !== '' && (
              <label className='errorMessage' htmlFor='extractDateError'>
                {errors.extractDate}
              </label>
            )}
          </div>
          <div className='columnWise'>
            <label htmlFor='attachmentFile'>
              Attach file <span className='required'>*</span>
            </label>
            <input
              type='file'
              name='attachmentFile'
              value={formData.attachmentFile}
              onChange={handleFormChange}
              className={errors && errors.attachmentFile !== '' ? 'error' : ''}
            />
            {errors && errors.attachmentFile !== '' && (
              <label className='errorMessage' htmlFor='attachmentFileError'>
                {errors.attachmentFile}
              </label>
            )}
          </div>
          <div className='buttonDiv'>
            <button type='submit' className='buttonStyle submit'>
              Submit
            </button>
            <button className='buttonStyle close' onClick={handleCloseButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVerificationDetails;
