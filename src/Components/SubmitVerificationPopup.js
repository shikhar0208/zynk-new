import React from 'react';
import '../Styles/SubmitVerificationPopup.css';

const SubmitVerificationPopup = (props) => {
  const { closePopup } = props;
  return (
    <div className='verification-popup-container'>
      <div className='verification-popup-grid'>
        <h2>Note your verification request id</h2>
        <p>Verification request id: 46</p>
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
