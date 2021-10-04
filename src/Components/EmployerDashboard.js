import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../Styles/EmployerDashboard.css';

import {
  getVerificationSummaryByReason,
  getBusinessUnitSummary,
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

  const [boolVal, setBoolVal] = useState(false);
  const [reasonSummary, setReasonSummary] = useState({});
  const [businessUnitLabels, setBusinessUnitLabel] = useState([]);
  const [businessUnit, setBusinessUnit] = useState({});
  // const [allReasonSummary, setAllReasonSummary] = useState({});
  const [monthData, setMonthData] = useState([]);
  const [monthsArray, setMonthsArray] = useState([]);

  const [totalVerifications, setTotalVerifications] = useState(0);

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
      const bLabels = Object.keys(response.data);
      setBusinessUnitLabel(bLabels);
      setBusinessUnit(response.data);
      setReasonSummary(data);
      // setAllReasonSummary(data);
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

  // const filterDataAsDate = () => {
  //   var filteredData = allReasonSummary.filter(
  //     (d) =>
  //       d.verification_creation_date >= dateRange.startDate &&
  //       d.verification_creation_date <= dateRange.endDate
  //   );
  //   setReasonSummary(filteredData);
  //   // console.log('start', dateRange.startDate);
  //   // console.log('end', dateRange.endDate);
  // };

  const handleDateChange = ({ startDate, endDate }) => {
    // console.log(startDate, endDate);
    setDateRange({ startDate, endDate });
    // filterDataAsDate();
  };

  const handleClearDate = () => {
    setDateRange({ startDate: '', endDate: '' });
    // setReasonSummary(allReasonSummary);
  };

  return (
    <div className='dashboard-section'>
      <div className='subsection'>
        <div className='numbers'>
          <div className='propName'>Number of verifications (2021)</div>
          <div className='propValue'>{totalVerifications}</div>
        </div>
        <div className='date-picker'>
          <DateRangePickerComponent
            placeholder='Start Date - End Date'
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            openOnFocus={true}
            change={handleDateChange}
            cleared={handleClearDate}
            format='dd/MM/yyyy'
          />
        </div>
      </div>
      <div className='horizontal-line'></div>
      <div className='container'>
        <div className='employer-charts-div'>
          <EmployerReasonChart summary={reasonSummary} />
        </div>
        <div className='employer-charts-div'>
          <EmployerPeriodChart details={monthData} monthsArray={monthsArray} />
        </div>
        <div className='employer-piechart-div'>
          <EmployerBusinessUnitWiseChart
            businessSummary={businessUnit}
            businessLabel={businessUnitLabels}
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
