import React from 'react';
import moment from 'moment';
import '../../Styles/AdminSection/VerifierDetailsTable.css';

const EmployerExtractDetailsTable = (props) => {
  const { extracts } = props;

  return (
    <div className='admin-table-container'>
      <div className='admin-rowview'>
        <h2 className='admin-pageTitle'>Employer extract details</h2>
      </div>
      <div className='admin-table-wrapper' id='#scrollBar'>
        <table className='admin-fl-table'>
          <thead>
            <tr>
              <th>Extract batch id</th>
              <th>Employer id</th>
              <th>Extract type</th>
              <th>Employer extract date</th>
              <th>Zynk load date</th>
              <th>Submission type</th>
              <th>Last updated date and time</th>
              <th>Updated by</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {extracts.map((e) => (
              <tr key={e.extract_batch_id}>
                <td>{e.extract_batch_id}</td>
                <td>{e.employer_zynk_id}</td>
                <td>{e.extract_type}</td>
                <td>{moment(e.employer_extract_date).format('DD/MM/YYYY')}</td>
                <td>{e.zynk_load_date}</td>
                <td>{e.submission_type}</td>
                <td>{moment(e.last_update).format('MMM Do YYYY, h:mm a')}</td>
                <td>{e.updated_by ? e.updated_by : 'NA'}</td>
                <td>{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerExtractDetailsTable;
