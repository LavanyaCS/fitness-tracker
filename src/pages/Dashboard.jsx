import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { getWorklogsAction } from '../redux/action';
import axios from 'axios';

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
  const [filter, setFilter] = useState('weekly'); // weekly or monthly

  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklogs.worklogs);
  const dispatch = useDispatch();

  // Fetch worklogs from json-server
  useEffect(() => {
    const fetchWorklogs = async () => {
      if (user?.id && worklogs.length === 0) {
        try {
          const res = await axios.get(`http://localhost:5000/worklogs?userId=${user.id}`);
          dispatch(getWorklogsAction(res.data));
        } catch (err) {
          console.error('Failed to fetch worklogs:', err);
        }
      }
    };

    fetchWorklogs();
  }, [user?.id, worklogs.length, dispatch]);

  // Format date
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter worklogs by selected range
  const filteredWorklogs = useMemo(() => {
    const now = new Date();
    return worklogs.filter(log => {
      const logDate = new Date(log.date);
      if (filter === 'weekly') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return logDate >= weekAgo;
      } else {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return logDate >= monthAgo;
      }
    });
  }, [worklogs, filter]);

  // Group for line chart
  useEffect(() => {
    const grouped = filteredWorklogs.reduce((acc, log) => {
      const date = formatDate(log.date);
      const duration = parseInt(log.duration) || 0;
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.duration += duration;
      } else {
        acc.push({ date, duration });
      }
      return acc;
    }, []);
    setChartData(grouped);
  }, [filteredWorklogs]);

  const totalDuration = filteredWorklogs.reduce((sum, log) => sum + parseInt(log.duration || 0), 0);
  const totalWorkouts = filteredWorklogs.length;

  const exerciseCount = filteredWorklogs.reduce((acc, log) => {
    acc[log.exercise] = (acc[log.exercise] || 0) + 1;
    return acc;
  }, {});
  const mostFrequentExercise = Object.entries(exerciseCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Motivational quote
  useEffect(() => {
    const fetchQuote = async () => {
      try {
       
        const randomQuote = dummyQuotes[Math.floor(Math.random() * dummyQuotes.length)];
        setQuote(`${randomQuote}`);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote("Stay strong. You're doing great!");
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome {user?.name || 'User'}</h1>

      {/* Motivational Quote */}
      <div className="p-4 mt-4 text-center text-blue-800 bg-blue-100 border border-blue-200 rounded shadow">
        <p className="text-lg italic">"{quote}"</p>
      </div>
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
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Line Chart */}
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

      {/* Donut Chart for Exercise Types */}
      <div>
        <h2 className="mt-8 mb-2 text-xl font-semibold">Exercise Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={Object.entries(exerciseCount).map(([name, count]) => ({ name, value: count }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {Object.entries(exerciseCount).map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
</div>
      {/* Recent Workouts */}
      <div>
        <h2 className="mt-8 mb-2 text-xl font-semibold">Recent Workouts</h2>
        <div className="p-4 bg-white border rounded shadow">
          {filteredWorklogs.slice(-5).reverse().map((log) => (
            <div key={log.id} className="flex justify-start py-2 border-b last:border-b-0">
              <span className="min-w-36">{formatDate(log.date)}</span>
              <span className="min-w-36">{log.exercise}</span>
              <span className="min-w-36">{log.duration} mins</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
