import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const WeightProgressChart = ({ weightLogs }) => {
    const [chartOptions] = useState({
        chart: { id: 'weight-progress' },
        xaxis: {
            categories: weightLogs.map(log => new Date(log.date).toLocaleDateString())
        },
        stroke: { curve: 'smooth' },
        title: { text: 'Weight Progress', align: 'center' }
    });

    const [chartSeries] = useState([
        {
            name: 'Weight (kg)',
            data: weightLogs.map(log => log.weight)
        }
    ]);

    return (
        <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={300}
        />
    );
};

export default WeightProgressChart;
