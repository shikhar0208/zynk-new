import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { validator } from '../utils/helperFunctions';
import Loader from '../utils/Loader';

import { forgotPassLink } from '../redux/actions/api';

import '../Styles/ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const location = useLocation();
  const history = useHistory();

  const userType = location?.state?.userType;
  console.log(userType);
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!userType) {
    history.push('/');
  }

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = ['email'];
    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      try {
        await forgotPassLink(userType, formData);
        setIsLoading(false);
        setFormData({ email: '' });
        alert('Email sent successfully');
      } catch (e) {
        alert('Something went wrong');
        setIsLoading(false);
        setFormData({ email: '' });
      }
    } else {
      setIsLoading(false);
      setErrors(flag);
    }
  };

  // console.log(userType);

  return (
    <div className='forgot-form-container'>
      <div className='forgot-page-title'>
        <h3>Forgot Your Password?</h3>
        <p>
          No worries! Enter your registered email and we'll send you a link to
          reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='columnWise'>
          <input
            placeholder='Email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleFormChange}
            className={errors && errors.email !== '' ? 'error' : ''}
          />
        </div>
        {errors && errors.email !== '' && (
          <label className='errorMessage' htmlFor='passwordError'>
            {errors.email}
          </label>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <button type='submit' className='send-link-button'>
            Send link
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
