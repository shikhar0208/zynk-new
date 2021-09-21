import React from 'react';
import '../Styles/SubmitVerificationPopup.css';

const VerifierSignupPopup = (props) => {
  const { closePopup } = props;
  return (
    <div className='verification-popup-container'>
      <div className='verification-popup-grid'>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          Please click on link sent to your email to proceed further
        </p>
        <div className='verification-buttonDiv'>
          <button
            className='verification-submitButton activeButton'
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifierSignupPopup;
