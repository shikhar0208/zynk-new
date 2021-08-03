import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../Styles/Charts.css';
const data = {
  labels: [
    'Loan application',
    'Background check - Job change',
    'Background check - Property rental',
    'Background check - Visa application',
    'Background check - Insurance application',
    'Other',
  ],
  datasets: [
    {
      labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      data: [60, 15, 10, 5, 5, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',

        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0,91,95,0.2)',
        'rgba(64,65,128,0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',

        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0,91,95,1)',
        'rgba(64,65,128,1.0)',
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart1 = () => (
  <Fragment>
    <div className='chart-header'>
      <h1 className='chart-title'>Verification summary (by period)</h1>
    </div>
    <Doughnut data={data} />
  </Fragment>
);

export default PieChart1;
