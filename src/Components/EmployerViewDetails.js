import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './Popup';
import {
  verificationReason,
  requestType,
  salaryRange,
} from '../utils/helperFunctions';
import { getEmployerVerifications } from '../redux/actions/EmployerActions';
import { getAllVerifiers } from '../redux/actions/api';
import '../Styles/VerifierViewDetails.css';
import moment from 'moment';

const EmployerViewDetails = (props) => {
  const { employer_zynk_id } = useSelector(
    (store) => store.employerReducer?.employerData
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const [verifiers, setVerifiers] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  useEffect(() => {
    const getVerifiers = async () => {
      const res = await getAllVerifiers();
      setVerifiers(res.data);
    };
    if (!boolVal) {
      dispatch(getEmployerVerifications(employer_zynk_id));
      getVerifiers();
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
      'verifier name',
      data.employee_id,
      data.employee_full_name,
      salaryRange[data.salary_range],
      data.verifying_employer,
      verificationReason[data.verification_reason],
      'status',
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

  const findVerifierName = (verifierId) => {
    const verifier = verifiers.filter((v) => v.verifier_zynk_id === verifierId);
    return verifier.verifier_name;
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
                <td>{'content'}</td>
                <td>{row.employee_id}</td>
                <td>{row.employee_full_name}</td>
                <td>{salaryRange[row.salary_range]}</td>
                <td>
                  {row.verifying_employer ? row.verifying_employer : 'Null'}
                </td>
                <td>{verificationReason[row.verification_reason]}</td>
                <td>{'content'}</td>
                <td>{'content'}</td>
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
