import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { validator } from '../utils/helperFunctions';
import { updateEmployerDetails } from '../redux/actions/EmployerActions';
import '../Styles/VerifierProfile.css';
import moment from 'moment';

const EmployerProfile = () => {
  const { employerData } = useSelector((store) => store.employerReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [formData, setFormData] = useState({
  //   ...employerData,
  //   business_city: 'Delhi',
  //   business_state: 'DL',
  //   business_country: 'IN',
  // });
  const [formData, setFormData] = useState(employerData);
  const [changePass, setChangePass] = useState(false);
  const [changeData, setChangeData] = useState({
    ...employerData,
    business_city: '',
    business_state: '',
    business_country: '',
    auto_renew: '',
  });
  const [changes, setChanges] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [errors, setErrors] = useState(null);

  const countries = Country.getAllCountries();

  const [location, setLocation] = useState({ state: '', country: '' });

  useEffect(() => {
    if (!boolVal) {
      setFormData(employerData);
      const allStates = State.getStatesOfCountry(employerData.business_country);
      const allCities = City.getCitiesOfState(
        employerData.business_country,
        employerData.business_state
      );
      setStates(allStates);
      setCities(allCities);
      setBoolVal(true);
    }
  }, [boolVal, employerData]);

  useEffect(() => {
    if (location.country === '' || location.state === '') {
      const country = Country.getCountryByCode(formData.business_country);
      const state = State.getStateByCodeAndCountry(
        formData.business_state,
        formData.business_country
      );
      setLocation({ ...location, state, country });
      // console.log(country, state);
    }
  }, [formData.business_country, formData.business_state, location]);

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
        business_city: '',
        business_state: '',
        business_country: '',
        auto_renew: '',
      });
      setEditForm(true);
    }
  };

  const handleChangeCountry = (e) => {
    setChangeData({
      ...changeData,
      business_country: e.target.value,
    });
    setChanges({ ...changes, business_country: e.target.value });
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
    if (errors) {
      setErrors({ ...errors, business_country: '' });
    }
  };

  const handleChangeState = (e) => {
    setChangeData({
      ...changeData,
      business_state: e.target.value,
    });
    setChanges({ ...changes, business_state: e.target.value });
    const allCities = City.getCitiesOfState(
      changeData.business_country === ''
        ? formData.business_country
        : changeData.business_country,
      e.target.value
    );
    setCities(allCities);
    if (errors) {
      setErrors({ ...errors, business_state: '' });
    }
  };

  const handleChangePass = () => {
    if (changePass) {
      setChangePass(false);
      setChanges({ ...changes, newPassword: '', confirmPassword: '' });
    } else {
      setChangePass(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var requiredFields = [];
    if (changes?.business_country) {
      requiredFields = [...requiredFields, 'business_country'];
      if (states.length > 0) {
        requiredFields = [...requiredFields, 'business_state'];
      }
      if (cities.length > 0) {
        requiredFields = [...requiredFields, 'business_city'];
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
          /* complete match */
          dispatch(
            updateEmployerDetails(formData.employer_zynk_id, {
              ...formData,
              ...changes,
              password: changes.newPassword,
            })
          ).then(() => {
            history.push('/employer-dashboard');
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
        dispatch(
          updateEmployerDetails(formData.employer_zynk_id, {
            ...formData,
            ...changes,
            password: '',
          })
        ).then(() => {
          history.push('/employer-dashboard');
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
        <div style={{ marginTop: '1rem' }}>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='employerId'>Employer id</label>
              <input value={formData.employer_zynk_id} disabled />
            </div>
            <div className='custom-select columnWise'>
              <label htmlFor='autoRenew'>Auto-renew</label>
              {editForm ? (
                <select
                  name='auto_renew'
                  id='selectMenu'
                  onChange={handleFormChange}
                  className={`${
                    changeData.auto_renew === '' ? 'grayColor' : ''
                  }`}
                >
                  <option disabled>Select</option>
                  <option selected={formData.auto_renew === '1'} value={'1'}>
                    Yes
                  </option>
                  <option selected={formData.auto_renew === '0'} value={'0'}>
                    No
                  </option>
                </select>
              ) : (
                <input
                  value={formData.auto_renew === '1' ? 'Yes' : 'No'}
                  disabled
                />
              )}
            </div>
          </div>
          <div className='rowWise'>
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
            <div className='columnWise'>
              <label htmlFor='businessName'>Business name</label>
              <input value={formData.business_name} disabled />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='activationDate'>Employer activation date</label>
              <input
                value={moment(formData.employer_activation_date).format(
                  'DD/MM/YYYY'
                )}
                disabled
              />
            </div>
            <div className='columnWise'>
              <label htmlFor='subscriptionEnd'>Subscription end date</label>
              <input
                value={moment(formData.subscription_end_date).format(
                  'DD/MM/YYYY'
                )}
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
                  name='business_email_id'
                  value={changeData.business_email_id}
                  onChange={handleFormChange}
                  className={
                    errors &&
                    errors.business_email_id &&
                    errors.business_email_id !== ''
                      ? 'error'
                      : ''
                  }
                />
              ) : (
                <input value={formData.business_email_id} disabled />
              )}
              {errors && errors.business_email_id !== '' && (
                <label className='errorMessage' htmlFor='emailError'>
                  {errors.business_email_id}
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
                : formData.business_address_line2 === ''
                ? ''
                : 'rowWise'
            }
          >
            <div className='columnWise'>
              <label htmlFor='addressLine1'>Address - line 1</label>
              {editForm ? (
                <input
                  placeholder='Address'
                  type='text'
                  name='business_address_line1'
                  value={changeData.business_address_line1}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.business_address_line1} disabled />
              )}
            </div>
            {editForm ? (
              <div className='columnWise'>
                <label htmlFor='addressLine2'>Address - line 2</label>
                <input
                  placeholder='Address'
                  type='text'
                  name='business_address_line2'
                  value={changeData.business_address_line2}
                  onChange={handleFormChange}
                />
              </div>
            ) : formData.business_address_line2 === '' ? (
              ''
            ) : (
              <div className='columnWise'>
                <label htmlFor='addressLine2'>Address - line 2</label>
                <input value={formData.business_address_line2} disabled />
              </div>
            )}
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='country'>Country</label>
              {editForm ? (
                <select
                  name='business_country'
                  onChange={handleChangeCountry}
                  className={` ${
                    errors &&
                    errors.business_country &&
                    errors.business_country !== ''
                      ? 'error'
                      : ''
                  }`}
                >
                  <option disabled className='demo-select'>
                    Select
                  </option>
                  {countries.map((country) => (
                    <option
                      id='options'
                      selected={country.isoCode === formData.business_country}
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
              {errors && errors.business_country !== '' && (
                <label className='errorMessage' htmlFor='countryError'>
                  {errors.business_country}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='state'>State</label>
              {editForm ? (
                <select
                  name='business_state'
                  onChange={handleChangeState}
                  disabled={states.length === 0}
                  className={` ${
                    errors &&
                    errors.business_state &&
                    errors.business_state !== ''
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
                      selected={state.isoCode === formData.business_state}
                      value={`${state.isoCode}`}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={location.state.name} disabled />
              )}
              {errors && errors.business_state !== '' && (
                <label className='errorMessage' htmlFor='stateError'>
                  {errors.business_state}
                </label>
              )}
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='city'>City</label>
              {editForm ? (
                <select
                  name='business_city'
                  onChange={handleFormChange}
                  disabled={states.length === 0 || cities.length === 0}
                  className={` ${
                    errors &&
                    errors.business_city &&
                    errors.business_city !== ''
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
                      selected={city.name === formData.business_city}
                      value={`${city.name}`}
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={formData.business_city} disabled />
              )}
              {errors && errors.business_city !== '' && (
                <label className='errorMessage' htmlFor='cityError'>
                  {errors.business_city}
                </label>
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='pincode'>Pin code</label>
              {editForm ? (
                <input
                  placeholder='Pin code'
                  type='text'
                  name='business_pincode'
                  value={changeData.business_pincode}
                  onChange={handleFormChange}
                  className={`${
                    errors &&
                    errors.business_pincode &&
                    errors.business_pincode !== ''
                      ? 'error'
                      : ''
                  }`}
                />
              ) : (
                <input value={formData.business_pincode} disabled />
              )}
              {errors && errors.business_pincode !== '' && (
                <label className='errorMessage' htmlFor='pincodeError'>
                  {errors.business_pincode}
                </label>
              )}
            </div>
          </div>
          <div className='columnWise'>
            <label htmlFor='gstNumber'>GST number</label>
            <input value={formData.gst} disabled />
          </div>
          {editForm && changePass && (
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
            <div className='button-div'>
              <button onClick={handleSubmit} className='submit-btn-btn'>
                Submit changes
              </button>
              <button onClick={handleChangePass} className='change-pass-btn'>
                {' '}
                {changePass ? 'Cancel' : 'Change password'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
