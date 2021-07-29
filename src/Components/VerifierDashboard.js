import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import NewVerificationRequest from './NewVerificationRequest';
import '../Styles/VerifierDashboard.css';

const VerifierDashboard = () => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleViewDetails = () => {
    history.push('/verification-details');
  };

  return (
    <Fragment>
      {isOpen ? (
        <NewVerificationRequest closeModal={handleCloseModal} />
      ) : (
        <div className='dashboard-section'>
          <div className='add-btn'>
            <button onClick={handleOpenModal}>Start new verification</button>
          </div>
          <div className='containerVerifier'>
            <div className='verifier-grid'>
              <h2>Verification Summary (By status)</h2>
              {/* we will add date filter here */}
              <div className='list-section'>
                <div className='list highLight'>
                  <div className='key'>Total</div>
                  <div className='value'>100</div>
                </div>
                <div className='list'>
                  <div className='key'>Payment pending</div>
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
                  <div className='key'>System error</div>
                  <div className='value'>0</div>
                </div>
              </div>
            </div>
            <div className='verifier-grid'>
              <h2>Verification Summary (By verification period)</h2>
              {/* we will add date filter here */}
              <div className='list-section'>
                <div className='list-section'>
                  <div className='list'>
                    <div className='key'>Jun</div>
                    <div className='value'>15</div>
                  </div>
                  <div className='list'>
                    <div className='key'>Feb</div>
                    <div className='value'>10</div>
                  </div>
                  <div className='list'>
                    <div className='key'>Mar</div>
                    <div className='value'>25</div>
                  </div>
                  <div className='list'>
                    <div className='key'>Apr</div>
                    <div className='value'>15</div>
                  </div>
                  <div className='list'>
                    <div className='key'>May</div>
                    <div className='value'>25</div>
                  </div>
                  <div className='list'>
                    <div className='key'>Jun</div>
                    <div className='value'>10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='view-btn'>
            <button onClick={handleViewDetails}>
              View verification details
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VerifierDashboard;
