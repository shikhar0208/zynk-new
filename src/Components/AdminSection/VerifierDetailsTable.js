import axios from 'axios';
import React,{useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import '../../Styles/AdminSection/VerifierDetailsTable.css';


const initialData = {
  employerId: 'abcd123',
  autoRenew: false,
  businessName: 'XYZ',
  businessContactName: 'xyz org',
  activationDate: '20/02/2021',
  subscriptionEnd: '20/02/2022',
  email: 'xyz@gmail.com',
  phoneNumber: '9326541021',
  addressLine1: 'pqr',
  addressLine2: '',
  pincode: '110051',
  country: 'IN',
  state: 'DL',
  city: 'Delhi',
  gstNumber: '12315498',
  newPassword: '',
  confirmPassword: '',
};

const VerifierDetailsTable = () => {
  // const history = useHistory();
    
  useEffect(() => {
    
    axios.post('./all-verifiers')
      .then((res) => {

        /* we get an array of all the  active verifiers. */
        console.log('success');
      }, (e) => {
        console.log(e);
    });

  }, []);

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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifierDetailsTable;
