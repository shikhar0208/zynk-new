import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import '../Styles/VerifierProfile.css';

const initialData = {
  employerId: 'abcd123',
  autoRenew: false,
  businessName: 'XYZ',
  businessContactName: 'xyz org',
  activationDate: '20/02/2021',
  subscriptionEnd: '20/02/2022',
  email: 'xyz@gmail.com',
  phoneNumber: '9326541021',
  addressLine1: 'pqr',
  addressLine2: '',
  pincode: '110051',
  country: 'IN',
  state: 'DL',
  city: 'Delhi',
  gstNumber: '12315498',
  password: '',
  confirmPassword: '',
};

const EmployerProfile = () => {
  const [formData, setFormData] = useState(initialData);
  const [changeData, setChangeData] = useState({
    ...initialData,
    city: '',
    state: '',
    country: '',
    autoRenew: '',
  });
  const [changes, setChanges] = useState({});
  const [states, setStates] = useState('');
  const [cities, setCities] = useState('');
  const [editForm, setEditForm] = useState(false);

  const countries = Country.getAllCountries();

  const [location, setLocation] = useState({ state: '', country: '' });

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
  };

  const handleChangeCountry = (e) => {
    setChangeData({
      ...changeData,
      country: e.target.value,
    });
    setChanges({ ...changes, country: e.target.value });
    const allStates = State.getStatesOfCountry(e.target.value);
    setStates(allStates);
  };

  const handleChangeState = (e) => {
    setChangeData({
      ...changeData,
      state: e.target.value,
    });
    setChanges({ ...changes, state: e.target.value });
    const allCities = City.getCitiesOfState(changeData.country, e.target.value);
    setCities(allCities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(changeData);
    console.log(changes);
    setChanges({});
    setEditForm(false);
  };

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <div className='header rowWise'>
          <h1 style={{ marginBottom: '1rem' }}>
            {!editForm ? 'Profile Details' : 'Update Profile'}
          </h1>
          <button
            onClick={() => setEditForm(!editForm)}
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
              <label htmlFor='employerId'>Employer id</label>
              <input value={formData.employerId} disabled />
            </div>
            <div className='custom-select columnWise'>
              <label htmlFor='autoRenew'>Auto-renew</label>
              {editForm ? (
                <select
                  name='autoRenew'
                  id='selectMenu'
                  onChange={handleFormChange}
                  className={`${
                    changeData.autoRenew === '' ? 'grayColor' : ''
                  }`}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              ) : (
                <input value={formData.autoRenew ? 'Yes' : 'No'} disabled />
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
                  name='businessContactName'
                  value={changeData.businessContactName}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.businessContactName} disabled />
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='businessName'>Business name</label>
              <input value={formData.businessName} disabled />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='activationDate'>Employer activation date</label>
              <input value={formData.activationDate} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='subscriptionEnd'>Subscription end date</label>
              <input value={formData.subscriptionEnd} disabled />
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
                />
              ) : (
                <input value={changeData.email} disabled />
              )}
            </div>
            <div className='columnWise'>
              <label htmlFor='phoneNumber'>Phone number</label>
              {editForm ? (
                <input
                  placeholder='Phone number'
                  type='text'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                />
              ) : (
                <input value={formData.phoneNumber} disabled />
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
                  className='country'
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
                  className={`${changeData.state === '' ? 'grayColor' : ''}`}
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
                  className={`${changeData.city === '' ? 'grayColor' : ''}`}
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
                />
              ) : (
                <input value={formData.pincode} disabled />
              )}
            </div>
          </div>
          <div className='columnWise'>
            <label htmlFor='gstNumber'>GST number</label>
            <input value={formData.gstNumber} disabled />
          </div>
          {editForm && (
            <div className='rowWise'>
              <div className='columnWise'>
                <label htmlFor='password'>Password</label>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={changeData.password}
                  onChange={handleFormChange}
                />
              </div>
              <div className='columnWise'>
                <label htmlFor='confirmPassword'>Confirm password</label>
                <input
                  placeholder='Confirm password'
                  type='password'
                  name='confirmPassword'
                  value={changeData.confirmPassword}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          )}
          {editForm && (
            <div className='submit-btn'>
              <button type='submit'>Submit Changes</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployerProfile;
