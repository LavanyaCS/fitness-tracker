import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { getWorklogsAction } from '../redux/action';

const COLORS = ['#3b82f6', '#34d399', '#f59e0b', '#ef4444', '#a855f7'];

const dummyQuotes = [
  "Push yourself, because no one else is going to do it for you. — Unknown",
  "Success doesn’t just find you. You have to go out and get it. — Anonymous",
  "Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Believe in yourself and all that you are. — Christian D. Larson",
  "Your limitation—it’s only your imagination. — Unknown"
];

function Dashboard() {
  const [quote, setQuote] = useState('');
  const [chartData, setChartData] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklog.worklogs);
  const dispatch = useDispatch();

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Group worklogs by date for line chart
  useEffect(() => {
    const grouped = worklogs.reduce((acc, log) => {
      const date = formatDate(log.date);
      const duration = parseInt(log.duration, 10) || 0;
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.duration += duration;
      } else {
        acc.push({ date, duration });
      }
      return acc;
    }, []);
    setChartData(grouped);
  }, [worklogs]);

  const totalDuration = worklogs.reduce((sum, log) => sum + parseInt(log.duration || 0, 10), 0);
  const totalWorkouts = worklogs.length;

  const exerciseCount = worklogs.reduce((acc, log) => {
    acc[log.exercise] = (acc[log.exercise] || 0) + 1;
    return acc;
  }, {});
  const mostFrequentExercise = Object.entries(exerciseCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const fetchQuote = () => {
    const randomQuote = dummyQuotes[Math.floor(Math.random() * dummyQuotes.length)];
    setQuote(randomQuote);
  };

  useEffect(() => {
    fetchQuote();
  }, [user?.id]);

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome {user?.name || 'User'}</h1>

      <div className="p-4 mt-4 text-center text-gray-800 transition bg-white border border-gray-200 rounded-lg shadow hover:shadow-md dark:bg-gray-50">
        <p className="text-lg italic">"{quote}"</p>
      </div>

      {totalWorkouts === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border border-gray-100 rounded-lg shadow">No data added yet.</p>
      ) : (
        <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-white border rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Workouts</p>
          <p className="text-2xl font-bold">{totalWorkouts}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Duration</p>
          <p className="text-2xl font-bold">{totalDuration} mins</p>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow">
          <p className="text-sm text-gray-500">Most Frequent Exercise</p>
          <p className="text-xl font-semibold">{mostFrequentExercise}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Duration Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="mt-8 mb-2 text-xl font-semibold">Exercise Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(exerciseCount).map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {Object.entries(exerciseCount).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h2 className="mt-8 mb-2 text-xl font-semibold">Recent Workouts</h2>
        <div className="p-4 bg-white border rounded-lg shadow">
          {worklogs.slice(-5).reverse().map((log) => (
            <div key={log.id} className="flex justify-start py-2 border-b last:border-b-0">
              <span className="min-w-36">{formatDate(log.date)}</span>
              <span className="min-w-36">{log.exercise}</span>
              <span className="min-w-36">{log.duration} mins</span>
            </div>
          ))}
        </div>
      </div>
 </>
  )}
  
    </div>
  );
}

export default Dashboard;
