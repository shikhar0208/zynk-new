import React from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/VerifierViewDetails.css';

const VerifierViewDetails = () => {
  const history = useHistory();

  const handleBackButton = () => {
    history.push('/verifier-dashboard');
  };

  return (
    <div className='table-container'>
      <div className='rowview'>
        <h2 className='pageTitle'>Verification Request Details</h2>
        <button className='backButton' onClick={handleBackButton}>
          Back
        </button>
      </div>
      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Request Id</th>
              <th>Internal Reference</th>
              <th>Employer Name</th>
              <th>Employee Name</th>
              <th>Verification Reason</th>
              <th>Request Type</th>
              <th>Salary Range</th>
              <th>Status</th>
              <th>Employee Rejection Reason</th>
              <th>Creation Date</th>
              <th>Completion Date</th>
              <th>Aadhaar Number</th>
              <th>Pan Number</th>
              <th>Employee Email Id</th>
              <th>Employee Phone no.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
    </div>
  );
};

export default VerifierViewDetails;
