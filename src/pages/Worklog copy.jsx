import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  getWorklogsAction,
  addWorklogsAction,
  editWorklogsAction,
  deleteWorklogsAction,
  login,
} from '../redux/action';
import { Link } from 'react-router-dom';

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

  const [editId, setEditId] = useState(null);

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
      <div className="text-center mt-10 text-gray-600">
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
    <div className="max-w-4xl mx-auto p-6 space-y-6 w-full">
      <h1 className="text-2xl font-bold">Workout Log</h1>
<div className="w-full flex justify-end">
<button
  onClick={() => setShowModal(true)}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  + Add Log
</button></div>
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center h-screen  flex-col  text-center px-4 "
  onClick={() => {
      setShowModal(false);
      setFormData({ date: '', exercise: '', duration: '', notes: '' });
      setEditId(null);
    }}
    >
    <div className="shadow-md  w-full relative backdrop-blur-md bg-white/20 p-6 rounded max-w-2xl border border-gray-500/30"
    onClick={(e) => e.stopPropagation()}>
      {/* Close Button */}
      <button
        onClick={() => {
          setShowModal(false);
          setFormData({ date: '', exercise: '', duration: '', notes: '' });
          setEditId(null);
        }}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
      >
        &times;
      </button>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-4"
      >
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Exercise"
          className="w-full p-2 border rounded"
          value={formData.exercise}
          onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
          required
        />
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
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          {editId ? 'Edit Log' : 'Add Log'}
        </button>
      </form>
      </div></div>
)}

      {worklogs.length === 0 ? (
        <p className="text-gray-600 text-center mt-4">No logs yet.</p>
      ) : (
        <table className="w-full text-left bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Exercise</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {worklogs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="p-2">{log.date}</td>
                <td className="p-2">{log.exercise}</td>
                <td className="p-2">{log.duration}</td>
                <td className="p-2">{log.notes}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(log)}
                    className="text-gray-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Worklog;
