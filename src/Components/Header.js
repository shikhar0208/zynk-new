import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div className='header-container'>
      <div>
        {' '}
        <h2 className='brandName' onClick={goToHome}>
          Zynk
        </h2>
      </div>
      <div className='functions'>
        <div className='dropdown'>
          <div className='dropdown-btn' onClick={() => setIsActive(!isActive)}>
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
        <div className='nav-btn'>FAQs</div>
        <div className='nav-btn'>Contact Us</div>
        <NavLink to='/login' className='navLink' activeClassName='activeNav'>
          Log in
        </NavLink>
        <NavLink
          to='/verifier-signup'
          className='navLink'
          activeClassName='activeNav'
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
