import React, { Fragment, useEffect, useState } from 'react';
import { allMonths } from '../utils/helperFunctions';
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
  const { details, monthsArray } = props;
  // console.log('details', details);
  // console.log('months', monthsArray);
  const [boolVal, setBoolVal] = useState(false);
  const [label, setLabel] = useState([
    'Jan',
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
  ]);

  useEffect(() => {
    const initialiseLabels = () => {
      let fetchLabel = [];
      // let currentMonth = new Date().getMonth();
      for (var i = 0; i < 12; i++) {
        fetchLabel.push(allMonths[monthsArray[i]]);
      }
      // console.log('fetch', fetchLabel);
      setLabel(fetchLabel);
    };
    if (!boolVal && monthsArray.length !== 0) {
      initialiseLabels();
      setBoolVal(true);
    }
  }, [boolVal, label, monthsArray.length, monthsArray]);

  const data = {
    labels: label,
    datasets: [
      {
        label: '# of requests',
        data: details,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(0,91,95,0.6)',
          'rgba(64,65,128,0.6)',
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
