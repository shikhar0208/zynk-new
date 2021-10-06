import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  verificationReason,
  requestType,
  salaryRange,
  verificationStatus,
} from '../utils/helperFunctions';
import { getVerificationDetails } from '../redux/actions/VerfierActions';
import Popup from './Popup';
import '../Styles/VerifierViewDetails.css';

const VerifierViewDetails = () => {
  const { verifier_zynk_id } = useSelector(
    (store) => store.verifierReducer?.verifierData
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const [isPopup, setIsPopup] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  useEffect(() => {
    if (!boolVal) {
      dispatch(getVerificationDetails(verifier_zynk_id));
      setBoolVal(true);
    }
  }, [boolVal, dispatch, verifier_zynk_id]);

  const { verificationDetails } = useSelector((store) => store.verifierReducer);

  const handleBackButton = () => {
    history.push('/verifier-dashboard');
  };

  const handleOpenPopup = (data) => {
    const values = [
      data.verification_request_id,
      data.internal_reference,
      data.employer_name,
      data.employee_id,
      data.employee_full_name,
      verificationReason[data.verification_reason],
      requestType[data.request_type],
      salaryRange[data.salary_range],
      verificationStatus[data.status],
      'rejectionReason',
      moment(data.verification_creation_date).format('DD/MM/YYYY'),
      data.verification_completion_date
        ? moment(data.verification_completion_date).format('DD/MM/YYYY')
        : 'NA',
      data.aadhar_number,
      data.pan_number,
      // data.employee_email_id,
      // data.employee_phone,
    ];
    setFieldValues(values);
    setIsPopup(true);
  };

  const handleClosePopup = () => {
    setIsPopup(false);
  };

  const fields = [
    'Request id',
    'Internal reference',
    'Employer name',
    'Employee id',
    'Employee name',
    'Verification reason',
    'Request type',
    'Salary range',
    'Status',
    'Employee rejection reason',
    'Creation date',
    'Completion date',
    'Aadhaar number',
    'PAN number',
    // 'Employee email id',
    // 'Employee phone no.',
  ];

  return (
    <div className='table-container'>
      <div className='rowview'>
        <h2 className='pageTitle'>Verification request details</h2>
        <button className='backButton' onClick={handleBackButton}>
          Back
        </button>
      </div>
      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Request id</th>
              <th>Internal reference</th>
              <th>Employer name</th>
              <th>Employee id</th>
              <th>Employee name</th>
              <th>Verification reason</th>
              <th>Verifying employer</th>
              <th>Request type</th>
              <th>Salary range</th>
              <th>Status</th>
              <th>Employee rejection reason</th>
              <th>Creation date</th>
              <th>Completion date</th>
              <th>Aadhaar number</th>
              <th>PAN number</th>
              {/*<th>Employee email id</th>
              <th>Employee phone no.</th> */}
            </tr>
          </thead>
          <tbody>
            {verificationDetails.map((row) => (
              <tr
                onClick={() => handleOpenPopup(row)}
                key={row.verification_request_id}
              >
                <td>{row.verification_request_id}</td>
                <td>{row.internal_reference}</td>
                <td>{row.employer_name}</td>
                <td>{row.employee_id}</td>
                <td>{row.employee_full_name}</td>
                <td>{verificationReason[row.verification_reason]}</td>
                <td>{row.verifying_employer}</td>
                <td>{requestType[row.request_type]}</td>
                <td>{salaryRange[row.salary_range]}</td>
                <td>{verificationStatus[row.status]}</td>
                <td>
                  {row.employee_rejection_reason
                    ? row.employee_rejection_reason
                    : 'NULL'}
                </td>
                <td>
                  {moment(row.verification_creation_date).format('DD/MM/YYYY')}
                </td>
                <td>
                  {row.verification_completion_date
                    ? moment(row.verification_completion_date).format(
                        'DD/MM/YYYY'
                      )
                    : 'NA'}
                </td>
                <td>{row.aadhar_number}</td>
                <td>{row.pan_number}</td>
                {/**<td>{row.employee_email_id}</td>
                <td>{row.employee_phone}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopup && (
        <Popup
          fields={fields}
          fieldValues={fieldValues}
          isPopup={isPopup}
          closePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

export default VerifierViewDetails;
