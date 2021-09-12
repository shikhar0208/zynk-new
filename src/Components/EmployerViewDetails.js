import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Popup from './Popup';
import '../Styles/VerifierViewDetails.css';
import axios from 'axios';

const EmployerViewDetails = (props) => {
  const {employer_zync_id} = (props.location && props.location.state) || {};
  const history = useHistory();

  const [isPopup, setIsPopup] = useState(false);

  const handleBackButton = () => {
    history.push('/employer-dashboard');
  };

  const handleOpenPopup = () => {
    setIsPopup(true);
  };

  const handleClosePopup = () => {
    setIsPopup(false);
  };

  const fields = [
    'Request id',
    'Verifier name',
    'Employee id',
    'Employee name',
    'Salary range',
    'Verifying employer',
    'Status',
    'Employee rejection reason',
    'Request type',
    'Creation date',
    'Completion date',
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
  ];

  useEffect((e) => {
    
    /* will be executed once when the component is rendered. */
    axios.post('/get-all-verifications-employer', {
      "employer_zynk_id": employer_zync_id
    })
      .then((response) => {
              /* response.data = array of verification requests for this particular employer */   
              console.log('success');
      }, (errors) => {
        console.log(errors);
      });
    
  }, []);

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
              <th>Verifier name</th>
              <th>Employee id</th>
              <th>Employee name</th>
              <th>Salary range</th>
              <th>Verifying employer</th>
              <th>Verification reason</th>
              <th>Status</th>
              <th>Employee rejection reason</th>
              <th>Request type</th>
              <th>Creation date</th>
              <th>Completion date</th>
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

export default EmployerViewDetails;
