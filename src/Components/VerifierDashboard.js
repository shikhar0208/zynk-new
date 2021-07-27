import React, { useState, Fragment } from 'react';
import NewVerificationRequest from './NewVerificationRequest';
import '../Styles/VerifierDashboard.css';

const VerifierDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
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
          <div className='container'>
            <div className='grid'>
              <h2>Verifications by status</h2>
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
              <h2>Verifications by period</h2>
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
          <div className='view-btn'>
            <button>View verification details</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VerifierDashboard;
