import React from 'react';
import { useHistory } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import '../../Styles/AdminSection/VerifierDetailsTable.css';

import moment from 'moment';

const EmployerDetailsTable = (props) => {
  const history = useHistory();
  const { employers } = props;

  const findCountryAndState = (emp) => {
    const state = State.getStateByCodeAndCountry(
      emp.business_state,
      emp.business_country
    );
    const country = Country.getCountryByCode(emp.business_country);
    return { state: state, country: country };
  };

  const openForm = () => {
    history.push('/admin/create-employer');
  };

  return (
    <div className='admin-table-container'>
      <div className='admin-employer-header'>
        <h2 className='admin-pageTitle'>Employer details</h2>
        <button className='addNewButton' onClick={openForm}>
          Add new
        </button>
      </div>
      <div className='admin-table-wrapper' id='#scrollBar'>
        <table className='admin-fl-table'>
          <thead>
            <tr>
              <th>Employer id</th>
              <th>Activation date</th>
              <th>Suscription end date</th>
              <th>Auto-renew</th>
              <th>Business name</th>
              <th>Business contact name</th>
              <th>Business email id</th>
              <th>Phone number</th>
              <th>GST</th>
              <th>Address</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Last updated date and time</th>
              <th>Updated by</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((employer) => (
              <tr key={employer.employer_zynk_id}>
                <td>{employer.employer_zynk_id}</td>
                <td>
                  {moment(employer.employer_activation_date).format(
                    'DD/MM/YYYY'
                  )}
                </td>
                <td>
                  {moment(employer.subscription_end_date).format('DD/MM/YYYY')}
                </td>
                <td>{employer.auto_renew === '1' ? 'Yes' : 'No'}</td>
                <td>{employer.business_name}</td>
                <td>{employer.business_contact_name}</td>
                <td>{employer.business_email_id}</td>
                <td>{employer.phone_number}</td>
                <td>{employer.gst}</td>
                <td>{`${employer.business_address_line1} ${employer.business_address_line2}`}</td>
                <td>{findCountryAndState(employer)?.state?.name}</td>
                <td>{employer.business_city}</td>
                <td>{findCountryAndState(employer)?.country?.name}</td>

                <td>{moment(employer.last_update).format('DD/MM/YYYY')}</td>
                <td>{employer.updated_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerDetailsTable;
