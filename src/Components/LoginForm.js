import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import { validator } from '../utils/helperFunctions';
import axios from "axios";

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
   
  const [state, setstate] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['email', 'password'];
    const flag = validator(formData, requiredFields);

  
    if (flag === true) {
          
      axios.post('/' + {userType}+'-login', {
        "email_id": formData.email,
        "password": formData.password
      })
        .then((response) => {
          setstate(response.data.verifier_zynk_id);
        }, (error) => {
          console.log(error);
        });

      setErrors(null);
      if (userType === 'verifier') {
        props.history.push({
          pathname: '/verifier_dashboard',
          state
        });
      } else if (userType === 'employer') {
        props.history.push({
          pathname: "/employer_dashboard",
          state
        });
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

}
export default LoginForm;
