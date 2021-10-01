import React from 'react';
import moment from 'moment';
import { verificationStatus } from '../../utils/helperFunctions';
import '../../Styles/AdminSection/VerifierDetailsTable.css';

const VerificationRequestStatusTable = (props) => {
  const { requestStatus } = props;
  return (
    <div className='admin-table-container'>
      <div className='admin-rowview'>
        <h2 className='admin-pageTitle'>Verification request status</h2>
      </div>
      <div className='admin-table-wrapper' id='#scrollBar'>
        <table className='admin-fl-table'>
          <thead>
            <tr>
              <th>Request id</th>
              <th>Status</th>
              <th>Employee rejection reason</th>
              <th>Last updated date and time</th>
              <th>Updated by</th>
            </tr>
          </thead>
          <tbody>
            {requestStatus.map((req) => (
              <tr key={req.verification_request_id}>
                <td>{req.verification_request_id}</td>
                <td>{verificationStatus[req.status]}</td>
                <td>
                  {req.employee_rejection_reason
                    ? req.employee_rejection_reason
                    : 'NULL'}
                </td>
                <td>{moment(req.last_update).format('MMM Do YYYY, h:mm a')}</td>
                <td>{req.updated_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequestStatusTable;
