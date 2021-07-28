import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { validator } from '../utils/helperFunctions';

import '../Styles/VerifierRegistrationForm.css';

const initialData = {
  entityType: '',
  verifierName: '',
  businessContactName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  pincode: '',
  country: '',
  state: '',
  city: '',
  password: '',
  confirmPassword: '',
};

const VerifierRegistrationForm = () => {
  const history = useHistory();

  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [states, setStates] = useState('');
  const [cities, setCities] = useState('');

  const countries = Country.getAllCountries();

  var requiredFields = [
    'entityType',
    'verifierName',
    'email',
    'phoneNumber',
    'addressLine1',
    'pincode',
    'country',
    'state',
    'city',
    'password',
    'confirmPassword',
  ];

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleChangeCountry = (e) => {
    setFormData({
      ...formData,
      country: e.target.value,
    });
    if (errors) {
      setErrors({ ...errors, country: '' });
    }
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
  };

  const handleChangeState = (e) => {
    setFormData({
      ...formData,
      state: e.target.value,
    });
    if (errors) {
      setErrors({ ...errors, state: '' });
    }
    const allCities = City.getCitiesOfState(formData.country, e.target.value);
    setCities(allCities);
  };

  const handleSwitch = () => {
    history.push('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.entityType === 'B') {
      requiredFields = [...requiredFields, 'businessContactName'];
    }

    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      if (formData.password === formData.confirmPassword) {
        alert('success');
      } else {
        setErrors({
          ...errors,
          password: '',
          confirmPassword: "Passwords don't match",
        });
      }
    } else {
      setErrors(flag);
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <div className='header'>
          <h1 style={{ marginBottom: '1rem' }}>Verifier Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='verifierName'>
                Verifier Name <span className='required'>*</span>
              </label>
              <input
                placeholder='Verifier Name'
                type='text'
                name='verifierName'
                value={formData.verifierName}
                onChange={handleFormChange}
                className={errors && errors.verifierName !== '' ? 'error' : ''}
              />
              {errors && errors.verifierName !== '' && (
                <label className='errorMessage' htmlFor='verifierNameError'>
                  {errors.verifierName}
                </label>
              )}
            </div>
            <div className='custom-select columnWise'>
              <label htmlFor='entityType'>
                Entity Type <span className='required'>*</span>
              </label>
              <select
                name='entityType'
                id='selectMenu'
                onChange={handleFormChange}
                className={errors && errors.entityType !== '' ? 'error' : ''}
              >
                <option disabled selected>
                  Select
                </option>
                <option value='B'>Business</option>
                <option value='I'>Individual</option>
              </select>
              {errors && errors.entityType !== '' && (
                <label className='errorMessage' htmlFor='entityTypeError'>
                  {errors.entityType}
                </label>
              )}
            </div>
          </div>
          {formData.entityType === 'B' && (
            <div className='columnWise'>
              <label htmlFor='businessContactName'>
                Business Contact Name <span className='required'>*</span>
              </label>
              <input
                placeholder='Business Contact Name'
                type='text'
                name='businessContactName'
                value={formData.businessContactName}
                onChange={handleFormChange}
                className={
                  errors && errors.businessContactName !== '' ? 'error' : ''
                }
              />
              {errors && errors.businessContactName !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='businessContactNameError'
                >
                  {errors.businessContactName}
                </label>
              )}
            </div>
          )}
          <div className='rowWise'>
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
              <label htmlFor='phoneNumber'>
                Phone Number <span className='required'>*</span>
              </label>
              <input
                placeholder='Phone Number'
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleFormChange}
                className={errors && errors.phoneNumber !== '' ? 'error' : ''}
              />
              {errors && errors.phoneNumber !== '' && (
                <label className='errorMessage' htmlFor='phoneNumberError'>
                  {errors.phoneNumber}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='addressLine1'>
                Address - Line 1 <span className='required'>*</span>
              </label>
              <input
                placeholder='Address'
                type='texr'
                name='addressLine1'
                value={formData.addressLine1}
                onChange={handleFormChange}
                className={errors && errors.addressLine1 !== '' ? 'error' : ''}
              />
              {errors && errors.addressLine1 !== '' && (
                <label className='errorMessage' htmlFor='addressLine1Error'>
                  {errors.addressLine1}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='addressLine2'>Address - Line 2</label>
              <input
                placeholder='Address'
                type='text'
                name='addressLine2'
                value={formData.addressLine2}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='country'>
                Country <span className='required'>*</span>
              </label>
              <select
                name='country'
                onChange={handleChangeCountry}
                className={errors && errors.country !== '' ? 'error' : ''}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {countries.map((country) => (
                  <option
                    id='options'
                    key={country.isoCode}
                    value={`${country.isoCode}`}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
              {errors && errors.country !== '' && (
                <label className='errorMessage' htmlFor='countryError'>
                  {errors.country}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='state'>
                State <span className='required'>*</span>
              </label>
              <select
                name='state'
                onChange={handleChangeState}
                disabled={!formData.country}
                className={errors && errors.state !== '' ? 'error' : ''}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {formData.country !== '' &&
                  states.map((state) => (
                    <option key={state.isoCode} value={`${state.isoCode}`}>
                      {state.name}
                    </option>
                  ))}
              </select>
              {errors && errors.state !== '' && (
                <label className='errorMessage' htmlFor='stateError'>
                  {errors.state}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='city'>
                City <span className='required'>*</span>
              </label>
              <select
                name='city'
                onChange={handleFormChange}
                disabled={!formData.state}
                className={errors && errors.city !== '' ? 'error' : ''}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {formData.state !== '' &&
                  cities.map((city) => (
                    <option key={city.name} value={`${city.name}`}>
                      {city.name}
                    </option>
                  ))}
              </select>
              {errors && errors.city !== '' && (
                <label className='errorMessage' htmlFor='cityError'>
                  {errors.city}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='pincode'>
                Pin Code <span className='required'>*</span>
              </label>
              <input
                placeholder='Pin Code'
                type='text'
                name='pincode'
                value={formData.pincode}
                onChange={handleFormChange}
                className={errors && errors.pincode !== '' ? 'error' : ''}
              />
              {errors && errors.pincode !== '' && (
                <label className='errorMessage' htmlFor='pincodeError'>
                  {errors.pincode}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
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
            <div className='columnWise'>
              <label htmlFor='confirmPassword'>
                Confirm Password <span className='required'>*</span>
              </label>
              <input
                placeholder='Confirm Password'
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleFormChange}
                className={
                  errors && errors.confirmPassword !== '' ? 'error' : ''
                }
              />
              {errors && errors.confirmPassword !== '' && (
                <label className='errorMessage' htmlFor='confirmPasswordError'>
                  {errors.confirmPassword}
                </label>
              )}
            </div>
          </div>
          <div className='createAccount'>
            <button type='submit'>Register</button>
            <small>
              Already Have an Account?{' '}
              <span className='switch-form' onClick={handleSwitch}>
                Log in
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifierRegistrationForm;
