import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

import '../Styles/Charts.css';

const data = {
  labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'June'],
  datasets: [
    {
      label: '# of requests',
      data: [15, 10, 25, 15, 25, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

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
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerifierPeriodChart = () => {
  return (
    <Fragment>
      <div className='chart-header'>
        <h1 className='chart-title'>
          Verification summary (by verification period)
        </h1>
      </div>
      <Bar data={data} options={options} />
    </Fragment>
  );
};

export default VerifierPeriodChart;
