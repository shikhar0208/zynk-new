import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../Styles/AdminDashboard.css';
import { getAllEmployers } from '../../redux/actions/AdminActions';
import VerifierDetailsTable from './VerifierDetailsTable';
import EmployerDetailsTable from './EmployerDetailsTable';
import VerificationRequestDetailTable from './VerificationRequestDetailTable';
import VerificationRequestStatusTable from './VerificationRequestStatusTable';
import EmployerExtractDetailsTable from './EmployerExtractDetailsTable';

const AdminDashboard = () => {
  const {
    adminStats,
    verifiersData,
    employersData,
    verificationRequestDetails,
    verificationRequestStatus,
    employerExtractDetails,
    isAuthenticated,
  } = useSelector((store) => store.adminReducer);
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    verification_requests: 0,
    pending_verification_requests: 0,
    verifiers: 0,
    employers: 0,
  });
  const [boolVal, setBoolVal] = useState(false);

  useEffect(() => {
    if (!boolVal && isAuthenticated) {
      dispatch(getAllEmployers());
      setStats(adminStats);
      setBoolVal(true);
    }
  }, [boolVal, dispatch, isAuthenticated, stats]);

  return (
    <div className='admin-dashboard-section'>
      <div className='admin-dashboard-subsection'>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of verification request</div>
          <div className='propValue'>{stats?.verification_requests}</div>
        </div>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>
            Number of verification request under processing
          </div>
          <div className='propValue'>
            {stats?.pending_verification_requests}
          </div>
        </div>
      </div>
      <div className='admin-dashboard-subsection'>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of verifiers</div>
          <div className='propValue'>{stats?.verifiers}</div>
        </div>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of employers</div>
          <div className='propValue'>{stats?.employers}</div>
        </div>
      </div>
      <div className='partition-line'></div>
      <VerifierDetailsTable verifiers={verifiersData} />
      <EmployerDetailsTable employers={employersData} />
      <VerificationRequestDetailTable
        requestDetails={verificationRequestDetails}
      />
      <VerificationRequestStatusTable
        requestStatus={verificationRequestStatus}
      />
      <EmployerExtractDetailsTable extracts={employerExtractDetails} />
    </div>
  );
};

export default AdminDashboard;
