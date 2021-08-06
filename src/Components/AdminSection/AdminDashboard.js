import React from 'react';
import '../../Styles/AdminDashboard.css';
import VerifierDetailsTable from './VerifierDetailsTable';
import EmployerDetailsTable from './EmployerDetailsTable';
import VerificationRequestDetailTable from './VerificationRequestDetailTable';
import VerificationRequestStatusTable from './VerificationRequestStatusTable';
import EmployerExtractDetailsTable from './EmployerExtractDetailsTable';

const AdminDashboard = () => {
  return (
    <div className='admin-dashboard-section'>
      <div className='admin-dashboard-subsection'>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of verification request</div>
          <div className='propValue'>80</div>
        </div>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>
            Number of verification request under processing
          </div>
          <div className='propValue'>50</div>
        </div>
      </div>
      <div className='admin-dashboard-subsection'>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of verifiers</div>
          <div className='propValue'>30</div>
        </div>
        <div className='admin-dashboard-numbers'>
          <div className='propName'>Number of employers</div>
          <div className='propValue'>10</div>
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