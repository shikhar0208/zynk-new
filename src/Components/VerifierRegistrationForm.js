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
  idType: '',
  idNumber: '',
  idAttachment: '',
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
    'idType',
    'idNumber',
    'idAttachment',
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
            <div className='custom-select columnWise'>
              <label htmlFor='entityType'>
                Entity type <span className='required'>*</span>
              </label>
              <select
                name='entityType'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${formData.entityType === '' ? 'grayColor' : ''} ${
                  errors && errors.entityType !== '' ? 'error' : ''
                }`}
              >
                <option disabled value='' selected>
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
            <div className='columnWise'>
              <label htmlFor='verifierName'>
                Verifier name <span className='required'>*</span>
              </label>
              <input
                placeholder='Verifier name'
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
          </div>
          {formData.entityType === 'B' && (
            <div className='columnWise'>
              <label htmlFor='businessContactName'>
                Business contact name <span className='required'>*</span>
              </label>
              <input
                placeholder='Business contact name'
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
                Email id<span className='required'>*</span>
              </label>
              <input
                placeholder='Email id'
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
                Phone number <span className='required'>*</span>
              </label>
              <input
                placeholder='Phone number'
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
                Address - line 1 <span className='required'>*</span>
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
              <label htmlFor='addressLine2'>Address - line 2</label>
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
                className={`${formData.country === '' ? 'grayColor' : ''} ${
                  errors && errors.country !== '' ? 'error' : ''
                }`}
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
                className={`${formData.state === '' ? 'grayColor' : ''} ${
                  errors && errors.state !== '' ? 'error' : ''
                }`}
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
                className={`${formData.city === '' ? 'grayColor' : ''} ${
                  errors && errors.city !== '' ? 'error' : ''
                }`}
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
                Pin code <span className='required'>*</span>
              </label>
              <input
                placeholder='Pin code'
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
              <label htmlFor='idType'>
                Id type <span className='required'>*</span>
              </label>
              <select
                name='idType'
                onChange={handleFormChange}
                className={`${formData.idType === '' ? 'grayColor' : ''} ${
                  errors && errors.idType && errors.idType !== '' ? 'error' : ''
                }`}
              >
                <option disabled value='' selected>
                  Select
                </option>
                <option value='PAN'>PAN</option>
                <option value='GST'>GST</option>
                <option value='Aadhaar'>Aadhaar</option>
              </select>
              {errors && errors.idType !== '' && (
                <label className='errorMessage' htmlFor='idTypeError'>
                  {errors.idType}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='idNumber'>
                {formData.idType === '' ? 'Id' : formData.idType} number{' '}
                <span className='required'>*</span>
              </label>
              <input
                placeholder='Id number'
                type='text'
                name='idNumber'
                value={formData.idNumber}
                onChange={handleFormChange}
                className={
                  errors && errors.idNumber && errors.idNumber !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.idNumber !== '' && (
                <label className='errorMessage' htmlFor='idNumberError'>
                  {errors.idNumber}
                </label>
              )}
            </div>
          </div>
          <div className='columnWise'>
            <label htmlFor='idAttachment'>
              Id attachment file <span className='required'>*</span>
            </label>
            <input
              type='file'
              name='idAttachment'
              value={formData.idAttachment}
              onChange={handleFormChange}
              className={
                errors && errors.idAttachment && errors.idAttachment !== ''
                  ? 'error'
                  : ''
              }
            />
            {errors && errors.idAttachment !== '' && (
              <label className='errorMessage' htmlFor='idAttachmentError'>
                {errors.idAttachment}
              </label>
            )}
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
                Confirm password <span className='required'>*</span>
              </label>
              <input
                placeholder='Confirm password'
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
              Already have an account?{' '}
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
