import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//Kebab Menu
import { FiMoreVertical } from 'react-icons/fi';
import {
  getWorklogsAction,
  addWorklogsAction,
  editWorklogsAction,
  deleteWorklogsAction,
  login,
} from '../redux/action';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';

function Worklog() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklogs.worklogs);
const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    exercise: '',
    duration: '',
    notes: '',
  });
  const exerciseOptions = [
  'Running',
  'Cycling',
  'Swimming',
  'Yoga',
  'Strength Training',
  'Walking',
];

//Kebab Menu
const [openMenuId,setOpenMenuId]=useState(null);
  const [editId, setEditId] = useState(null);
//Implement Calendar
const [selectedDate,setSelectedDate]= useState(new Date());

//Date Format
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const logsForSelectedDate = worklogs.filter(
  (log) => formatDate(log.date) == formatDate(selectedDate)
)
  const fetchWorklogs = async () => {
    try {
      const userRes = await axios.get(`http://localhost:5000/users/${user.id}`);
      dispatch(getWorklogsAction(userRes.data.worklogs || []));
    } catch (error) {
      console.error('Failed to fetch worklogs:', error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchWorklogs();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const userRes = await axios.get(`http://localhost:5000/users/${user.id}`);
      const fullUser = userRes.data;
      const currentLogs = fullUser.worklogs || [];
      let editdLogs;

      if (editId) {
        const editdLog = { ...formData, id: editId.toString() };
        editdLogs = currentLogs.map((log) =>
          log.id.toString() === editId.toString() ? editdLog : log
        );
        dispatch(editWorklogsAction(editdLog));
      } else {
        const newLog = { ...formData, id: Date.now().toString() };
        editdLogs = [...currentLogs, newLog];
        dispatch(addWorklogsAction(newLog));
      }

      const editdUser = { ...fullUser, 
        worklogs: editdLogs };

      await axios.patch(`http://localhost:5000/users/${user.id}`, editdUser);
      dispatch({ type: 'LOGIN', payload: editdUser });

      setFormData({ date: '', exercise: '', duration: '', notes: '' });
      setEditId(null);
      fetchWorklogs();
      setShowModal(false);

    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleEdit = (log) => {
    setFormData(log);
    setEditId(log.id);
  };

  const handleDelete = async (id) => {
    try {
      const userRes = await axios.get(`http://localhost:5000/users/${user.id}`);
      const fullUser = userRes.data;
      const editdLogs = (fullUser.worklogs || []).filter(
        (log) => log.id.toString() !== id.toString()
      );
      const editdUser = { ...fullUser, worklogs: editdLogs };

      await axios.patch(`http://localhost:5000/users/${user.id}`, editdUser);
      dispatch({ type: 'LOGIN', payload: editdUser });
      dispatch(deleteWorklogsAction(id));
      fetchWorklogs();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="mt-10 text-center text-gray-600">
        Please log in to view your worklog.
        <p className="text-sm text-center">{' '}
  <Link to="/" className="text-gray-600 hover:underline">
    Login
  </Link>
</p> 
      </div>
    );
  }

  return (
   
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Workout Log</h1>
<div className="flex justify-end w-full">
<button
  onClick={() => setShowModal(true)}
  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
>
  + Add Log
</button></div>
{showModal && (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-screen px-4 text-center bg-center bg-cover "
  onClick={() => {
      setShowModal(false);
      setFormData({ date: '', exercise: '', duration: '', notes: '' });
      setEditId(null);
    }}
    >
    <div className="relative w-full max-w-2xl p-6 border rounded shadow-md backdrop-blur-md bg-white/20 border-gray-500/30"
    onClick={(e) => e.stopPropagation()}>
      <span className="flex justify-start text-xl font-medium text-gray-900"> {editId ? 'Edit Log' : 'Add Log'}</span>
      {/* Close Button */}
      <button
        onClick={() => {
          setShowModal(false);
          setFormData({ date: '', exercise: '', duration: '', notes: '' });
          setEditId(null);
        }}
        className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-black"
      >
        &times;
      </button>
      <form
        onSubmit={handleSubmit}
        className="mt-4 space-y-4"
      >
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
       
<select
  className="w-full p-2 border rounded"
  value={formData.exercise}
  onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
  required
>
  <option value="">Select Exercise</option>
  {exerciseOptions.map((exercise) => (
    <option key={exercise} value={exercise}>
      {exercise}
    </option>
  ))}
</select>

        <input
          type="text"
          placeholder="Duration (mins)"
          className="w-full p-2 border rounded"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Notes"
          className="w-full p-2 border rounded"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <div className="flex justify-end">
        <button className="flex justify-end px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-600">
          {editId ? 'Edit Log' : 'Add Log'}
        </button></div>
      </form>
      </div></div>
)}

      {worklogs.length === 0 ? (
        <p className="mt-4 text-center text-gray-600">No logs yet.</p>
      ) : (
      <div className="grid grid-cols-2 gap-4 space-y-6">
        <Calendar onChange={setSelectedDate}
        value={selectedDate}
        className="col-span-1 p-2 border rounded-md"/>
        <div className="col-span-1">
          <h2 className="mb-2 text-xl font-semibold ">
            Logs for {formatDate(selectedDate)}
          </h2>
          {logsForSelectedDate.length === 0 ? 
    ( <p className="text-gray-600">No logs for this date.</p> ) 
    : (
      logsForSelectedDate.map(log => (
        <div key={log.id} className="p-4 mb-2 border rounded shadow-sm bg-gray-50">
          <p><strong>Exercise:</strong> {log.exercise}</p>
          <p><strong>Duration:</strong> {log.duration}</p>
          <p><strong>Notes:</strong> {log.notes}</p>
          <div className="relative flex justify-end ">
  <button
    onClick={() => setOpenMenuId(openMenuId === log.id ? null : log.id) }
    className="p-2 text-gray-600 bg-white rounded-full shadow-xl hover:text-black"
  >
    <FiMoreVertical />
  </button>

  {openMenuId === log.id && (
    <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg w-28">
      <button
        onClick={() => {
          handleEdit(log);
          setShowModal(true);    
          setOpenMenuId(null);
        }}
        className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
      >
        Edit
      </button>
      <button
        onClick={() => {
          handleDelete(log.id);
          setOpenMenuId(null);
        }}
        className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  )}
</div>


          </div>
      ))
    )}
</div>
        </div>
      )}
    </div>
  );
}

export default Worklog;
