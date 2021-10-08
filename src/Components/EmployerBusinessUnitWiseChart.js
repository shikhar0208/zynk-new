import React, { Fragment, memo } from 'react';
import { Pie } from 'react-chartjs-2';
import '../Styles/Charts.css';

const EmployerBusinessUnitWiseChart = (props) => {
  const { businessSummary, businessLabel } = props;
  // console.log('businessSummary', businessSummary);
  // const [businessData, setBusinessData] = useState([]);
  // const [boolVal, setBoolVal] = useState(false);

  // useEffect(() => {
  //   const fetchData = () => {
  //     let summaryData = [];
  //     businessLabel?.forEach((element) => {
  //       summaryData.push(businessSummary[element]);
  //       // console.log(toString(element));
  //     });
  //     setBusinessData(summaryData);
  //   };
  //   if (!boolVal) {
  //     fetchData();
  //     setBoolVal(true);
  //   }
  // }, [boolVal, businessLabel, businessSummary]);

  const data = {
    labels: businessLabel,
    datasets: [
      {
        label: '# of requests',
        data: businessSummary,
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

export default memo(EmployerBusinessUnitWiseChart);
