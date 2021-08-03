import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

import '../Styles/Charts.css';

const data = {
  labels: [
    'Payment pending',
    'Under processing',
    'Employee record not found for specified employer',
    'Pending employee approval',
    'Verification request declined by the employee',
    'Employer discrepancy - On Hold',
    'Verification report shared',
    'System error',
  ],
  datasets: [
    {
      label: '# of requests',
      data: [6, 4, 7, 3, 8, 8, 60, 4],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0,91,95,0.2)',
        'rgba(64,65,128,0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0,91,95,1)',
        'rgba(64,65,128,1.0)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerifierStatusChart = () => (
  <Fragment>
    <div className='chart-header'>
      <h1 className='chart-title'>Verification summary (by status)</h1>
    </div>
    <Bar data={data} options={options} />
  </Fragment>
);

export default VerifierStatusChart;
