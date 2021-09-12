import React,{useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import '../../Styles/AdminSection/VerifierDetailsTable.css';
import axios from 'axios'
const initialData = {
        verification_request_id: 8, 
        status: "1", 
        employee_rejection_reason: null, 
        last_update: "2021-08-21T19:45:17.000Z", 
        updated_by: "admin", 
        verifier_zynk_id:1
}

const VerificationRequestStatusTable = () => {
  // const history = useHistory();
  useEffect(() => {
    
    axios.post('./all-verification-statuses')
      .then((res) => {
        
        /* we get an array of all the  verification requests statuses */
        /* for all the values in the initial data , create a row for each request */

        console.log('success');
      }, (e) => {
        console.log(e);
    });

  }, []);

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
            <tr>
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
            </tr>
            <tr>
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
            </tr>
            <tr>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequestStatusTable;
