import React, { Fragment } from 'react';
import { Pie } from 'react-chartjs-2';
import '../Styles/Charts.css';
const data = {
  labels: ['Dept 1', 'Dept 2', 'Dept 3', 'Dept 4', 'Dept 5', 'Dept 6'],
  datasets: [
    {
      label: '# of requests',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
      ],
      borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
      borderWidth: 1,
    },
  ],
};

const EmployerBusinessUnitWiseChart = () => {
  return (
    <Fragment>
      <div className='chart-header'>
        <h1 className='chart-title'>
          Verification requests (by business unit)
        </h1>
      </div>
      <Pie data={data} />
    </Fragment>
  );
};

export default EmployerBusinessUnitWiseChart;
