import React, { Fragment, memo } from 'react';
import { Bar } from 'react-chartjs-2';

import '../Styles/Charts.css';

const options = {
  plugins: {
    // 'legend' now within object 'plugins {}'
    legend: {
      labels: {
        boxWidth: '0',
        boxHeight: '0',
        color: 'white',
      },
    },
  },
  scales: {
    y: {
                suggestedMin: 5,
                suggestedMax: 10
            },
  },
};

const EmployerReasonChart = (props) => {
  const { summary } = props;
  const data = {
    // labels: [
    //   'Loan application',
    //   'Background check - Job change',
    //   'Background check - Property rental',
    //   'Background check - Visa application',
    //   'Background check - Insurance application',
    //   'Other',
    // ],
    labels: [
      'Credit application',
      'Credit - Re-verification',
      'Pre-employment screening',
      'Property rental',
      'Visa application',
      'Insurance application',
      'Other',
    ],
    datasets: [
      {
        label: '# of requests',
        data: [
          summary.CreditApplication,
          summary.CreditReverification,
          summary.PreEmploymentScreening,
          summary.PropertyRental,
          summary.VisaApplication,
          summary.InsuranceApplication,
          summary.Other,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(64,65,128,0.6)',
          'rgba(0,91,95,0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',

          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(64,65,128,1.0)',
          'rgba(0,91,95,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Fragment>
      <div className='chart-header'>
        <h1 className='chart-title'>Verification summary (by reason)</h1>
      </div>
      <Bar data={data} options={options} />
    </Fragment>
  );
};

export default memo(EmployerReasonChart);
