import React, { useState } from 'react';
import '../Styles/VerifierRegistrationForm.css';

const initialData = {
  email: '',
  password: '',
};

const EmployerLoginForm = () => {
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
    <div className='wrapper'>
      <div className='loginForm-wrapper'>
        <h1>Employer Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className='columnWise'>
            <label htmlFor='email'>
              Email <span className='required'>*</span>
            </label>
            <input
              placeholder='Email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleFormChange}
            />
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
            />
          </div>
          <div className='createAccount'>
            <button type='submit'>Log in</button>
            <small>
              Don't have an account?{' '}
              <span className='switch-form'>Sign up</span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerLoginForm;
