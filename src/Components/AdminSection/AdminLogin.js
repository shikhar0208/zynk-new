import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../../utils/helperFunctions';
import { useDispatch } from 'react-redux';

import { adminLogin } from '../../redux/actions/AdminActions';
import '../../Styles/AdminLogin.css';

const initialData = {
  email_id: '',
  password: '',
};

const AdminLogin = () => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['email_id'];
    const flag = validator(formData, requiredFields);
    if (flag === true) {
      setErrors(null);
      dispatch(adminLogin(formData, history));
    } else {
      setErrors(flag);
    }
    // console.log(formData);
  };

  return (
    <div className='admin-login-wrapper'>
      <div className='admin-login-container'>
        <div className='admin-login-header'>
          <h1>Admin login</h1>
        </div>
        <form onSubmit={handleSubmit} className='admin-login-form'>
          <div className='columnWise'>
            <label htmlFor='email'>
              Email <span className='required'>*</span>
            </label>
            <input
              placeholder='Email'
              type='text'
              name='email_id'
              value={formData.email_id}
              onChange={handleFormChange}
              className={errors && errors.email_id !== '' ? 'error' : ''}
            />
            {errors && errors.email_id !== '' && (
              <label className='errorMessage' htmlFor='emailError'>
                {errors.email_id}
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
