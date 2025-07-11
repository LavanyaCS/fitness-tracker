import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWorklogsAction, editWorklogsAction } from '../../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddWorkLog({ editWorkLogs, setEditWorkLogs }) {
  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklog.worklogs);
  const dispatch = useDispatch();
  const [formWorkLogs, setFormWorkLogs] = useState({
    date: '',
    exercise: '',
    duration: '',
    notes: ''
  })
  const exerciseOptions = [
    'Running',
    'Cycling',
    'Swimming',
    'Yoga',
    'Strength Training',
    'Walking',
  ];
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (editWorkLogs) {
      setShowModal(true);
      setFormWorkLogs(editWorkLogs);
    }
  }, [editWorkLogs])

  //On Chnage inout type
  const handleChange = (e) => {
    setFormWorkLogs((newworklog) => ({
      ...newworklog, [e.target.name]: e.target.value
    }));
  }
  //OnSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      ...formWorkLogs,
      id: editWorkLogs?.id || Date.now(),
    };
    if (editWorkLogs) {
      dispatch(editWorklogsAction(newLog));
      toast.success('Work Log updated!', { position: 'top-center' });
    } else {
      dispatch(addWorklogsAction(newLog));
      toast.success('Work Log added!', { position: 'top-center' });
      closeModal();
    }
  }
  const closeModal = (e) => {
    setEditWorkLogs(false);
    setShowModal(false);
    setFormWorkLogs(
      {
        date: '',
        exercise: '',
        duration: '',
        notes: ''
      }
    );
  }
  return (
    <div className="relative w-full">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
      >
        + Add Log
      </button>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl px-6 py-4 bg-white border rounded-lg shadow-md backdrop-blur-md border-gray-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xl font-medium text-gray-900">
              {editWorkLogs ? 'Edit' : 'Add'} Work Log
            </span>
            <button
              onClick={closeModal}
              className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-black"
            >
              &times;
            </button>

            <ToastContainer />
            <form onSubmit={handleSubmit} className="pt-3 space-y-4">

              {/* Target */}
              <div>
                <label htmlFor='date' className="block text-sm font-medium text-left text-gray-700">Date</label>
                <input
                  type="date"
                  name="date" id="date"
                  value={formWorkLogs.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor='exercise' className="block text-sm font-medium text-left text-gray-700">Exercise</label>
                <select
                  name="exercise" id="exercise"
                  value={formWorkLogs.exercise}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select Exercise</option>
                  {exerciseOptions.map((exercise) => (
                    <option key={exercise} value={exercise}>
                      {exercise}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div>
                <label htmlFor='duration' className="block text-sm font-medium text-left text-gray-700">Duration</label>
                <input
                  type="number" id="duration"
                  name="duration"
                  value={formWorkLogs.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor='notes' className="block text-sm font-medium text-left text-gray-700">Notes</label>
                <textarea id="notes"
                  name="notes"
                  value={formWorkLogs.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end w-full gap-4 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-gray-800 rounded-lg w-fit hover:bg-gray-700"
                >
                  {editWorkLogs ? 'Update' : 'Add'}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg w-fit hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div></div>
      )}
    </div>

  )
}

export default AddWorkLog
