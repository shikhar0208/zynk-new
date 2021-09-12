import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { validator } from '../utils/helperFunctions';
import axios from 'axios'

import '../Styles/VerifierRegistrationForm.css';
/* set schema for our formData hook */
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

const VerifierRegistrationForm = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialData);
  const [states, setStates] = useState('');
  const [cities, setCities] = useState('');
  const [errors, setErrors] = useState(null);
  const [photoID, setphotoID] = useState(null);
  const [zyncID, setzyncID] = useState(null);
  const countries = Country.getAllCountries();

  var requiredFields = [
    'entityType',
    'verifierName',
    'email',
    'phoneNumber',
    'addressLine1',
    'pincode',
    'country',
    'idType',
    'idNumber',
    'idAttachment',
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

  const handleSwitch = () => {
    history.push('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.entityType === 'B') {
      requiredFields = [...requiredFields, 'businessContactName'];
    }

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
        
      axios.post('verifier-signup', {
             "entity_type": formData.entityType,  

              "verifier_name": formData.verifierName,  
          
              "business_contact_name": formData.businessContactName,  
          
              "email_id": formData.email,  
          
              "phone_number": formData.phoneNumber,  
          
              "verifier_address_line1": formData.addressLine1,  
          
              "verifier_address_line2":formData.addressLine2,  
          
              "verifier_country": formData.country,  
          
              "verifier_state": formData.state,  
          
              "verifier_city":formData.city,  
          
              "verifier_pincode": formData.pincode,  
          
              "govt_id_type": formData.idType,  
          
              "govt_id_number":formData.idNumber,  
          
              "govt_id_attachment": photoID, 
          
              "password": formData.password 
      })
        /* everytime i reach verifier-dashboard , i need to have the zync_verifier_id to display all the info on the verifier_dashboard. */
          .then((response) => {
            setzyncID(response.data.verifier_zynk_id);
            props.history.push({
              pathname: "/verifier_dashboard",
              state: { verifier_zync_id: zyncID }
            });
            

        }, (error) => {
          console.log(error);
        });
        

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

  const handleIDChange = (e) => {
       
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
      axios.post('upload-attachment', {
        "govt_id": formData.idAttachment
      })
      .then((response) => {
          setphotoID(response.data.Key);
        }, (error) => {
          console.log(error);
       });

  };

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <div className='header'>
          <h1 style={{ marginBottom: '1rem' }}>Verifier sign up</h1>
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
          {/* id Attachment Section */}
          <div className='columnWise'>
            <label htmlFor='idAttachment'>
              Id attachment file <span className='required'>*</span>
            </label>
            <input
              type='file'
              name='idAttachment'
              value={formData.idAttachment}
              onChange={handleIDChange}
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
