import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './Popup';
import {
  verificationReason,
  requestType,
  salaryRange,
  verificationStatus,
} from '../utils/helperFunctions';
import { getEmployerVerifications } from '../redux/actions/EmployerActions';
import { getAllVerifiers } from '../redux/actions/api';
import '../Styles/VerifierViewDetails.css';
import moment from 'moment';

const EmployerViewDetails = (props) => {
  const employer_zynk_id = useSelector(
    (store) => store.employerReducer?.employerData?.employer_zynk_id
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const [isPopup, setIsPopup] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  useEffect(() => {
    if (!boolVal && employer_zynk_id) {
      dispatch(getEmployerVerifications(employer_zynk_id));
      setBoolVal(true);
    }
  }, [boolVal, dispatch, employer_zynk_id]);

  const { verificationDetails } = useSelector((store) => store.employerReducer);

  const handleBackButton = () => {
    history.push('/employer-dashboard');
  };

  const handleOpenPopup = (data) => {
    const values = [
      data.verification_request_id,
      data.verifier_name,
      data.employee_id,
      data.employee_full_name,
      salaryRange[data.salary_range],
      data.verifying_employer ? data.verifying_employer : '',
      verificationReason[data.verification_reason],
      data.status ? verificationStatus[data.status] : 'Null',
      'employee rejection',
      requestType[data.request_type],
      moment(data.verification_creation_date).format('DD/MM/YYYY'),
      data.verification_completion_date
        ? moment(data.verification_completion_date).format('DD/MM/YYYY')
        : 'NA',
    ];
    setFieldValues(values);
    setIsPopup(true);
  };

  const handleClosePopup = () => {
    setIsPopup(false);
  };

  const fields = [
    'Request id',
    'Verifier name',
    'Employee id',
    'Employee name',
    'Salary range',
    'Verifying employer',
    'Verification reason',
    'Status',
    'Employee rejection reason',
    'Request type',
    'Creation date',
    'Completion date',
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
              <th>Verifier name</th>
              <th>Employee id</th>
              <th>Employee name</th>
              <th>Salary range</th>
              <th>Verifying employer</th>
              <th>Verification reason</th>
              <th>Status</th>
              <th>Employee rejection reason</th>
              <th>Request type</th>
              <th>Creation date</th>
              <th>Completion date</th>
            </tr>
          </thead>
          <tbody>
            {verificationDetails.map((row) => (
              <tr onClick={() => handleOpenPopup(row)}>
                <td>{row.verification_request_id}</td>
                <td>{row.verifier_name}</td>
                <td>{row.employee_id}</td>
                <td>{row.employee_full_name}</td>
                <td>{salaryRange[row.salary_range]}</td>
                <td>{row.verifying_employer ? row.verifying_employer : ''}</td>
                <td>{verificationReason[row.verification_reason]}</td>
                <td>{row.status ? verificationStatus[row.status] : 'Null'}</td>
                <td>{''}</td>
                <td>{requestType[row.request_type]}</td>
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

export default EmployerViewDetails;
