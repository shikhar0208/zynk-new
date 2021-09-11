import React, { useState, Fragment } from 'react';
import { useHistory} from 'react-router-dom';
import NewVerificationRequest from './NewVerificationRequest';
import VerifierStatusChart from './VerifierStatusChart';
import VerifierPeriodChart from './VerifierPeriodChart';

import '../Styles/VerifierDashboard.css';

const VerifierDashboard = (props) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [zync_id, setzync_id] = useState(null);
  const handleViewDetails = () => {
    setzync_id(props.location.state.verifier_zync_id)
    props.history.push({
      pathname: "/verification-details",
      state: { "verifier_zync_id": zync_id }
    });
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
