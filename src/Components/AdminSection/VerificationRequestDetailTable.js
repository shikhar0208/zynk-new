import React,{useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import '../../Styles/AdminSection/VerifierDetailsTable.css';
import axios from 'axios';
const initialData = {
        verification_request_id: 'abcd123',
        verifier_zynk_id: 1, 
        employer_zynk_id: 1, 
        verification_creation_date: "2021-08-19T18:30:00.000Z", 
        verification_completion_date: null, 
        employee_id: "11", 
        employee_full_name: "Shikhar Rastogi", 
        aadhar_number: "123456789012", 
        pan_number: "AAJPM1688J", 
        employee_email_id: "shikhar.rastogi@gmail.com", 
        employee_phone: "9812345678", 
        internal_reference: "Loan for Kia Sonet", 
        request_type: "I", 
        salary_range: "1", 
        verification_reason: "2", 
        report_url: null, 
        verifying_employer: null, 
        last_update: "2021-08-19T19:29:33.000Z", 
        updated_by: "admin" 
};

const VerificationRequestDetailTable = () => {
  // const history = useHistory();
  
  useEffect(() => {
    
    axios.post('./all-verification-requests')
      .then((res) => {
        
        /* we get an array of all the  verification requests. */
        /* for all the values in the initial data , create a row for each request */

        console.log('success');
      }, (e) => {
        console.log(e);
    });

  }, []);


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
            <tr>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
            </tr>
            <tr>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
            </tr>
            <tr>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
            </tr>
            <tr>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
            </tr>
            <tr>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
            </tr>
            <tr>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequestDetailTable;
