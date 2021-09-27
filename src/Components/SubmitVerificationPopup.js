import React from 'react';
import '../Styles/SubmitVerificationPopup.css';

const SubmitVerificationPopup = (props) => {
  const { closePopup, verification_id } = props;
  return (
    <div className='verification-popup-container'>
      <div className='verification-popup-grid'>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          Request has been received. Response will be emailed to you.
          Verification request id - {verification_id}
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

export default SubmitVerificationPopup;
