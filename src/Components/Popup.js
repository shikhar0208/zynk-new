import React from 'react';
// import { useHistory } from 'react-router-dom';
import '../Styles/Popup.css';

const Popup = (props) => {
  const { fields, fieldValues } = props;
  return (
    <div className='popupContainer' onClick={props.closePopup}>
      <div className='popup-grid'>
        <h2>Verification request details</h2>
        {/* we will add date filter here */}
        <div className='popup-list-section'>
          {fields.map((field, i) => (
            <div className='popup-list'>
              <div className='key'>{field}</div>
              <div className='value'>{fieldValues[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
