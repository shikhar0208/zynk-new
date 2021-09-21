import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { validator } from '../utils/helperFunctions';
import { useDispatch } from 'react-redux';

import Loader from '../utils/Loader';

import { verifierSignup } from '../redux/actions/VerfierActions';
import { uploadAttachment } from '../redux/actions/api';

import '../Styles/VerifierRegistrationForm.css';
import VerifierSignupPopup from './VerifierSignupPopup';

const initialData = {
  entity_type: '',
  verifier_name: '',
  business_contact_name: '',
  email_id: '',
  phone_number: '',
  verifier_address_line1: '',
  verifier_address_line2: '',
  verifier_pincode: '',
  verifier_country: '',
  verifier_state: '',
  verifier_city: '',
  govt_id_type: '',
  govt_id_number: '',
  govt_id_attachment: '',
  newPassword: '',
  confirmPassword: '',
};

const VerifierRegistrationForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialData);
  const [image, setImage] = useState({ govt_id_attachment: '' });
  const [states, setStates] = useState('');
  const [cities, setCities] = useState('');
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const countries = Country.getAllCountries();

  var requiredFields = [
    'entity_type',
    'verifier_name',
    'email_id',
    'phone_number',
    'verifier_address_line1',
    'verifier_pincode',
    'verifier_country',
    'govt_id_type',
    'govt_id_number',
    'govt_id_attachment',
    'newPassword',
    'confirmPassword',
  ];

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

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
      verifier_country: e.target.value,
    });
    if (errors) {
      setErrors({ ...errors, verifier_country: '' });
    }
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
  };

  const handleChangeState = (e) => {
    setFormData({
      ...formData,
      verifier_state: e.target.value,
    });
    if (errors) {
      setErrors({ ...errors, verifier_state: '' });
    }
    const allCities = City.getCitiesOfState(
      formData.verifier_country,
      e.target.value
    );
    setCities(allCities);
  };

  const handleSwitch = () => {
    history.push('/login');
  };

  const handleImageUpload = async (e) => {
    const { name } = e.target;
    let file = e.target.files[0];
    setImage({ ...image, [name]: e.target.value });
    const imageData = new FormData();
    imageData.append('govt_id', file);
    const { data } = await uploadAttachment(imageData);
    setFormData({ ...formData, govt_id_attachment: data.key });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formData.entityType === 'B') {
      requiredFields = [...requiredFields, 'business_contact_name'];
    }

    if (states.length > 0) {
      requiredFields = [...requiredFields, 'verifier_state'];
    }

    if (cities.length > 0) {
      requiredFields = [...requiredFields, 'verifier_city'];
    }

    const flag = validator(formData, requiredFields);

    if (flag === true) {
      setErrors(null);
      if (formData.newPassword === formData.confirmPassword) {
        const signupData = { ...formData, password: formData.newPassword };
        dispatch(verifierSignup(signupData, history)).then(() => {
          setIsLoading(false);
          setIsOpenPopup(true);
          setFormData(initialData);
        });
      } else {
        setIsLoading(false);
        setErrors({
          ...errors,
          newPassword: '',
          confirmPassword: "Passwords don't match",
        });
      }
    } else {
      setIsLoading(false);
      setErrors(flag);
    }
  };

  return (
    <div className={`wrapper ${isOpenPopup ? 'wrapper-overflow' : ''}`}>
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
                name='entity_type'
                id='selectMenu'
                onChange={handleFormChange}
                className={`${formData.entity_type === '' ? 'grayColor' : ''} ${
                  errors && errors.entity_type !== '' ? 'error' : ''
                }`}
              >
                <option disabled value='' selected>
                  Select
                </option>
                <option value='B'>Business</option>
                <option value='I'>Individual</option>
              </select>
              {errors && errors.entity_type !== '' && (
                <label className='errorMessage' htmlFor='entityTypeError'>
                  {errors.entity_type}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='verifier_name'>
                Verifier name <span className='required'>*</span>
              </label>
              <input
                placeholder='Verifier name'
                type='text'
                name='verifier_name'
                value={formData.verifier_name}
                onChange={handleFormChange}
                className={errors && errors.verifier_name !== '' ? 'error' : ''}
              />
              {errors && errors.verifier_name !== '' && (
                <label className='errorMessage' htmlFor='verifierNameError'>
                  {errors.verifier_name}
                </label>
              )}
            </div>
          </div>
          {formData.entity_type === 'B' && (
            <div className='columnWise'>
              <label htmlFor='business_contact_name'>
                Business contact name <span className='required'>*</span>
              </label>
              <input
                placeholder='Business contact name'
                type='text'
                name='business_contact_name'
                value={formData.business_contact_name}
                onChange={handleFormChange}
                className={
                  errors && errors.business_contact_name !== '' ? 'error' : ''
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
          )}
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='email'>
                Email id<span className='required'>*</span>
              </label>
              <input
                placeholder='Email id'
                type='text'
                name='email_id'
                value={formData.email_id}
                onChange={handleFormChange}
                className={errors && errors.email_id !== '' ? 'error' : ''}
              />
              {errors && errors.email_id !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.email_id}
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
                name='phone_number'
                value={formData.phone_number}
                onChange={handleFormChange}
                className={errors && errors.phone_number !== '' ? 'error' : ''}
              />
              {errors && errors.phone_number !== '' && (
                <label className='errorMessage' htmlFor='phoneNumberError'>
                  {errors.phone_number}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='verifier_address_line1'>
                Address - line 1 <span className='required'>*</span>
              </label>
              <input
                placeholder='Address'
                type='texr'
                name='verifier_address_line1'
                value={formData.verifier_address_line1}
                onChange={handleFormChange}
                className={
                  errors && errors.verifier_address_line1 !== '' ? 'error' : ''
                }
              />
              {errors && errors.verifier_address_line1 !== '' && (
                <label className='errorMessage' htmlFor='addressLine1Error'>
                  {errors.verifier_address_line1}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='addressLine2'>Address - line 2</label>
              <input
                placeholder='Address'
                type='text'
                name='verifier_address_line2'
                value={formData.verifier_address_line2}
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
                name='verifier_country'
                onChange={handleChangeCountry}
                className={`${
                  formData.verifier_country === '' ? 'grayColor' : ''
                } ${errors && errors.verifier_country !== '' ? 'error' : ''}`}
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
              {errors && errors.verifier_country !== '' && (
                <label className='errorMessage' htmlFor='countryError'>
                  {errors.verifier_country}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='state'>
                State <span className='required'>*</span>
              </label>
              <select
                name='verifier_state'
                onChange={handleChangeState}
                disabled={!formData.verifier_country}
                className={`${
                  formData.verifier_state === '' ? 'grayColor' : ''
                } ${
                  errors &&
                  errors.verifier_state &&
                  errors.verifier_state !== ''
                    ? 'error'
                    : ''
                }`}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {formData.verifier_country !== '' &&
                  states.map((state) => (
                    <option key={state.isoCode} value={`${state.isoCode}`}>
                      {state.name}
                    </option>
                  ))}
              </select>
              {errors && errors.verifier_state !== '' && (
                <label className='errorMessage' htmlFor='stateError'>
                  {errors.verifier_state}
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
                name='verifier_city'
                onChange={handleFormChange}
                disabled={!formData.verifier_state}
                className={`${
                  formData.verifier_city === '' ? 'grayColor' : ''
                } ${
                  errors && errors.verifier_city && errors.verifier_city !== ''
                    ? 'error'
                    : ''
                }`}
              >
                <option disabled selected className='demo-select'>
                  Select
                </option>
                {formData.verifier_state !== '' &&
                  cities.map((city) => (
                    <option key={city.name} value={`${city.name}`}>
                      {city.name}
                    </option>
                  ))}
              </select>
              {errors && errors.verifier_city !== '' && (
                <label className='errorMessage' htmlFor='cityError'>
                  {errors.verifier_city}
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
                name='verifier_pincode'
                value={formData.verifier_pincode}
                onChange={handleFormChange}
                className={
                  errors && errors.verifier_pincode !== '' ? 'error' : ''
                }
              />
              {errors && errors.verifier_pincode !== '' && (
                <label className='errorMessage' htmlFor='pincodeError'>
                  {errors.verifier_pincode}
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
                name='govt_id_type'
                onChange={handleFormChange}
                className={`${
                  formData.govt_id_type === '' ? 'grayColor' : ''
                } ${
                  errors && errors.govt_id_type && errors.govt_id_type !== ''
                    ? 'error'
                    : ''
                }`}
              >
                <option disabled value='' selected>
                  Select
                </option>
                <option value='P'>PAN</option>
                <option value='G'>GST</option>
                <option value='A'>Aadhaar</option>
              </select>
              {errors && errors.govt_id_type !== '' && (
                <label className='errorMessage' htmlFor='idTypeError'>
                  {errors.govt_id_type}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='idNumber'>
                Id number <span className='required'>*</span>
              </label>
              <input
                placeholder='Id number'
                type='text'
                name='govt_id_number'
                value={formData.govt_id_number}
                onChange={handleFormChange}
                className={
                  errors &&
                  errors.govt_id_number &&
                  errors.govt_id_number !== ''
                    ? 'error'
                    : ''
                }
              />
              {errors && errors.govt_id_number !== '' && (
                <label className='errorMessage' htmlFor='idNumberError'>
                  {errors.govt_id_number}
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
              name='govt_id_attachment'
              value={image.govt_id_attachment}
              onChange={handleImageUpload}
              className={
                errors &&
                errors.govt_id_attachment &&
                errors.govt_id_attachment !== ''
                  ? 'error'
                  : ''
              }
            />
            {errors && errors.govt_id_attachment !== '' && (
              <label className='errorMessage' htmlFor='idAttachmentError'>
                {errors.govt_id_attachment}
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

          {isLoading ? (
            <Loader />
          ) : (
            <div className='createAccount'>
              <button type='submit'>Register</button>
              <small>
                Already have an account?{' '}
                <span className='switch-form' onClick={handleSwitch}>
                  Log in
                </span>
              </small>
            </div>
          )}
        </form>
      </div>
      {isOpenPopup && <VerifierSignupPopup closePopup={handleClosePopup} />}
    </div>
  );
};

export default VerifierRegistrationForm;
