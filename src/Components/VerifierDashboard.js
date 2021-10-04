import React, { useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVerificationDetails } from '../redux/actions/VerfierActions';
import NewVerificationRequest from './NewVerificationRequest';
import VerifierStatusChart from './VerifierStatusChart';
import VerifierPeriodChart from './VerifierPeriodChart';

import '../Styles/VerifierDashboard.css';
import { getVerificationSummaryByStatus } from '../redux/actions/api';

const VerifierDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const verifier_zynk_id = useSelector(
    (store) => store.verifierReducer?.verifierData?.verifier_zynk_id
  );

  const [isOpen, setIsOpen] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [statusSummary, setStatusSummary] = useState({});
  const [monthData, setMonthData] = useState([]);
  const [monthsArray, setMonthsArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getVerificationSummaryByStatus(verifier_zynk_id);
      setStatusSummary(data);
    };
    const countMonthly = (res) => {
      let months = new Array(12).fill(0);
      let temp = new Array(12).fill(0);
      var left = new Date().getMonth() + 1;
      var right = 0;

      for (let i = 0; i < 12; i++) {
        if (left <= 11) {
          temp[i] = left;
          left++;
        } else {
          temp[i] = right;
          right++;
        }
      }

      setMonthsArray(temp);

      res.forEach((ele) => {
        let index;
        if (
          new Date(ele.verification_creation_date).getFullYear() <
          new Date().getFullYear()
        ) {
          if (
            new Date(ele.verification_creation_date).getMonth() >
            new Date().getMonth()
          ) {
            index = temp.indexOf(
              new Date(ele.verification_creation_date).getMonth()
            );
            months[index] += 1;
          }
        } else if (
          new Date(ele.verification_creation_date).getFullYear() ===
          new Date().getFullYear()
        ) {
          if (
            new Date(ele.verification_creation_date).getMonth() <=
            new Date().getMonth()
          ) {
            index = temp.indexOf(
              new Date(ele.verification_creation_date).getMonth()
            );
            months[index] += 1;
          }
        }
      });

      setMonthData(months);
    };

    if (!boolVal && verifier_zynk_id) {
      fetchData();
      dispatch(getVerificationDetails(verifier_zynk_id)).then((res) =>
        countMonthly(res)
      );
      setBoolVal(true);
    }
  }, [boolVal, verifier_zynk_id, dispatch]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleViewDetails = () => {
    history.push('/verification-details');
  };

  return (
    <Fragment>
      {isOpen ? (
        <NewVerificationRequest
          closeModal={handleCloseModal}
          setBoolVal={setBoolVal}
        />
      ) : (
        <div className='dashboard-section'>
          <div className='add-btn'>
            <button onClick={handleOpenModal}>Start new verification</button>
          </div>
          <div className='containerVerifier'>
            <div className='verifier-charts-div'>
              {/*<PieChart1 />*/}
              <VerifierStatusChart status={statusSummary} />
            </div>
            <div className='verifier-charts-div'>
              {/*<PieChart2 />*/}

              <VerifierPeriodChart
                details={monthData}
                monthsArray={monthsArray}
              />
            </div>
          </div>
          <div className='view-btn'>
            <button onClick={handleViewDetails}>
              View verification details
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VerifierDashboard;
