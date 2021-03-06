import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { employerLogout } from '../redux/actions/EmployerActions';
import { verifierLogout } from '../redux/actions/VerfierActions';
import { adminLogout } from '../redux/actions/AdminActions';

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
  const adminLoggedIn = useSelector(
    (store) => store.adminReducer.isAuthenticated
  );
  const [isActive, setIsActive] = useState(false);

  const goToHome = () => {
    // window.open('www.zynktech.com')
    window.location.assign('https://www.zynktech.com/');

  };

  const handleVerfierLogout = () => {
    dispatch(verifierLogout());
  };
  const handleEmployerLogout = () => {
    dispatch(employerLogout());
  };
  const handleAdminLogout = () => {
    dispatch(adminLogout());
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

        {adminLoggedIn && (
          <NavLink
            to='/admin/dashboard'
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

        {!verifierLoggedIn && !employerLoggedIn && !adminLoggedIn && (
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
        {adminLoggedIn && (
          <NavLink
            to='/admin/login'
            className='navLink'
            activeClassName='activeNav'
            onClick={handleAdminLogout}
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
        {!verifierLoggedIn && !employerLoggedIn && !adminLoggedIn && (
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
