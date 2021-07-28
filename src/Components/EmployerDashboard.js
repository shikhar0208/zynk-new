import React from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/EmployerDashboard.css';

const EmployerDashboard = () => {
  const history = useHistory();

  const handleViewDetails = () => {
    history.push('/employer-verification-details');
  };

  return (
    <div className='dashboard-section'>
      <div className='upload-btn'>
        <button>Upload verification details</button>
      </div>
      <div className='horizontal-line'></div>
      <div className='subsection'>
        <div className='numbers'>
          <div className='propName'>Number of verifications (2021)</div>
          <div className='propValue'>100</div>
        </div>
        <div className='view-detail-btn'>
          <button onClick={handleViewDetails}>View details</button>
        </div>
      </div>
      <div className='horizontal-line'></div>
      <div className='container'>
        <div className='grid'>
          <h2>Verification breakdown</h2>
          {/* we will add date filter here */}
          <div className='list-section'>
            <div className='list highLight'>
              <div className='key'>Total</div>
              <div className='value'>100</div>
            </div>
            <div className='list'>
              <div className='key'>Payment Pending</div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Under processing</div>
              <div className='value'>0</div>
            </div>
            <div className='list'>
              <div className='key'>
                Employee record not found for specified employer
              </div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Pending employee approval</div>
              <div className='value'>8</div>
            </div>
            <div className='list'>
              <div className='key'>
                Verification request declined by the employee
              </div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Employer discrepancy - On Hold</div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Verification report shared</div>
              <div className='value'>88</div>
            </div>
            <div className='list'>
              <div className='key'>System Error</div>
              <div className='value'>0</div>
            </div>
          </div>
        </div>
        <div className='grid'>
          <h2>Verification breakdown</h2>
          {/* we will add date filter here */}
          <div className='list-section'>
            <div className='list highLight'>
              <div className='key'>Total</div>
              <div className='value'>100</div>
            </div>
            <div className='list'>
              <div className='key'>Payment Pending</div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Under processing</div>
              <div className='value'>0</div>
            </div>
            <div className='list'>
              <div className='key'>
                Employee record not found for specified employer
              </div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Pending employee approval</div>
              <div className='value'>8</div>
            </div>
            <div className='list'>
              <div className='key'>
                Verification request declined by the employee
              </div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Employer discrepancy - On Hold</div>
              <div className='value'>1</div>
            </div>
            <div className='list'>
              <div className='key'>Verification report shared</div>
              <div className='value'>88</div>
            </div>
            <div className='list'>
              <div className='key'>System Error</div>
              <div className='value'>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
