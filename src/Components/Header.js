import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { employerLogout } from '../redux/actions/EmployerActions';
import { verifierLogout } from '../redux/actions/VerfierActions';

import '../Styles/Header.css';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const verifierLoggedIn = useSelector(
    (store) => store.verifierReducer.isAuthenticated
  );
  const employerLoggedIn = useSelector(
    (store) => store.employerReducer.isAuthenticated
  );
  const [isActive, setIsActive] = useState(false);

  const goToHome = () => {
    history.push('/');
  };

  const handleVerfierLogout = () => {
    dispatch(verifierLogout());
  };
  const handleEmployerLogout = () => {
    dispatch(employerLogout());
  };

  return (
    <div className='header-container'>
      <div className='titleName'>
        {' '}
        <h2 className='brandName' onClick={goToHome}>
          Zynk
        </h2>
      </div>
      <div className='functions'>
        {!verifierLoggedIn && !employerLoggedIn && (
          <div className='dropdown'>
            <div
              className='dropdown-btn'
              onClick={() => setIsActive(!isActive)}
            >
              Use Cases
            </div>
            {isActive && (
              <div className='dropdown-content'>
                <div className='dropdown-item'>HR Verification Automation</div>
                <div className='dropdown-item'>Lending (Consumer)</div>
                <div className='dropdown-item'>Employment Screening</div>
                <div className='dropdown-item'>Lending (Business)</div>
              </div>
            )}
          </div>
        )}
        {!verifierLoggedIn && !employerLoggedIn && (
          <div className='nav-btn'>FAQs</div>
        )}
        {!verifierLoggedIn && !employerLoggedIn && (
          <div className='nav-btn'>Contact Us</div>
        )}

        {verifierLoggedIn && (
          <NavLink
            to='/verifier-dashboard'
            className='navLink'
            activeClassName='activeNav'
          >
            Home
          </NavLink>
        )}
        {employerLoggedIn && (
          <NavLink
            to='/employer-dashboard'
            className='navLink'
            activeClassName='activeNav'
          >
            Home
          </NavLink>
        )}

        {verifierLoggedIn && (
          <NavLink
            to='/verifier-profile'
            className='navLink'
            activeClassName='activeNav'
          >
            Profile
          </NavLink>
        )}
        {employerLoggedIn && (
          <NavLink
            to='/employer-profile'
            className='navLink'
            activeClassName='activeNav'
          >
            Profile
          </NavLink>
        )}

        {!verifierLoggedIn && !employerLoggedIn && (
          <NavLink to='/login' className='navLink' activeClassName='activeNav'>
            Log in
          </NavLink>
        )}
        {verifierLoggedIn && (
          <NavLink
            to='/login'
            className='navLink'
            activeClassName='activeNav'
            onClick={handleVerfierLogout}
          >
            Log out
          </NavLink>
        )}
        {employerLoggedIn && (
          <NavLink
            to='/login'
            className='navLink'
            activeClassName='activeNav'
            onClick={handleEmployerLogout}
          >
            Log out
          </NavLink>
        )}
        {!verifierLoggedIn && !employerLoggedIn && (
          <NavLink
            to='/verifier-signup'
            className='navLink'
            activeClassName='activeNav'
          >
            Register
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
