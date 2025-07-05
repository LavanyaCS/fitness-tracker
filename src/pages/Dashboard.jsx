import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function Dashboard() {
  const user = useSelector((state)=> state.auth.user);
  const worklogs = useSelector((state) => state.worklogs.worklogs);
  const [chartData,setChartData]= useState([]);
  
//Date Format
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};
useEffect(() => {
  const grouped = worklogs.reduce((acc,log) => {
    const date = formatDate(log.date);
    const duration = parseInt(log.duration) || 0;
    const existing = acc.find((item) => item.date === date);
    if(existing){
      existing.duration += duration;
    }
    else{
      acc.push({date,duration});
    }
    return acc;
  },[]);
  setChartData(grouped);
},[worklogs]);

 const totalDuration = worklogs.reduce((sum, log) => sum + parseInt(log.duration || 0), 0);
  const totalWorkouts = worklogs.length;

  
  const exerciseCount = worklogs.reduce((acc, log) => {
    acc[log.exercise] = (acc[log.exercise] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentExercise = Object.entries(exerciseCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="max-w-5xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome {user?.name || 'User'}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-sm text-gray-500">Total Workouts</p>
          <p className="text-2xl font-bold">{totalWorkouts}</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-sm text-gray-500">Total Duration</p>
          <p className="text-2xl font-bold">{totalDuration} mins</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-sm text-gray-500">Most Frequent Exercise</p>
          <p className="text-xl font-semibold">{mostFrequentExercise}</p>
        </div>
      </div>

      {/* Chart */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Exercise Duration Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="duration" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard
