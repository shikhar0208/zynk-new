import React, { useState } from 'react';
import { validator } from '../../utils/helperFunctions';
import { Country, State, City } from 'country-state-city';
import '../../Styles/AdminSection/NewEmployerForm.css';

const initialData = {
  activationDate: '',
  endDate: '',
  autoRenew: '',
  businessName: '',
  businessContactName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  pincode: '',
  state: '',
  city: '',
  country: '',
  gstNumber: '',
  newPassword: '',
  confirmPassword: '',
};

const NewEmployerForm = (props) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);
  const [states, setStates] = useState('');
  const [cities, setCities] = useState('');

  const countries = Country.getAllCountries();

  var requiredFields = [
    'activationDate',
    'endDate',
    'autoRenew',
    'businessName',
    'businessContactName',
    'email',
    'phoneNumber',
    'addressLine1',
    'pincode',
    'country',
    'gstNumber',
    'newPassword',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (states.length > 0) {
      requiredFields = [...requiredFields, 'state'];
    }

    if (cities.length > 0) {
      requiredFields = [...requiredFields, 'city'];
    }

    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      if (formData.newPassword === formData.confirmPassword) {
        alert('success');
      } else {
        setErrors({
          ...errors,
          newPassword: '',
          confirmPassword: "Passwords don't match",
        });
      }
    } else {
      setErrors(flag);
    }
  };

  return (
    <div className='modalContainer'>
      <div className='modalContent'>
        <div className='header rowWise'>
          <h1 style={{ marginBottom: '1rem' }}>Add new employer</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='employerActivationDate'>
                Activation date <span className='required'>*</span>
              </label>
              <input
                type='date'
                name='activationDate'
                value={formData.activationDate}
                onChange={handleFormChange}
                className={
                  errors && errors.activationDate !== '' ? 'error' : ''
                }
              />
              {errors && errors.activationDate !== '' && (
                <label className='errorMessage' htmlFor='activationDateError'>
                  {errors.activationDate}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='subscriptionEndDate'>
                Subscription end date <span className='required'>*</span>
              </label>
              <input
                type='date'
                name='endDate'
                value={formData.endDate}
                onChange={handleFormChange}
                className={errors && errors.endDate !== '' ? 'error' : ''}
              />
              {errors && errors.endDate !== '' && (
                <label className='errorMessage' htmlFor='endDateError'>
                  {errors.endDate}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='autoRenew'>
                Auto - renew <span className='required'>*</span>
              </label>
              <select
                name='autoRenew'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${formData.autoRenew === '' ? 'grayColor' : ''} ${
                  errors && errors.autoRenew !== '' ? 'error' : ''
                }`}
              >
                <option disabled selected>
                  Select
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              {errors && errors.autoRenew !== '' && (
                <label className='errorMessage' htmlFor='autoRenewError'>
                  {errors.autoRenew}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='businessName'>
                Business name <span className='required'>*</span>
              </label>
              <input
                placeholder='Business name'
                type='text'
                name='businessName'
                value={formData.businessName}
                onChange={handleFormChange}
                className={
                  errors && errors.businessName && errors.businessName !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.businessName !== '' && (
                <label className='errorMessage' htmlFor='businessNameError'>
                  {errors.businessName}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
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
                  errors &&
                  errors.businessContactName &&
                  errors.businessContactName !== ''
                    ? 'error'
                    : ''
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
            <div className='columnWise'>
              <label htmlFor='email'>
                Email id <span className='required'>*</span>
              </label>
              <input
                placeholder='Email id'
                type='text'
                name='email'
                value={formData.email}
                className={
                  errors && errors.email && errors.email !== '' ? 'error' : ''
                }
                onChange={handleFormChange}
              />
              {errors && errors.email !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.email}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='phoneNumber'>
                Phone number <span className='required'>*</span>
              </label>
              <input
                placeholder='Phone number'
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                className={
                  errors && errors.phoneNumber && errors.phoneNumber !== ''
                    ? 'error'
                    : ''
                }
                onChange={handleFormChange}
              />
              {errors && errors.phoneNumber !== '' && (
                <label className='errorMessage' htmlFor='phoneNumberError'>
                  {errors.phoneNumber}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='gstNumber'>
                GST number <span className='required'>*</span>
              </label>
              <input
                placeholder='GST number'
                type='text'
                name='gstNumber'
                value={formData.gstNumber}
                className={
                  errors && errors.gstNumber && errors.gstNumber !== ''
                    ? 'error'
                    : ''
                }
                onChange={handleFormChange}
              />
              {errors && errors.gstNumber !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='verificationReasonError'
                >
                  {errors.gstNumber}
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
                  errors && errors.state && errors.state !== '' ? 'error' : ''
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
                  errors && errors.city && errors.city !== '' ? 'error' : ''
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
              <label htmlFor='password'>
                Password <span className='required'>*</span>
              </label>
              <input
                placeholder='Password'
                type='password'
                name='newPassword'
                value={formData.newPassword}
                onChange={handleFormChange}
                className={errors && errors.newPassword !== '' ? 'error' : ''}
              />
              {errors && errors.newPassword !== '' && (
                <label className='errorMessage' htmlFor='passwordError'>
                  {errors.newPassword}
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
          <div className='buttonDiv'>
            <button type='submit' className='submitButton activeButton'>
              Submit
            </button>
            <button
              className='submitButton nonActiveButton'
              onClick={props.handleCloseForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEmployerForm;
