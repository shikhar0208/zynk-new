import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../../utils/helperFunctions';

import '../../Styles/AdminLogin.css';

const initialData = {
  email: '',
  password: '',
};

const AdminLogin = () => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['email', 'password'];
    const flag = validator(formData, requiredFields);
    if (flag === true) {
      setErrors(null);
      history.push('/admin-dashboard');
    } else {
      setErrors(flag);
    }
    // console.log(formData);
  };

  return (
    <div className='admin-login-wrapper'>
      <div className='admin-login-container'>
        <div className='admin-login-header'>
          <h1>Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className='admin-login-form'>
          <div className='columnWise'>
            <label htmlFor='email'>
              Email <span className='required'>*</span>
            </label>
            <input
              placeholder='Email'
              type='text'
              name='email'
              value={formData.email}
              onChange={handleFormChange}
              className={errors && errors.email !== '' ? 'error' : ''}
            />
            {errors && errors.email !== '' && (
              <label className='errorMessage' htmlFor='emailError'>
                {errors.email}
              </label>
            )}
          </div>
          <div className='columnWise'>
            <label htmlFor='password'>
              Password <span className='required'>*</span>
            </label>
            <input
              placeholder='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleFormChange}
              className={errors && errors.password !== '' ? 'error' : ''}
            />
            {errors && errors.password !== '' && (
              <label className='errorMessage' htmlFor='passwordError'>
                {errors.password}
              </label>
            )}
          </div>
          <p className='forget-password'> Forgot password?</p>
          <div className='admin-login-submit'>
            <button type='submit'>Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
