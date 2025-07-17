import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeightProgressChart from './charts/WeightProgressChart';
import WorkoutDurationChart from './charts/WorkoutDurationChart';
import ExerciseDistributionChart from './charts/ExerciseDistributionChart';
import GoalProgressChart from './charts/GoalProgressChart';
import { loadUserData } from '../redux/action';

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
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.auth.user?.worklogs || []);
const weightlogs = useSelector((state) => state.auth.user?.weightlogs || []);
  const goals = useSelector((state) => state.auth.user?.goals || []);

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

  useEffect(() => {
    if (user?.id) {
      const fetchUserData = async () => {
        if (!user?.id) return;
        try {
            const res = await fetch(`http://localhost:5000/users/${user.id}`);
            const userData = await res.json();
            dispatch({ type: 'LOGIN', payload: userData });
        } catch (error) {
            console.error('Failed to load user data', error);
        }
    };
    fetchUserData();
    }
  }, [dispatch, user?.id]);

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome  {user?.first_name && user?.last_name
    ? `${user.first_name} ${user.last_name}`
    : user?.name }</h1>

      <div className="p-4 mt-4 text-center text-gray-800 transition bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
        <p className="text-lg italic">"{quote}"</p>
      </div>

      {totalWorkouts === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border border-gray-100 rounded-lg shadow">
          No data added yet.
        </p>
      ) : (
        <>
          {/* Summary Cards */}
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

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 bg-white rounded shadow">
              <WeightProgressChart weightLogs={weightlogs} />
            </div>
            <div className="p-4 bg-white rounded shadow">
              <WorkoutDurationChart worklogs={worklogs} />
            </div>
            <div className="p-4 bg-white rounded shadow">
              <ExerciseDistributionChart worklogs={worklogs} />
            </div>
            <div className="p-4 bg-white rounded shadow">
              <GoalProgressChart
                currentWeight={user?.currentWeight}
                targetWeight={user?.targetWeight}
                goals={goals}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
