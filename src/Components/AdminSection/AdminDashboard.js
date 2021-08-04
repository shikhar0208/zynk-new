import React, { Fragment, useState } from 'react';
import '../../Styles/AdminDashboard.css';
import VerifierDetailsTable from './VerifierDetailsTable';
import EmployerDetailsTable from './EmployerDetailsTable';
import VerificationRequestDetailTable from './VerificationRequestDetailTable';
import VerificationRequestStatusTable from './VerificationRequestStatusTable';
import EmployerExtractDetailsTable from './EmployerExtractDetailsTable';
import NewEmployerForm from './NewEmployerForm';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      {isOpen ? (
        <NewEmployerForm handleCloseForm={handleCloseForm} />
      ) : (
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
          <EmployerDetailsTable handleOpenForm={handleOpenForm} />
          <VerificationRequestDetailTable />
          <VerificationRequestStatusTable />
          <EmployerExtractDetailsTable />
        </div>
      )}
    </Fragment>
  );
};

export default AdminDashboard;
