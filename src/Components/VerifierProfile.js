import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Country, State, City } from 'country-state-city';
import { validator } from '../utils/helperFunctions';
import '../Styles/VerifierProfile.css';
import axios from 'axios';
const initialData = {
  verifierId: 'abcd123',
  entityType: 'I',
  verifierName: 'XYZ',
  dateOfRegistration: moment(Date.now()).format('MM-DD-YYYY'),
  businessContactName: '',
  email: 'xyz@gmail.com',
  phoneNumber: '9326541021',
  addressLine1: 'pqr',
  addressLine2: '',
  pincode: '110051',
  country: 'IN',
  state: 'DL',
  city: 'Delhi',
  idType: 'Xy',
  idNumber: 'xyz123',
  newPassword: '',
  confirmPassword: '',
};

const VerifierProfile = (props) => {
  const {verifier_zync_id} = (props.location && props.location.state) || {};

  const [formData, setFormData] = useState(initialData);
  const [changeData, setChangeData] = useState({
    ...initialData,
    city: '',
    state: '',
    country: '',
  });
  const [changes, setChanges] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [errors, setErrors] = useState(null);

  const countries = Country.getAllCountries();
  const [location, setLocation] = useState({ state: '', country: '' });
   
  useEffect(() => {
    
    axios.post('/get-verifier-profile', {
         "verifier_zync_id":verifier_zync_id
    })
      .then((response) => {
        /* now in response i get all the deets on the current verifier. */
        formData.verifierId = response.data.verifier_zync_id;
        formData.entityType = response.data.entity_type;
        formData.verifierName = response.data.verifier_name;
        formData.businessContactName = response.data.business_contact_name;
        formData.email = response.data.email_id;
        formData.phoneNumber = response.data.phone_number;
        formData.addressLine1 = response.data.verifier_address_line1;
        formData.addressLine2 = response.data.verifier_address_line2;
        formData.pincode = response.data.verifier_pincode;
        formData.country = response.data.verifier_country;
        formData.state = response.data.verifier_state;
        formData.city = response.data.verifier_city;
        formData.idType = response.data.govt_id_type;
        formData.idNumber = response.data.govt_id_number;
        formData.newPassword = response.data.newPassword;
        formData.confirmPassword = response.data.newPassword;
          
    }, (error) => {
      console.log(error);
    });
  }, []);


  useEffect(() => {
    if (location.country === '' || location.state === '') {
      const country = Country.getCountryByCode(formData.country);
      const state = State.getStateByCodeAndCountry(
        formData.state,
        formData.country
      );
      setLocation({ ...location, state, country });
      // console.log(country, state);
    }
  }, [formData.country, formData.state, location]);

  const handleFormChange = (e) => {
    const { name } = e.target;
    setChangeData({ ...changeData, [name]: e.target.value });
    setChanges({ ...changes, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    axios.post('/update-verifier-profile', {
          "verifier_zynk_id": verifier_zync_id, 

          "date_of_reg": formData.dateOfRegistration, 
      
          "entity_type": formData.entityType, 
      
          "verifier_name": formData.verifierName, 
      
          "business_contact_name": formData.businessContactName, 
      
          "email_id": formData.email, 
      
          "phone_number": formData.phoneNumber, 
      
          "govt_id_type": formData.idType , 
       
          "govt_id_number":formData.idNumber, 
      
          "govt_id_attachment": "abcd", 
      
          "verifier_address_line1": formData.addressLine1, 
      
          "verifier_address_line2":formData.addressLine2, 
      
          "verifier_pincode":formData.pincode, 
      
          "verifier_state": formData.state, 
      
          "verifier_city": formData.city, 
      
          "verifier_country":formData.country, 
      
          "updated_by": verifier_zync_id, 
      
          "last_update":  year+month+day,
      
          "password": formData.newPassword

    })
      .then((response) => {
        console.log("success");
      }, (error) => {
        console.log(error);
      });

  };

  const handleSwitchForm = () => {
    if (editForm) {
      setEditForm(false);
      setChangeData({});
      setChanges({});
      setErrors(null);
    } else {
      setChangeData({ ...formData, city: '', state: '', country: '' });
      setEditForm(true);
    }
  };

  const handleChangeCountry = (e) => {
    setChangeData({
      ...changeData,
      country: e.target.value,
    });
    setChanges({ ...changes, country: e.target.value });
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
    if (errors) {
      setErrors({ ...errors, country: '' });
    }
  };

  const handleChangeState = (e) => {
    setChangeData({
      ...changeData,
      state: e.target.value,
    });
    setChanges({ ...changes, state: e.target.value });
    const allCities = City.getCitiesOfState(changeData.country, e.target.value);
    setCities(allCities);
    if (errors) {
      setErrors({ ...errors, state: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var requiredFields = [];
    if (changes?.country) {
      if (states.length > 0) {
        requiredFields = [...requiredFields, 'country', 'state'];
      }
      if (cities.length > 0) {
        requiredFields = [...requiredFields, 'city', 'pincode'];
      }
    }
    if (changes?.newPassword || changes?.confirmPassword) {
      requiredFields = [...requiredFields, 'newPassword', 'confirmPassword'];
    }
    const flag = validator(changes, requiredFields);
    if (flag === true) {
      setErrors(null);
      if (changes?.newPassword && changes?.confirmPassword) {
        if (changes.newPassword === changes.confirmPassword) {
          setEditForm(false);
          setChanges({});
        } else {
          setErrors({
            ...errors,
            newPassword: '',
            confirmPassword: "Passwords don't match",
          });
        }
      } else {
        setEditForm(false);
        setChanges({});
      }
    } else {
      setErrors(flag);
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <div className='header rowWise'>
          <h1 style={{ marginBottom: '1rem' }}>
            {!editForm ? 'Profile details' : 'Update profile'}
          </h1>
          <button
            onClick={handleSwitchForm}
            className={`editButton ${
              editForm ? 'nonActiveButton' : 'activeButton'
            }`}
          >
            {!editForm ? 'Edit' : 'Cancel'}
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='verifierId'>Verifier id</label>
              <input value={formData.verifierId} disabled />
            </div>
            <div className='custom-select columnWise'>
              <label htmlFor='entityType'>Entity type</label>
              <input
                value={formData.entityType === 'B' ? 'Business' : 'Individual'}
                disabled
              />
            </div>
          </div>
          {formData.entityType === 'B' && (
            <div className='columnWise'>
              <label htmlFor='businessContactName'>Business contact name</label>
              {editForm ? (
                <input
                  placeholder='Business contact name'
                  type='text'
                  name='businessContactName'
                  value={changeData.businessContactName}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.businessContactName} disabled />
              )}
            </div>
          )}
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='verifierName'>Verifier name</label>
              <input value={formData.verifierName} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='dateOfRegistration'>Date of registration</label>
              <input value={formData.dateOfRegistration} disabled />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='email'>Email id</label>
              {editForm ? (
                <input
                  placeholder='Email id'
                  type='email'
                  name='email'
                  value={changeData.email}
                  onChange={handleFormChange}
                  className={
                    errors && errors.email && errors.email !== '' ? 'error' : ''
                  }
                />
              ) : (
                <input value={formData.email} disabled />
              )}
              {errors && errors.email !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.email}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='phoneNumber'>Phone number</label>
              {editForm ? (
                <input
                  placeholder='Phone number'
                  type='text'
                  name='phoneNumber'
                  value={changeData.phoneNumber}
                  onChange={handleFormChange}
                  className={
                    errors && errors.phoneNumber && errors.phoneNumber !== ''
                      ? 'error'
                      : ''
                  }
                />
              ) : (
                <input value={formData.phoneNumber} disabled />
              )}
              {errors && errors.phoneNumber !== '' && (
                <label className='errorMessage' htmlFor='phoneNumberError'>
                  {errors.phoneNumber}
                </label>
              )}
            </div>
          </div>
          <div
            className={
              editForm
                ? 'rowWise'
                : formData.addressLine2 === ''
                ? ''
                : 'rowWise'
            }
          >
            <div className='columnWise'>
              <label htmlFor='addressLine1'>Address - line 1</label>
              {editForm ? (
                <input
                  placeholder='Address'
                  type='texr'
                  name='addressLine1'
                  value={changeData.addressLine1}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.addressLine1} disabled />
              )}
            </div>
            {editForm ? (
              <div className='columnWise'>
                <label htmlFor='addressLine2'>Address - line 2</label>
                <input
                  placeholder='Address'
                  type='text'
                  name='addressLine2'
                  value={changeData.addressLine2}
                  onChange={handleFormChange}
                />
              </div>
            ) : formData.addressLine2 === '' ? (
              ''
            ) : (
              <input value={formData.addressLine2} disabled />
            )}
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='country'>Country</label>
              {editForm ? (
                <select
                  name='country'
                  onChange={handleChangeCountry}
                  className={`${changeData.country === '' ? 'grayColor' : ''}`}
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
              ) : (
                <input value={location.country.name} disabled />
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='state'>State</label>
              {editForm ? (
                <select
                  name='state'
                  onChange={handleChangeState}
                  disabled={!changeData.country}
                  className={`${changeData.state === '' ? 'grayColor' : ''} ${
                    errors && errors.state && errors.state !== '' ? 'error' : ''
                  }`}
                >
                  <option disabled selected className='demo-select'>
                    Select
                  </option>
                  {changeData.country !== '' &&
                    states.map((state) => (
                      <option key={state.isoCode} value={`${state.isoCode}`}>
                        {state.name}
                      </option>
                    ))}
                </select>
              ) : (
                <input value={location.state.name} disabled />
              )}
              {errors && errors.state !== '' && (
                <label className='errorMessage' htmlFor='stateError'>
                  {errors.state}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='city'>City</label>
              {editForm ? (
                <select
                  name='city'
                  onChange={handleFormChange}
                  disabled={!changeData.state}
                  className={`${changeData.city === '' ? 'grayColor' : ''} ${
                    errors && errors.city && errors.city !== '' ? 'error' : ''
                  }`}
                >
                  <option disabled selected className='demo-select'>
                    Select
                  </option>
                  {changeData.state !== '' &&
                    cities.map((city) => (
                      <option key={city.name} value={`${city.name}`}>
                        {city.name}
                      </option>
                    ))}
                </select>
              ) : (
                <input value={formData.city} disabled />
              )}
              {errors && errors.city !== '' && (
                <label className='errorMessage' htmlFor='cityError'>
                  {errors.city}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='pincode'>Pin code</label>
              {editForm ? (
                <input
                  placeholder='Pin code'
                  type='text'
                  name='pincode'
                  value={changeData.pincode}
                  onChange={handleFormChange}
                  className={`${
                    errors && errors.pincode && errors.pincode !== ''
                      ? 'error'
                      : ''
                  }`}
                />
              ) : (
                <input value={formData.pincode} disabled />
              )}
              {errors && errors.pincode !== '' && (
                <label className='errorMessage' htmlFor='pincodeError'>
                  {errors.pincode}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='idType'>Id type</label>
              <input value={formData.idType} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='idNumber'>Id number</label>
              <input value={formData.idNumber} disabled />
            </div>
          </div>
          {editForm && (
            <div className='rowWise'>
              <div className='columnWise'>
                <label htmlFor='password'>Password</label>
                <input
                  placeholder='Password'
                  type='password'
                  name='newPassword'
                  value={changeData.newPassword}
                  onChange={handleFormChange}
                  className={`${
                    errors && errors.newPassword && errors.newPassword !== ''
                      ? 'error'
                      : ''
                  }`}
                />
                {errors && errors.newPassword !== '' && (
                  <label className='errorMessage' htmlFor='passwordError'>
                    {errors.newPassword}
                  </label>
                )}
              </div>
              <div className='columnWise'>
                <label htmlFor='confirmPassword'>Confirm password</label>
                <input
                  placeholder='Confirm password'
                  type='password'
                  name='confirmPassword'
                  value={changeData.confirmPassword}
                  onChange={handleFormChange}
                  className={`${
                    errors &&
                    errors.confirmPassword &&
                    errors.confirmPassword !== ''
                      ? 'error'
                      : ''
                  }`}
                />
                {errors && errors.confirmPassword !== '' && (
                  <label
                    className='errorMessage'
                    htmlFor='confirmPasswordError'
                  >
                    {errors.confirmPassword}
                  </label>
                )}
              </div>
            </div>
          )}
          {editForm && (
            <div className='submit-btn'>
              <button type='submit'>Submit changes</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifierProfile;
