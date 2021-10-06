import React from 'react';
import moment from 'moment';
import { Country, State, City } from 'country-state-city';
import { idType } from '../../utils/helperFunctions';

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
              <th>Account Validation</th>
              <th>Business contact name</th>
              <th>Address</th>
              <th>Email id</th>
              <th>Phone number</th>
              <th>Govt. id type</th>
              <th>Govt. id number</th>
              <th>Govt. id attachment</th>
              <th>Creation date</th>
              <th>Completion date</th>
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
                <td>{verifier.verifier_name}</td>
                <td>{verifier.isapproved === 1 ? 'Approved' : 'Pending'}</td>
                <td>{verifier.business_contact_name}</td>
                <td>{`${verifier.verifier_address_line1} ${
                  verifier.verifier_address_line2
                }, ${
                  Country.getCountryByCode(verifier.verifier_country).name
                    ? Country.getCountryByCode(verifier.verifier_country).name
                    : verifier.verifier_country
                }, ${
                  State.getStateByCodeAndCountry(
                    verifier.verifier_state,
                    verifier.verifier_country
                  ).name
                    ? State.getStateByCodeAndCountry(
                        verifier.verifier_state,
                        verifier.verifier_country
                      ).name
                    : verifier.verifier_state
                }, ${verifier.verifier_city} ${verifier.verifier_pincode}`}</td>
                <td>
                  {verifier.email_id.length <= 30
                    ? verifier.email_id
                    : `${verifier.email_id.substring(0, 25)}...`}
                </td>
                <td>{verifier.phone_number}</td>
                <td>{idType[verifier.govt_id_type]}</td>
                <td>{verifier.govt_id_number}</td>
                <td>
                  <a
                    href={`https://zyncbackend.herokuapp.com/download-attachment/${verifier.govt_id_attachment}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Click to view
                  </a>
                </td>
                <td>{'creation date'}</td>
                <td>{'completion date'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifierDetailsTable;
