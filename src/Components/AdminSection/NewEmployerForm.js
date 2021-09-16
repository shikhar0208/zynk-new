import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validator } from '../../utils/helperFunctions';
import { Country, State, City } from 'country-state-city';

import { addEmployer } from '../../redux/actions/AdminActions';

import '../../Styles/AdminSection/NewEmployerForm.css';

const initialData = {
  employer_activation_date: '',
  subscription_end_date: '',
  auto_renew: '',
  business_name: '',
  business_contact_name: '',
  business_email_id: '',
  phone_number: '',
  business_address_line1: '',
  business_address_line2: '',
  business_pincode: '',
  business_state: '',
  business_city: '',
  business_country: '',
  gst: '',
  newPassword: '',
  confirmPassword: '',
};

const NewEmployerForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null);
  const [states, setStates] = useState('');
  const [cities, setCities] = useState('');

  const countries = Country.getAllCountries();

  var requiredFields = [
    'employer_activation_date',
    'subscription_end_date',
    'auto_renew',
    'business_name',
    'business_contact_name',
    'business_email_id',
    'phone_number',
    'business_address_line1',
    'business_pincode',
    'business_country',
    'gst',
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
      business_country: e.target.value,
    });
    if (errors) {
      setErrors({ ...errors, business_country: '' });
    }
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
  };

  const handleChangeState = (e) => {
    setFormData({
      ...formData,
      business_state: e.target.value,
    });
    if (errors) {
      setErrors({ ...errors, business_state: '' });
    }
    const allCities = City.getCitiesOfState(
      formData.business_country,
      e.target.value
    );
    setCities(allCities);
  };

  const handleCancel = () => {
    history.push('/admin/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (states.length > 0) {
      requiredFields = [...requiredFields, 'business_state'];
    }

    if (cities.length > 0) {
      requiredFields = [...requiredFields, 'business_city'];
    }

    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      if (formData.newPassword === formData.confirmPassword) {
        const userDetail = {
          ...formData,
          employer_activation_date: new Date(formData.employer_activation_date),
          subscription_end_date: new Date(formData.subscription_end_date),
          password: formData.newPassword,
        };
        dispatch(addEmployer(userDetail))
          .then(() => {
            setFormData(initialData);
            alert('Employer created!');
          })
          .catch(() => {
            setFormData(initialData);
            alert('Something went wrong, please try later.');
          });
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
                name='employer_activation_date'
                value={formData.employer_activation_date}
                onChange={handleFormChange}
                className={
                  errors && errors.employer_activation_date !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.employer_activation_date !== '' && (
                <label className='errorMessage' htmlFor='activationDateError'>
                  {errors.employer_activation_date}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='subscriptionEndDate'>
                Subscription end date <span className='required'>*</span>
              </label>
              <input
                type='date'
                name='subscription_end_date'
                value={formData.subscription_end_date}
                onChange={handleFormChange}
                className={
                  errors && errors.subscription_end_date !== '' ? 'error' : ''
                }
              />
              {errors && errors.subscription_end_date !== '' && (
                <label className='errorMessage' htmlFor='endDateError'>
                  {errors.subscription_end_date}
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
                name='auto_renew'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${formData.auto_renew === '' ? 'grayColor' : ''} ${
                  errors && errors.auto_renew !== '' ? 'error' : ''
                }`}
              >
                <option disabled selected>
                  Select
                </option>
                <option value={'1'}>Yes</option>
                <option value={'0'}>No</option>
              </select>
              {errors && errors.auto_renew !== '' && (
                <label className='errorMessage' htmlFor='autoRenewError'>
                  {errors.auto_renew}
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
                name='business_name'
                value={formData.business_name}
                onChange={handleFormChange}
                className={
                  errors && errors.business_name && errors.business_name !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.business_name !== '' && (
                <label className='errorMessage' htmlFor='businessNameError'>
                  {errors.business_name}
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
                name='business_contact_name'
                value={formData.business_contact_name}
                onChange={handleFormChange}
                className={
                  errors &&
                  errors.business_contact_name &&
                  errors.business_contact_name !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.business_contact_name !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='businessContactNameError'
                >
                  {errors.business_contact_name}
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
                name='business_email_id'
                value={formData.business_email_id}
                className={
                  errors &&
                  errors.business_email_id &&
                  errors.business_email_id !== ''
                    ? 'error'
                    : ''
                }
                onChange={handleFormChange}
              />
              {errors && errors.business_email_id !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.business_email_id}
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
                name='phone_number'
                value={formData.phone_number}
                className={
                  errors && errors.phone_number && errors.phone_number !== ''
                    ? 'error'
                    : ''
                }
                onChange={handleFormChange}
              />
              {errors && errors.phone_number !== '' && (
                <label className='errorMessage' htmlFor='phoneNumberError'>
                  {errors.phone_number}
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
                name='gst'
                value={formData.gst}
                className={
                  errors && errors.gst && errors.gst !== '' ? 'error' : ''
                }
                onChange={handleFormChange}
              />
              {errors && errors.gst !== '' && (
                <label
                  className='errorMessage'
                  htmlFor='verificationReasonError'
                >
                  {errors.gst}
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
                type='text'
                name='business_address_line1'
                value={formData.business_address_line1}
                onChange={handleFormChange}
                className={
                  errors && errors.business_address_line1 !== '' ? 'error' : ''
                }
              />
              {errors && errors.business_address_line1 !== '' && (
                <label className='errorMessage' htmlFor='addressLine1Error'>
                  {errors.business_address_line1}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='addressLine2'>Address - line 2</label>
              <input
                placeholder='Address'
                type='text'
                name='business_address_line2'
                value={formData.business_address_line2}
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
                name='business_country'
                onChange={handleChangeCountry}
                className={`${
                  formData.business_country === '' ? 'grayColor' : ''
                } ${errors && errors.business_country !== '' ? 'error' : ''}`}
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
              {errors && errors.business_country !== '' && (
                <label className='errorMessage' htmlFor='countryError'>
                  {errors.business_country}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='state'>
                State <span className='required'>*</span>
              </label>
              <select
                name='business_state'
                onChange={handleChangeState}
                disabled={!formData.business_country}
                className={`${
                  formData.business_state === '' ? 'grayColor' : ''
                } ${
                  errors &&
                  errors.business_state &&
                  errors.business_state !== ''
                    ? 'error'
                    : ''
                }`}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {formData.business_country !== '' &&
                  states.map((state) => (
                    <option key={state.isoCode} value={`${state.isoCode}`}>
                      {state.name}
                    </option>
                  ))}
              </select>
              {errors && errors.business_state !== '' && (
                <label className='errorMessage' htmlFor='stateError'>
                  {errors.business_state}
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
                name='business_city'
                onChange={handleFormChange}
                disabled={!formData.business_state}
                className={`${
                  formData.business_city === '' ? 'grayColor' : ''
                } ${
                  errors && errors.business_city && errors.business_city !== ''
                    ? 'error'
                    : ''
                }`}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {formData.business_state !== '' &&
                  cities.map((city) => (
                    <option key={city.name} value={`${city.name}`}>
                      {city.name}
                    </option>
                  ))}
              </select>
              {errors && errors.business_city !== '' && (
                <label className='errorMessage' htmlFor='cityError'>
                  {errors.business_city}
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
                name='business_pincode'
                value={formData.business_pincode}
                onChange={handleFormChange}
                className={
                  errors && errors.business_pincode !== '' ? 'error' : ''
                }
              />
              {errors && errors.business_pincode !== '' && (
                <label className='errorMessage' htmlFor='pincodeError'>
                  {errors.business_pincode}
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
              onClick={handleCancel}
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
