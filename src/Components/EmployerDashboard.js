import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../Styles/EmployerDashboard.css';
import closeButton from '../images/closeButton.svg';
import proceedButton from '../images/proceedButton.svg';
import {
  getVerificationSummaryByReason,
  getBusinessUnitSummary,
  getVerificationSummaryByDate,
  getBusinessUnitSummaryByDate,
} from '../redux/actions/api';
import { getEmployerVerifications } from '../redux/actions/EmployerActions';

import EmployerReasonChart from './EmployerReasonChart';
import EmployerPeriodChart from './EmployerPeriodChart';
import EmployerBusinessUnitWiseChart from './EmployerBusinessUnitWiseChart';

const EmployerDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const employer_zynk_id = useSelector(
    (store) => store.employerReducer?.employerData?.employer_zynk_id
  );
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [enterFilter, setEnterFilter] = useState(false);

  const [boolVal, setBoolVal] = useState(false);
  const [reasonSummary, setReasonSummary] = useState({});
  const [businessUnitLabels, setBusinessUnitLabel] = useState([]);
  const [businessUnit, setBusinessUnit] = useState({});
  // const [allReasonSummary, setAllReasonSummary] = useState({});
  const [monthData, setMonthData] = useState([]);
  const [monthsArray, setMonthsArray] = useState([]);

  const [totalVerifications, setTotalVerifications] = useState(0);
  const [filteredSummaryByDate, setFilteredSummaryByDate] = useState({});
  const [filteredLabels, setFilteredLabel] = useState([]);
  const [filteredBusinessUnit, setFilteredBusinessUnit] = useState({});

  // const [filteredSummary, setFilteredSummary] = useState({});

  useEffect(() => {
    const countVerifications = (data) => {
      var total = 0;
      if (data.CreditApplication) {
        total += data.CreditApplication;
      }
      if (data.CreditReverification) {
        total += data.CreditReverification;
      }
      if (data.PreEmploymentScreening) {
        total += data.PreEmploymentScreening;
      }
      if (data.PropertyRental) {
        total += data.PropertyRental;
      }
      if (data.VisaApplication) {
        total += data.VisaApplication;
      }
      if (data.InsuranceApplication) {
        total += data.InsuranceApplication;
      }
      if (data.Other) {
        total += data.Other;
      }
      setTotalVerifications(total);
    };

    const countMonthly = (res) => {
      let months = new Array(12).fill(0);
      // res.forEach((ele) => {
      //   months[new Date(ele.verification_creation_date).getMonth()] += 1;
      // });

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

      // console.log(res);
    };

    const fetchData = async () => {
      const { data } = await getVerificationSummaryByReason(employer_zynk_id);
      const response = await getBusinessUnitSummary(employer_zynk_id);
      const bLabels =
        Object.keys(response.data).length === 0
          ? ['No data']
          : Object.keys(response.data);
      let summaryData = [];
      if (Object.keys(response.data).length !== 0) {
        bLabels?.forEach((element) => {
          summaryData.push(response.data[element]);
        });
      } else {
        summaryData.push(0);
      }
      setBusinessUnitLabel(bLabels);
      setBusinessUnit(summaryData);
      setFilteredLabel(bLabels);
      setFilteredBusinessUnit(summaryData);
      setReasonSummary(data);
      setFilteredSummaryByDate(data);
      countVerifications(data);
    };
    if (!boolVal && employer_zynk_id) {
      fetchData();
      dispatch(getEmployerVerifications(employer_zynk_id)).then((res) =>
        countMonthly(res)
      );
      setBoolVal(true);
    }
  }, [boolVal, employer_zynk_id, dispatch]);

  const handleViewDetails = () => {
    history.push('/employer-verification-details');
  };

  const handleUploadDetails = () => {
    history.push('/upload-details');
  };

  const handleStartDateChange = (e) => {
    // console.log(new Date(e.target.value));
    setEnterFilter(false);
    setDateRange({ ...dateRange, startDate: e.target.value });
  };

  const handleEndDateChange = (e) => {
    // console.log(new Date(e.target.value));
    setEnterFilter(false);
    setDateRange({ ...dateRange, endDate: e.target.value });
  };

  const handleSetDate = async () => {
    // console.log(dateRange);
    if (dateRange.startDate !== '' && dateRange.endDate !== '') {
      try {
        const { data } = await getVerificationSummaryByDate({
          employer_zynk_id,
          startDate: new Date(dateRange.startDate),
          endDate: new Date(dateRange.endDate),
        });
        setFilteredSummaryByDate(data);
        const res = await getBusinessUnitSummaryByDate({
          employer_zynk_id,
          startDate: new Date(dateRange.startDate),
          endDate: new Date(dateRange.endDate),
        });
        console.log(res);
        const bLabels =
          Object.keys(res.data).length === 0
            ? ['No data']
            : Object.keys(res.data);
        let summaryData = [];
        if (Object.keys(res.data).length !== 0) {
          bLabels?.forEach((element) => {
            summaryData.push(res.data[element]);
          });
        } else {
          summaryData.push(0);
        }
        setFilteredLabel(bLabels);
        setFilteredBusinessUnit(summaryData);

        setEnterFilter(true);
      } catch (err) {
        console.log(err.response);
      }
    } else {
      alert('Select start and end date');
    }
  };

  const handleCancelDate = () => {
    setDateRange({ startDate: '', endDate: '' });
    setFilteredSummaryByDate(reasonSummary);
    setFilteredLabel(businessUnitLabels);
    setFilteredBusinessUnit(businessUnit);
    setEnterFilter(false);
  };

  return (
    <div className='dashboard-section'>
      <div className='subsection'>
        <div className='numbers'>
          <div className='propName'>Number of verifications (2021)</div>
          <div className='propValue'>{totalVerifications}</div>
        </div>
        <div className='date-picker'>
          <div className='date-picker-input-div'>
            <label>Start date</label>
            <input
              type='date'
              onChange={handleStartDateChange}
              value={dateRange.startDate}
            />
          </div>
          <div className='date-picker-input-div'>
            <label>End date</label>
            <input
              type='date'
              onChange={handleEndDateChange}
              value={dateRange.endDate}
            />
          </div>
          {enterFilter ? (
            <button className='date-picker-close' onClick={handleCancelDate}>
              <img src={closeButton} alt='close' />
            </button>
          ) : (
            dateRange.startDate !== '' &&
            dateRange.endDate !== '' && (
              <button className='date-picker-close' onClick={handleSetDate}>
                <img src={proceedButton} alt='proceed' />
              </button>
            )
          )}
        </div>
      </div>
      <div className='horizontal-line'></div>
      <div className='container'>
        <div className='employer-charts-div'>
          <EmployerReasonChart summary={filteredSummaryByDate} />
        </div>
        <div className='employer-charts-div'>
          <EmployerPeriodChart details={monthData} monthsArray={monthsArray} />
          <p
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '0',
              color: '#646d78',
              fontSize: '1rem',
              fontWeight: '600',
              letterSpacing: '1px',
            }}
          >
            Data for last 12 months
          </p>
        </div>
        <div className='employer-piechart-div'>
          <EmployerBusinessUnitWiseChart
            businessSummary={filteredBusinessUnit}
            businessLabel={filteredLabels}
          />
        </div>
      </div>
      <div className='horizontal-line'></div>
      <div className='buttonsDiv'>
        <div className='upload-btn'>
          <button onClick={handleUploadDetails}>
            Upload verification details
          </button>
        </div>
        <div className='view-detail-btn'>
          <button onClick={handleViewDetails}>View verification details</button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
