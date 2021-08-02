import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../Styles/EmployerDashboard.css';

const EmployerDashboard = () => {
  const history = useHistory();

  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleViewDetails = () => {
    history.push('/employer-verification-details');
  };

  const handleUploadDetails = () => {
    history.push('/upload-details');
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  };
  return (
    <div className='dashboard-section'>
      <div className='subsection'>
        <div className='numbers'>
          <div className='propName'>Number of verifications (2021)</div>
          <div className='propValue'>100</div>
        </div>
        <div className='date-picker'>
          <DateRangePickerComponent
            placeholder='Start Date - End Date'
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            openOnFocus={true}
            change={handleDateChange}
            format='dd/MM/yyyy'
          />
        </div>
      </div>
      <div className='horizontal-line'></div>
      <div className='container'>
        <div className='grid'>
          <h2>Verification Summary (By period)</h2>
          {/* we will add date filter here */}
          <div className='list-section'>
            <div className='list'>
              <div className='key'>Jun</div>
              <div className='value'>15</div>
            </div>
            <div className='list'>
              <div className='key'>Feb</div>
              <div className='value'>10</div>
            </div>
            <div className='list'>
              <div className='key'>Mar</div>
              <div className='value'>25</div>
            </div>
            <div className='list'>
              <div className='key'>Apr</div>
              <div className='value'>15</div>
            </div>
            <div className='list'>
              <div className='key'>May</div>
              <div className='value'>25</div>
            </div>
            <div className='list'>
              <div className='key'>Jun</div>
              <div className='value'>10</div>
            </div>
          </div>
        </div>
        <div className='grid'>
          <h2>Verification Summary (By reason)</h2>
          {/* we will add date filter here */}
          <div className='list-section'>
            <div className='list'>
              <div className='key'>Loan application</div>
              <div className='value'>60</div>
            </div>
            <div className='list'>
              <div className='key'>Background check - Job change</div>
              <div className='value'>15</div>
            </div>
            <div className='list'>
              <div className='key'>Background check - Property rental</div>
              <div className='value'>10</div>
            </div>
            <div className='list'>
              <div className='key'>Background check - Visa application</div>
              <div className='value'>5</div>
            </div>
            <div className='list'>
              <div className='key'>
                Background check - Insurance application
              </div>
              <div className='value'>5</div>
            </div>
            <div className='list'>
              <div className='key'>Other</div>
              <div className='value'>5</div>
            </div>
          </div>
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
