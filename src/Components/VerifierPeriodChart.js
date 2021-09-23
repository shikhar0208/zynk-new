import React, { Fragment, useEffect, useState } from 'react';
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

const VerifierPeriodChart = (props) => {
  const { details } = props;
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
      let currentMonth = new Date().getMonth();
      for (var i = 0; i <= currentMonth; i++) {
        fetchLabel.push(label[i]);
      }
      setLabel(fetchLabel);
    };
    if (!boolVal) {
      initialiseLabels();
      setBoolVal(true);
    }
  }, [boolVal, label]);

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
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
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
