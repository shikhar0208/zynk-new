import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resetPass } from '../redux/actions/api';
import { validator } from '../utils/helperFunctions';
import Loader from '../utils/Loader';

import '../Styles/ForgotPasswordPage.css';

const initialData = {
  newPassword: '',
  confirmPassword: '',
};

const ResetPasswordPage = (props) => {
  const history = useHistory();
  const { token } = props.match.params;
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const requiredFields = ['newPassword', 'confirmPassword'];

    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      if (formData.newPassword === formData.confirmPassword) {
        await resetPass({
          password: formData.newPassword,
          token,
        })
          .then((res) => {
            alert('Password changed successfull!');
            setIsLoading(false);
            setFormData(initialData);
            history.push('/');
          })
          .catch((error) => {
            alert(error.response.data.message);
            setIsLoading(false);
          });
      } else {
        setErrors({
          ...errors,
          newPassword: '',
          confirmPassword: "Passwords don't match",
        });
        setIsLoading(false);
      }
    } else {
      setErrors(flag);
      setIsLoading(false);
    }
  };

  return (
    <div className='forgot-form-container'>
      <div className='forgot-page-title'>
        <h3>Reset Password</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='columnWise'>
          <input
            placeholder='New password'
            type='text'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
            className={errors && errors.newPassword !== '' ? 'error' : ''}
          />
        </div>
        {errors && errors.newPassword !== '' && (
          <label className='errorMessage' htmlFor='passwordError'>
            {errors.newPassword}
          </label>
        )}
        <div className='columnWise'>
          <input
            placeholder='confirm password'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors && errors.confirmPassword !== '' ? 'error' : ''}
          />
        </div>
        {errors && errors.confirmPassword !== '' && (
          <label className='errorMessage' htmlFor='passwordError'>
            {errors.confirmPassword}
          </label>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <button type='submit' className='send-link-button'>
            Change password
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
