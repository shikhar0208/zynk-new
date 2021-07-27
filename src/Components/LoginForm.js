import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/VerifierRegistrationForm.css';

const initialData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initialData);
  const [userType, setUserType] = useState('verifier');
  const history = useHistory();

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSwitch = () => {
    history.push('/verifier-signup');
  };

  const handleChangeLogin = (type) => {
    setUserType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='wrapper'>
      <div className='loginForm-wrapper'>
        <div className='header'>
          <h1>Welcome</h1>
          <div className='login-switch'>
            <button
              className={
                userType === 'verifier' ? 'activeButton' : 'nonActiveButton'
              }
              onClick={() => handleChangeLogin('verifier')}
            >
              Verifier Login
            </button>
            <button
              className={
                userType === 'employer' ? 'activeButton' : 'nonActiveButton'
              }
              onClick={() => handleChangeLogin('employer')}
            >
              Employer Login
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
          <p className='forget-password'> Forget password?</p>
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
