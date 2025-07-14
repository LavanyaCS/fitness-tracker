import React from 'react';
import Chart from 'react-apexcharts';

const WeightProgressChart = ({ weightLogs }) => {
    const data = weightLogs
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(log => ({
            x: log.date,
            y: parseInt(log.weight)
        }));

    const options = {
        chart: { id: "weight-progress" },
        xaxis: { type: 'category', title: { text: 'Date' } },
        yaxis: { title: { text: 'Weight (kg)' } },
        title: { text: "Weight Progress", align: "center" }
    };

    const series = [{
        name: "Weight",
        data: data
    }];

    return <Chart options={options} series={series} type="line" height={300} />;
};

export default WeightProgressChart;
