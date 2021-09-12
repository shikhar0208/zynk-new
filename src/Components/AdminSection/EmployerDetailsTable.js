import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import '../../Styles/AdminSection/VerifierDetailsTable.css';
import axios from 'axios'
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

const EmployerDetailsTable = () => {
  const history = useHistory();

  const openForm = () => {
    history.push('/admin/create-employer');
  };

  useEffect(() => {
    
    axios.post('./all-employers')
      .then((res) => {
        
        /* we get an array of all the  active employers. */
        console.log('success');
      }, (e) => {
        console.log(e);
    });

  }, []);

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
              <th>Address - line 1</th>
              <th>Address - line 2</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>GST</th>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerDetailsTable;
