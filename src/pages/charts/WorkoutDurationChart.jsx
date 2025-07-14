import React from 'react';
import Chart from 'react-apexcharts';

const WorkoutDurationChart = ({ worklogs }) => {
    const dateDurationMap = {};

    worklogs.forEach(log => {
        if (!dateDurationMap[log.date]) {
            dateDurationMap[log.date] = 0;
        }
        dateDurationMap[log.date] += parseInt(log.duration);
    });

    const categories = Object.keys(dateDurationMap);
    const data = Object.values(dateDurationMap);

    const options = {
        chart: { id: "workout-duration" },
        xaxis: { categories, title: { text: "Date" } },
        yaxis: { title: { text: "Total Duration (min)" } },
        title: { text: "Workout Duration Over Time", align: "center" }
    };

    const series = [{
        name: "Total Duration",
        data: data
    }];

    return <Chart options={options} series={series} type="bar" height={300} />;
};

export default WorkoutDurationChart;
