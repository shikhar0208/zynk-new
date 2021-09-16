import React from 'react';
import moment from 'moment';
import {
  verificationReason,
  requestType,
  salaryRange,
} from '../../utils/helperFunctions';
import '../../Styles/AdminSection/VerifierDetailsTable.css';

const VerificationRequestDetailTable = (props) => {
  const { requestDetails } = props;
  return (
    <div className='admin-table-container'>
      <div className='admin-rowview'>
        <h2 className='admin-pageTitle'>Verification request details</h2>
      </div>
      <div className='admin-table-wrapper' id='#scrollBar'>
        <table className='admin-fl-table'>
          <thead>
            <tr>
              <th>Request id</th>
              <th>Verifier id</th>
              <th>Employer id</th>
              <th>Creation date</th>
              <th>Completion date</th>
              <th>Employee full name</th>
              <th>Aadhaar number</th>
              <th>PAN number</th>
              <th>Employee email</th>
              <th>Employee phone</th>
              <th>Internal reference</th>
              <th>Request type</th>
              <th>Salary range</th>
              <th>Verification reason</th>
              <th>Employee id</th>
              <th>Tentative employment start date</th>
              <th>Tentative employment end date</th>
              <th>Last updated date and time</th>
              <th>Updated by</th>
              <th>Verifying employer</th>
            </tr>
          </thead>
          <tbody>
            {requestDetails.map((req) => (
              <tr key={req.verification_request_id}>
                <td>{req.verification_request_id}</td>
                <td>{req.verifier_zynk_id}</td>
                <td>{req.employer_zynk_id}</td>
                <td>
                  {req.verification_creation_date
                    ? moment(req.verification_creation_date).format(
                        'DD/MM/YYYY'
                      )
                    : 'NA'}
                </td>
                <td>
                  {req.verification_completion_date
                    ? moment(req.verification_completion_date).format(
                        'DD/MM/YYYY'
                      )
                    : 'NA'}
                </td>
                <td>{req.employee_full_name}</td>
                <td>{req.aadhar_number}</td>
                <td>{req.pan_number}</td>
                <td>{req.employee_email_id}</td>
                <td>{req.employee_phone}</td>
                <td>{req.internal_reference}</td>
                <td>{requestType[req.request_type]}</td>
                <td>{salaryRange[req.salary_range]}</td>
                <td>{verificationReason[req.verification_reason]}</td>
                <td>{req.employee_id}</td>
                <td>{'content'}</td>
                <td>{'content'}</td>
                <td>{moment(req.last_update).format('MMM Do YYYY, h:mm a')}</td>
                <td>{req.updated_by}</td>
                <td>
                  {req.verifying_employer ? req.verifying_employer : 'NA'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequestDetailTable;
