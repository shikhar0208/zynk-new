import React, { Fragment } from 'react';
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
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const EmployerPeriodChart = (props) => {
  const { details } = props;
  // console.log(details);
  const data = {
    labels: [
      'Jun',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: '# of requests',
        data: details,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(0,91,95,0.2)',
          'rgba(64,65,128,0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(0,91,95,1)',
          'rgba(64,65,128,1.0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Fragment>
      <div className='chart-header'>
        <h1 className='chart-title'>Verification summary (by period)</h1>
      </div>
      <Bar data={data} options={options} />
    </Fragment>
  );
};

export default EmployerPeriodChart;
