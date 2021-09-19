import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../Styles/EmployerDashboard.css';

import { getVerificationSummaryByReason } from '../redux/actions/api';
import { getEmployerVerifications } from '../redux/actions/EmployerActions';

import EmployerReasonChart from './EmployerReasonChart';
import EmployerPeriodChart from './EmployerPeriodChart';

const EmployerDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { employer_zynk_id } = useSelector(
    (store) => store.employerReducer?.employerData
  );
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const [boolVal, setBoolVal] = useState(false);
  const [reasonSummary, setReasonSummary] = useState({});
  const [monthData, setMonthData] = useState([]);

  const [totalVerifications, setTotalVerifications] = useState(0);

  useEffect(() => {
    const countVerifications = (data) => {
      var total = 0;
      if (data.LoanApplications) {
        total += data.LoanApplications;
      }
      if (data.JobChange) {
        total += data.JobChange;
      }
      if (data.PropertyRental) {
        total += data.PropertyRental;
      }
      if (data.VisaApplications) {
        total += data.VisaApplications;
      }
      if (data.InsuranceApplications) {
        total += data.InsuranceApplications;
      }
      if (data.Other) {
        total += data.Other;
      }
      setTotalVerifications(total);
    };

    const countMonthly = (res) => {
      let months = new Array(12).fill(0);
      res.forEach((ele) => {
        months[new Date(ele.verification_creation_date).getMonth()] += 1;
      });
      setMonthData(months);
      // console.log(res);
    };

    const fetchData = async () => {
      const { data } = await getVerificationSummaryByReason(employer_zynk_id);

      setReasonSummary(data);

      countVerifications(data);
    };
    if (!boolVal) {
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

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  };

  const handleClearDate = () => {
    setDateRange({ startDate: '', endDate: '' });
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
          {/*<PieChart1 />*/}
          <EmployerReasonChart summary={reasonSummary} />
        </div>
        <div className='employer-charts-div'>
          {/*<PieChart2 />*/}

          <EmployerPeriodChart details={monthData} />
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
