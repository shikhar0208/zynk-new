import React, { useEffect } from 'react';
import '../../Styles/AdminDashboard.css';
import VerifierDetailsTable from './VerifierDetailsTable';
import EmployerDetailsTable from './EmployerDetailsTable';
import VerificationRequestDetailTable from './VerificationRequestDetailTable';
import VerificationRequestStatusTable from './VerificationRequestStatusTable';
import EmployerExtractDetailsTable from './EmployerExtractDetailsTable';
import axios from 'axios';

const AdminDashboard = () => {
  var verification_requests=0, pending_verification_requests=0, verifiers=0, employers=0;
  useEffect(() => {
    axios.post('./admin-stats')
      .then((res) => (
        verification_requests = res.data.verification_requests,
          pending_verification_requests = res.data.pending_verification_requests,
          verifiers = res.data.verifiers,
          employers = res.data.employers
      ), (error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='admin-dashboard-section'>
      <div className='admin-dashboard-subsection'>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of verification request</div>
          <div className='propValue'>{verification_requests}</div>
        </div>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>
            Number of verification request under processing
          </div>
          <div className='propValue'>{pending_verification_requests}</div>
        </div>
      </div>
      <div className='admin-dashboard-subsection'>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of verifiers</div>
          <div className='propValue'>{verifiers}</div>
        </div>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of employers</div>
          <div className='propValue'>{employers}</div>
        </div>
      </div>
      <div className='partition-line'></div>
      <VerifierDetailsTable />
      <EmployerDetailsTable />
      <VerificationRequestDetailTable />
      <VerificationRequestStatusTable />
      <EmployerExtractDetailsTable />
    </div>
  );
};

export default AdminDashboard;
