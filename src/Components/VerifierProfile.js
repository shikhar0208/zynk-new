import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import '../Styles/VerifierProfile.css';

const initialData = {
  verifierId: 'abcd123',
  entityType: 'I',
  verifierName: 'XYZ',
  dateOfRegistration: '20/02/2020',
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
  password: '',
  confirmPassword: '',
};

const VerifierProfile = () => {
  const [formData, setFormData] = useState(initialData);
  const [changeData, setChangeData] = useState({
    ...initialData,
    state: '',
    country: '',
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
              <label htmlFor='verifierId'>Verifier Id</label>
              <input value={formData.verifierId} disabled />
            </div>
            <div className='custom-select columnWise'>
              <label htmlFor='entityType'>Entity Type</label>
              <input
                value={formData.entityType === 'B' ? 'Business' : 'Individual'}
                disabled
              />
            </div>
          </div>
          {formData.entityType === 'B' && (
            <div className='columnWise'>
              <label htmlFor='businessContactName'>Business Contact Name</label>
              {editForm ? (
                <input
                  placeholder='Business Contact Name'
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
              <label htmlFor='verifierName'>Verifier Name</label>
              <input value={formData.verifierName} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='dateOfRegistration'>Date of Registration</label>
              <input value={formData.dateOfRegistration} disabled />
            </div>
          </div>
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='email'>Email</label>
              {editForm ? (
                <input
                  placeholder='Email'
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
              <label htmlFor='phoneNumber'>Phone Number</label>
              {editForm ? (
                <input
                  placeholder='Phone Number'
                  type='text'
                  name='phoneNumber'
                  value={changeData.phoneNumber}
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
              <label htmlFor='addressLine1'>Address - Line 1</label>
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
                <label htmlFor='addressLine2'>Address - Line 2</label>
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
                  disabled={!formData.country}
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
                  disabled={!formData.state}
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
              <label htmlFor='pincode'>Pin Code</label>
              {editForm ? (
                <input
                  placeholder='Pin Code'
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
          <div className='rowWise'>
            <div className='columnWise'>
              <label htmlFor='idType'>Id Type</label>
              <input value={formData.idType} disabled />
            </div>
            <div className='columnWise'>
              <label htmlFor='idNumber'>Id Number</label>
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
                  name='password'
                  value={changeData.password}
                  onChange={handleFormChange}
                />
              </div>
              <div className='columnWise'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  placeholder='Confirm Password'
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

export default VerifierProfile;
