import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Popup from './Popup';
import '../Styles/VerifierViewDetails.css';

const VerifierViewDetails = () => {
  const history = useHistory();
  const [isPopup, setIsPopup] = useState(false);

  const handleBackButton = () => {
    history.push('/verifier-dashboard');
  };

  const handleOpenPopup = () => {
    setIsPopup(true);
  };

  const handleClosePopup = () => {
    setIsPopup(false);
  };

  const fields = [
    'Request id',
    'Internal reference',
    'Employer name',
    'Employee name',
    'Verification reason',
    'Request type',
    'Salary range',
    'Status',
    'Employee rejection reason',
    'Creation date',
    'Completion date',
    'Aadhaar number',
    'PAN number',
    'Employee email id',
    'Employee phone no.',
  ];
  const fieldValues = [
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
    'Content 1',
  ];

  return (
    <div className='table-container'>
      <div className='rowview'>
        <h2 className='pageTitle'>Verification request details</h2>
        <button className='backButton' onClick={handleBackButton}>
          Back
        </button>
      </div>
      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Request id</th>
              <th>Internal reference</th>
              <th>Employer name</th>
              <th>Employee name</th>
              <th>Verification reason</th>
              <th>Request type</th>
              <th>Salary range</th>
              <th>Status</th>
              <th>Employee rejection reason</th>
              <th>Creation date</th>
              <th>Completion date</th>
              <th>Aadhaar number</th>
              <th>PAN number</th>
              <th>Employee email id</th>
              <th>Employee phone no.</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={handleOpenPopup}>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
            </tr>
            <tr>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
            </tr>
            <tr>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
            </tr>
            <tr>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
            </tr>
            <tr>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
            </tr>
            <tr>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPopup && (
        <Popup
          fields={fields}
          fieldValues={fieldValues}
          isPopup={isPopup}
          closePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

export default VerifierViewDetails;
