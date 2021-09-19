import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Country, State, City } from 'country-state-city';

import { validator, idType } from '../utils/helperFunctions';
import { updateVerifierDetails } from '../redux/actions/VerfierActions';
import '../Styles/VerifierProfile.css';

const VerifierProfile = (props) => {
  const { verifierData } = useSelector((store) => store.verifierReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [formData, setFormData] = useState({
  //   ...verifierData,
  //   verifier_country: 'IN',
  //   verifier_state: 'DL',
  //   verifier_city: 'Delhi',
  // });
  const [formData, setFormData] = useState(verifierData);

  const [changeData, setChangeData] = useState({
    ...formData,
    verifier_state: '',
    verifier_city: '',
    verifier_country: '',
  });
  const [changes, setChanges] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [errors, setErrors] = useState(null);

  const countries = Country.getAllCountries();
  // const allStates = State.getAllStates();
  // const allCities = City.getAllCities();
  const [location, setLocation] = useState({ state: '', country: '' });

  useEffect(() => {
    if (location.country === '' || location.state === '') {
      const country = Country.getCountryByCode(formData.verifier_country);
      const state = State.getStateByCodeAndCountry(
        formData.verifier_state,
        formData.verifier_country
      );
      setLocation({ ...location, state, country });
      // console.log(country, state);
    }
  }, [formData.verifier_state, formData.verifier_country, location]);

  useEffect(() => {
    if (!boolVal) {
      setFormData(verifierData);
      const allStates = State.getStatesOfCountry(verifierData.verifier_country);
      const allCities = City.getCitiesOfState(
        verifierData.verifier_country,
        verifierData.verifier_state
      );
      setStates(allStates);
      setCities(allCities);
      setBoolVal(true);
    }
  }, [verifierData, boolVal]);

  const handleFormChange = (e) => {
    const { name } = e.target;
    setChangeData({ ...changeData, [name]: e.target.value });
    setChanges({ ...changes, [name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSwitchForm = () => {
    if (editForm) {
      setEditForm(false);
      setChangeData({});
      setChanges({});
      setErrors(null);
    } else {
      setChangeData({
        ...formData,
        verifier_state: '',
        verifier_city: '',
        verifier_country: '',
      });
      setEditForm(true);
    }
  };

  const handleChangeCountry = (e) => {
    setChangeData({
      ...changeData,
      verifier_country: e.target.value,
    });
    setChanges({ ...changes, verifier_country: e.target.value });
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
    if (errors) {
      setErrors({ ...errors, verifier_country: '' });
    }
  };

  const handleChangeState = (e) => {
    setChangeData({
      ...changeData,
      verifier_state: e.target.value,
    });
    setChanges({ ...changes, verifier_state: e.target.value });
    const allCities = City.getCitiesOfState(
      changeData.verifier_country,
      e.target.value
    );
    setCities(allCities);
    if (errors) {
      setErrors({ ...errors, verifier_state: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var requiredFields = [];
    if (changes?.verifier_country) {
      requiredFields = [...requiredFields, 'verifier_country'];
      if (states.length > 0) {
        requiredFields = [...requiredFields, 'verifier_state'];
      }
      if (cities.length > 0) {
        requiredFields = [...requiredFields, 'verifier_city'];
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
          /* */
          dispatch(
            updateVerifierDetails(formData.verifier_zynk_id, {
              ...formData,
              ...changes,
              password: changes.newPassword,
            })
          ).then(() => {
            history.push('/verifier-dashboard');
            setEditForm(false);
            setChanges({});
          });
        } else {
          setErrors({
            ...errors,
            newPassword: '',
            confirmPassword: "Passwords don't match",
          });
        }
      } else {
        /**/
        dispatch(
          updateVerifierDetails(formData.verifier_zynk_id, {
            ...formData,
            ...changes,
            password: '',
          })
        ).then(() => {
          history.push('/verifier-dashboard');
          setEditForm(false);
          setChanges({});
        });
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
              <input value={formData.verifier_zynk_id} disabled />
            </div>
            <div className='custom-select columnWise'>
              <label htmlFor='entityType'>Entity type</label>
              <input
                value={formData.entity_type === 'B' ? 'Business' : 'Individual'}
                disabled
              />
            </div>
          </div>
          {formData.entity_type === 'B' && (
            <div className='columnWise'>
              <label htmlFor='businessContactName'>Business contact name</label>
              {editForm ? (
                <input
                  placeholder='Business contact name'
                  type='text'
                  name='business_contact_name'
                  value={changeData.business_contact_name}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.business_contact_name} disabled />
              )}
            </div>
          )}
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='verifierName'>Verifier name</label>
              <input value={formData.verifier_name} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='dateOfRegistration'>Date of registration</label>
              <input
                value={moment(formData.date_of_reg).format('Do MMMM, YYYY')}
                disabled
              />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='email'>Email id</label>
              {editForm ? (
                <input
                  placeholder='Email id'
                  type='email'
                  name='email_id'
                  value={changeData.email_id}
                  onChange={handleFormChange}
                  className={
                    errors && errors.email_id && errors.email_id !== ''
                      ? 'error'
                      : ''
                  }
                />
              ) : (
                <input value={formData.email_id} disabled />
              )}
              {errors && errors.email_id !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.email_id}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='phoneNumber'>Phone number</label>
              {editForm ? (
                <input
                  placeholder='Phone number'
                  type='text'
                  name='phone_number'
                  value={changeData.phone_number}
                  onChange={handleFormChange}
                  className={
                    errors && errors.phone_number && errors.phone_number !== ''
                      ? 'error'
                      : ''
                  }
                />
              ) : (
                <input value={formData.phone_number} disabled />
              )}
              {errors && errors.phone_number !== '' && (
                <label className='errorMessage' htmlFor='phoneNumberError'>
                  {errors.phone_number}
                </label>
              )}
            </div>
          </div>
          <div
            className={
              editForm
                ? 'rowWise'
                : formData.verifier_address_line2 === ''
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
                  name='verifier_address_line1'
                  value={changeData.verifier_address_line1}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.verifier_address_line1} disabled />
              )}
            </div>
            {editForm ? (
              <div className='columnWise'>
                <label htmlFor='addressLine2'>Address - line 2</label>
                <input
                  placeholder='Address'
                  type='text'
                  name='verifier_address_line2'
                  value={changeData.verifier_address_line2}
                  onChange={handleFormChange}
                />
              </div>
            ) : formData.verifier_address_line2 === '' ? (
              ''
            ) : (
              <div className='columnWise'>
                <label htmlFor='addressLine2'>Address - line 2</label>
                <input value={formData.verifier_address_line2} disabled />
              </div>
            )}
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='country'>Country</label>
              {editForm ? (
                <select
                  name='verifier_country'
                  onChange={handleChangeCountry}
                  className={`${
                    changeData.verifier_country === '' ? 'grayColor' : ''
                  }`}
                >
                  <option disabled className='demo-select'>
                    Select
                  </option>
                  {countries.map((country) => (
                    <option
                      id='options'
                      selected={country.isoCode === formData.verifier_country}
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
                  name='verifier_state'
                  onChange={handleChangeState}
                  disabled={states.length === 0}
                  className={`${
                    changeData.verifier_state === '' ? 'grayColor' : ''
                  } ${
                    errors &&
                    errors.verifier_state &&
                    errors.verifier_state !== ''
                      ? 'error'
                      : ''
                  }`}
                >
                  <option
                    disabled
                    selected={states.length === 0}
                    className='demo-select'
                  >
                    {states.length === 0 ? 'No state' : 'Select'}
                  </option>
                  {states.map((state) => (
                    <option
                      key={state.isoCode}
                      selected={state.isoCode === formData.verifier_state}
                      value={`${state.isoCode}`}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={location.state.name} disabled />
              )}
              {errors && errors.verifier_state !== '' && (
                <label className='errorMessage' htmlFor='stateError'>
                  {errors.verifier_state}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='city'>City</label>
              {editForm ? (
                <select
                  name='verifier_city'
                  disabled={states.length === 0 || cities.length === 0}
                  onChange={handleFormChange}
                  className={`${
                    changeData.verifier_city === '' ? 'grayColor' : ''
                  } ${
                    errors &&
                    errors.verifier_city &&
                    errors.verifier_city !== ''
                      ? 'error'
                      : ''
                  }`}
                >
                  <option
                    disabled
                    selected={cities.length === 0}
                    className='demo-select'
                  >
                    {cities.length === 0 ? 'No city' : 'Select'}
                  </option>
                  {cities.map((city) => (
                    <option
                      key={city.name}
                      selected={city.name === formData.verifier_city}
                      value={`${city.name}`}
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={formData.verifier_city} disabled />
              )}
              {errors && errors.verifier_city !== '' && (
                <label className='errorMessage' htmlFor='cityError'>
                  {errors.verifier_city}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='pincode'>Pin code</label>
              {editForm ? (
                <input
                  placeholder='Pin code'
                  type='text'
                  name='verifier_pincode'
                  value={changeData.verifier_pincode}
                  onChange={handleFormChange}
                  className={`${
                    errors &&
                    errors.verifier_pincode &&
                    errors.verifier_pincode !== ''
                      ? 'error'
                      : ''
                  }`}
                />
              ) : (
                <input value={formData.verifier_pincode} disabled />
              )}
              {errors && errors.verifier_pincode !== '' && (
                <label className='errorMessage' htmlFor='pincodeError'>
                  {errors.verifier_pincode}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='idType'>Id type</label>
              <input value={idType[formData.govt_id_type]} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='idNumber'>Id number</label>
              <input value={formData.govt_id_number} disabled />
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
