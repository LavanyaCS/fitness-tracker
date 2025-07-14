import React from 'react';
import Chart from 'react-apexcharts';

const ExerciseDistributionChart = ({ worklogs }) => {
  if (!worklogs || worklogs.length === 0) {
    return <p className="text-center">No exercise data available.</p>;
  }

  const exerciseCount = {};
  worklogs.forEach(log => {
    exerciseCount[log.exercise] = (exerciseCount[log.exercise] || 0) + 1;
  });

  const labels = Object.keys(exerciseCount);
  const data = Object.values(exerciseCount);

  const options = {
    labels,
    title: { text: 'Exercise Type Distribution', align: 'center' },
    legend: { position: 'bottom' }
  };

  const series = data;

  return <Chart options={options} series={series} type="pie" height={300} />;
};

export default ExerciseDistributionChart;
