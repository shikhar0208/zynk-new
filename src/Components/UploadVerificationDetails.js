import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../utils/Loader';

import { uploadVerificationDetails } from '../redux/actions/api';
import { validator } from '../utils/helperFunctions';
import '../Styles/UploadVerificationDetails.css';

const initialData = {
  extract_type: '',
  employer_extract_date: '',
  attachmentFile: '',
};

const UploadVerificationDetails = (props) => {
  var fileData = new FormData();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { employer_zynk_id } = useSelector(
    (store) => store.employerReducer?.employerData
  );

  var requiredFields = [
    'extract_type',
    'employer_extract_date',
    'attachmentFile',
  ];

  const handleFormChange = (e) => {
    const { name } = e.target;
    fileData.append([name], e.target.value);
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleUploadFile = (e) => {
    const { name } = e.target;
    let file = e.target.files[0];
    setFormData({ ...formData, [name]: e.target.value });
    setData(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const flag = validator(formData, requiredFields);
    if (flag === true) {
      setErrors(null);
      fileData.append('status', '1');
      fileData.append('submission_type', 'N');
      fileData.append('employer_zynk_id', employer_zynk_id);
      fileData.append('extract_type', formData.extract_type);
      fileData.append('excel', data);
      fileData.append(
        'employer_extract_date',
        new Date(formData.employer_extract_date)
      );
      fileData.append('timeStamp', new Date());
      await uploadVerificationDetails(fileData, formData.extract_type)
        .then((res) => {
          setIsLoading(false);
          setFormData(initialData);
          alert('Detail uploaded successfully');
        })
        .catch((err) => {
          setIsLoading(false);
          setFormData(initialData);
          console.log(err.response.data);
          alert(
            'Something went wrong, please ensure that the structure of file is correct.'
          );
        });
    } else {
      setErrors(flag);
      setIsLoading(false);
    }
  };

  const handleCloseButton = () => {
    history.push('/employer-dashboard');
  };

  return (
    <div className='parentContainer'>
      <div className='contentDiv'>
        <div className='upload-detail-header'>
          <h1 style={{ marginBottom: '1rem' }}>Upload verification details</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='custom-select columnWise'>
            <label htmlFor='dataType'>
              Data type <span className='required'>*</span>
            </label>
            <select
              name='extract_type'
              onChange={handleFormChange}
              className={`${formData.extract_type === '' ? 'grayColor' : ''} ${
                errors && errors.extract_type !== '' ? 'error' : ''
              }`}
            >
              <option disabled selected={formData.extract_type === ''} value=''>
                Select
              </option>
              <option value='E'>Employee Master</option>
              <option value='P'>Payroll</option>
              <option value='C'>Custom Format</option>
            </select>
            {errors && errors.extract_type !== '' && (
              <label className='errorMessage' htmlFor='dataTypeError'>
                {errors.extract_type}
              </label>
            )}
          </div>
          <div className='columnWise'>
            <label htmlFor='extractDate'>
              Extract date <span className='required'>*</span>
            </label>
            <input
              type='date'
              name='employer_extract_date'
              value={formData.employer_extract_date}
              onChange={handleFormChange}
              className={
                errors && errors.employer_extract_date !== '' ? 'error' : ''
              }
            />
            {errors && errors.employer_extract_date !== '' && (
              <label className='errorMessage' htmlFor='extractDateError'>
                {errors.employer_extract_date}
              </label>
            )}
          </div>
          <div className='columnWise'>
            <label htmlFor='attachmentFile'>
              Attach file <span className='required'>*</span>
            </label>
            <input
              type='file'
              accept='.xlsx, .xls, .csv'
              name='attachmentFile'
              value={formData.attachmentFile}
              onChange={handleUploadFile}
              className={errors && errors.attachmentFile !== '' ? 'error' : ''}
            />
            {errors && errors.attachmentFile !== '' && (
              <label className='errorMessage' htmlFor='attachmentFileError'>
                {errors.attachmentFile}
              </label>
            )}
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='buttonDiv'>
              <button type='submit' className='buttonStyle submit'>
                Submit
              </button>
              <button className='buttonStyle close' onClick={handleCloseButton}>
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadVerificationDetails;
