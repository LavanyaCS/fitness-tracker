import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoalsAction, editGoalsAction } from '../../redux/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Goals({ editGoals, setEditGoals }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const [formGoals, setFormGoals] = useState({
    type: '',
    target: `${user.targetWeight}`,
    current: `${user.currentWeight}`,
    status: '',
    startDate: '',
    endDate: '',
    notes: '',
    createdAt: ''
  });

  // 👁️ Populate form if editing
  useEffect(() => {
    if (editGoals) {
      setFormGoals(editGoals);
      setShowModal(true);
    }
  }, [editGoals]);

  // 🛠️ Fix the change handler
  const handleChange = (e) => {
    setFormGoals((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
const closeModal = () => {
    setShowModal(false);
    setFormGoals({
      type: '',
      target: '',
      current: '',
      status: '',
      startDate: '',
      endDate: '',
      notes: '',
      createdAt: ''
    });
    setEditGoals(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalWithTimestamp = {
      ...formGoals,
      createdAt: formGoals.createdAt || new Date().toISOString()
    };

    if (editGoals) {
      dispatch(editGoalsAction(goalWithTimestamp));
      toast.success('Goal updated!', { position: 'top-center' });
    } else {
      dispatch(addGoalsAction(goalWithTimestamp));
      toast.success('Goal added!', { position: 'top-center' });
    }

    closeModal();
  };

  return (
    <div className="flex justify-end w-full">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
      >
        + Add Goal
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
              {editGoals ? 'Edit Goal' : 'Add Goal'}
            </span>
            <button
              onClick={closeModal}
              className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-black"
            >
              &times;
            </button>

              <ToastContainer />
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">Type of Workout</label>
                    <select
                      name="type"
                      value={formGoals.type}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="Weight">Weight</option>
                      <option value="Workout">Workout</option>
                    </select>
                  </div>

                  {/* Target */}
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">Target Weight</label>
                    <input
                      type="number"
                      name="target"
                      value={formGoals.target}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>

                  {/* Current */}
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">Current Weight</label>
                    <input
                      type="number"
                      name="current"
                      value={formGoals.current}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

              
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formGoals.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Not Started">Not Started</option>
                    </select>
                  </div>

                  {/* Dates */}
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formGoals.startDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formGoals.endDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-left text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={formGoals.notes}
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
                    {editGoals ? 'Update' : 'Add'}
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
            </div>
        
        </div>
      )}
    </div>
  );
}

export default Goals;
