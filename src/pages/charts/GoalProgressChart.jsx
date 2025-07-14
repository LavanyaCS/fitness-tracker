import React from 'react';
import Chart from 'react-apexcharts';

const GoalProgressChart = ({ currentWeight, targetWeight }) => {
  if (!currentWeight || !targetWeight) {
    return <p className="text-center">Goal data unavailable.</p>;
  }

  const progress = Math.min((parseInt(currentWeight, 10) / parseInt(targetWeight, 10)) * 100, 100);

  const options = {
    chart: { id: 'goal-progress' },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: '16px' },
          value: { fontSize: '22px' },
          total: {
            show: true,
            label: 'Progress',
            formatter: () => `${progress.toFixed(1)}%`
          }
        }
      }
    },
    labels: ['Weight Goal Progress'],
    title: { text: 'Goal Progress', align: 'center' }
  };

  const series = [progress];

  return <Chart options={options} series={series} type="radialBar" height={300} />;
};

export default GoalProgressChart;
