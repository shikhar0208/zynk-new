import React from 'react';

import moment from 'moment';
import '../../Styles/AdminSection/VerifierDetailsTable.css';

const VerifierDetailsTable = (props) => {
  const { verifiers } = props;
  return (
    <div className='admin-table-container'>
      <div className='admin-rowview'>
        <h2 className='admin-pageTitle'>Verifier details</h2>
      </div>
      <div className='admin-table-wrapper' id='#scrollBar'>
        <table className='admin-fl-table'>
          <thead>
            <tr>
              <th>Verifier id</th>
              <th>Date of registration</th>
              <th>Entity type</th>
              <th>Verifier name</th>
              <th>Business contact name</th>
              <th>Email id</th>
              <th>Phone number</th>
              <th>Govt. id type</th>
              <th>Govt. id number</th>
              <th>Creation date</th>
              <th>Completion date</th>
              <th>Aadhaar number</th>
              <th>PAN number</th>
              <th>Employee email id</th>
              <th>Employee phone no.</th>
            </tr>
          </thead>
          <tbody>
            {verifiers.map((verifier) => (
              <tr key={verifier.verifier_zynk_id}>
                <td>{verifier.verifier_zynk_id}</td>
                <td>{moment(verifier.date_of_reg).format('DD/MM/YYYY')}</td>
                <td>
                  {verifier.entity_type === 'I' ? 'Individual' : 'Business'}
                </td>
                <td>{'name'}</td>
                <td>{verifier.business_contact_name}</td>
                <td>
                  {verifier.email_id.length <= 30
                    ? verifier.email_id
                    : `${verifier.email_id.substring(0, 25)}...`}
                </td>
                <td>{'phone_number'}</td>
                <td>{verifier.govt_id_type}</td>
                <td>{'id number'}</td>
                <td>{'creation date'}</td>
                <td>{'completion date'}</td>
                <td>{'aadhaar number'}</td>
                <td>{'pan number'}</td>
                <td>{'employee email id'}</td>
                <td>{'employee phone'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifierDetailsTable;
