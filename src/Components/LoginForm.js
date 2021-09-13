import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../utils/helperFunctions';
import { useDispatch } from 'react-redux';

import { verifierLogin } from '../redux/actions/VerfierActions';
import { employerLogin } from '../redux/actions/EmployerActions';

import '../Styles/VerifierRegistrationForm.css';

/* setting a custom schema for the hook. */

const initialData = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  const [formData, setFormData] = useState(initialData);
  const [userType, setUserType] = useState('verifier');
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  /* whenever an attribute inside the form is changed , the js method to update it without code redundancy. */

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSwitch = () => {
    history.push('/verifier-signup');
  };

  const handleChangeLogin = (type) => {
    setUserType(type);
    setErrors(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['email'];
    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      if (userType === 'verifier') {
        const loginData = {
          email_id: formData.email,
          password: formData.password,
        };
        dispatch(verifierLogin(loginData, history));
      } else if (userType === 'employer') {
        // history.push('/employer_dashboard');
        const loginData = {
          business_email_id: formData.email,
          password: formData.password,
        };
        dispatch(employerLogin(loginData, history));
      }
    } else {
      setErrors(flag);
    }
  };
  // console.log(formData);

  return (
    <div className='wrapper'>
      <div className='loginForm-wrapper'>
        <div className='header'>
          <h1>Login</h1>
          <div className='login-switch'>
            <button
              className={
                userType === 'verifier' ? 'activeButton' : 'nonActiveButton'
              }
              onClick={() => handleChangeLogin('verifier')}
            >
              Verifier
            </button>
            <button
              className={
                userType === 'employer' ? 'activeButton' : 'nonActiveButton'
              }
              onClick={() => handleChangeLogin('employer')}
            >
              Employer
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className='createAccount'>
            <button type='submit'>Log in</button>
            {userType === 'verifier' && (
              <small>
                Don't have an account?{' '}
                <span className='switch-form' onClick={handleSwitch}>
                  Sign up
                </span>
              </small>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
