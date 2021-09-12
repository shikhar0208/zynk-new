import React, { useState, Fragment } from 'react';
import NewVerificationRequest from './NewVerificationRequest';
import VerifierStatusChart from './VerifierStatusChart';
import VerifierPeriodChart from './VerifierPeriodChart';

import '../Styles/VerifierDashboard.css';

const VerifierDashboard = props => {

  const { verifier_zync_id } = (props.location && props.location.state) || {};
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [state, setstate] = useState(verifier_zync_id);
  const handleViewDetails = () => {
           
    props.history.push({
      pathname: "./verification-details",
      state
    });

  };

  return (
    <Fragment>
      {isOpen ? (
        <NewVerificationRequest closeModal={handleCloseModal} verifier_zync_id={verifier_zync_id} />
      ) : (
        <div className='dashboard-section'>
          <div className='add-btn'>
            <button onClick={handleOpenModal}>Start new verification</button>
          </div>
          <div className='containerVerifier'>
            <div className='verifier-charts-div'>
              {/*<PieChart1 />*/}
              <VerifierStatusChart />
            </div>
            <div className='verifier-charts-div'>
              {/*<PieChart2 />*/}

              <VerifierPeriodChart />
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
