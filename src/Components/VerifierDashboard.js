import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NewVerificationRequest from './NewVerificationRequest';
import VerifierStatusChart from './VerifierStatusChart';
import VerifierPeriodChart from './VerifierPeriodChart';

import '../Styles/VerifierDashboard.css';

const VerifierDashboard = () => {
  const history = useHistory();
  const { verifier_zynk_id } = useSelector(
    (store) => store.verifierReducer?.verifierData
  );

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
        <NewVerificationRequest
          closeModal={handleCloseModal}
          verifier_zynk_id={verifier_zynk_id}
        />
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
