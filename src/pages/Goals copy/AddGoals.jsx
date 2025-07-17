import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoalsAction, editGoalsAction } from '../../redux/action';
import { toast } from 'react-toastify';

function AddGoals({ editGoals, setEditGoals }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const [formGoals, setFormGoals] = useState({
    id: '',
    type: '',
    target: user?.targetWeight?.toString() || '',
    current: user?.currentWeight?.toString() || '',
    status: '',
    startDate: '',
    endDate: '',
    notes: '',
    createdAt: ''
  });

  useEffect(() => {
    if (editGoals) {
      setFormGoals(editGoals);
      setShowModal(true);
    }
  }, [editGoals]);

  const handleChange = (e) => {
    setFormGoals((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setFormGoals({
      id: '',
      type: '',
      target: user?.targetWeight?.toString() || '',
      current: user?.currentWeight?.toString() || '',
      status: '',
      startDate: '',
      endDate: '',
      notes: '',
      createdAt: ''
    });
    setEditGoals(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!formGoals.type || !formGoals.target || !formGoals.status) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (parseFloat(formGoals.target) <= 0) {
      toast.error('Target weight must be greater than 0.');
      return;
    }
    if (formGoals.startDate && formGoals.endDate && new Date(formGoals.endDate) < new Date(formGoals.startDate)) {
      toast.error('End date cannot be before start date.');
      return;
    }

    setIsLoading(true);

    const goalPayload = {
      ...formGoals,
      id: formGoals.id || Date.now().toString(),
      createdAt: formGoals.createdAt || new Date().toISOString()
    };

    try {
      if (editGoals) {
        await dispatch(editGoalsAction(goalPayload));
        toast.success('Goal updated!', { position: 'top-right' });
      } else {
        await dispatch(addGoalsAction(goalPayload));
        toast.success('Goal added!', { position: 'top-right' });
      }
      closeModal();
    } catch (error) {
      console.error('Error saving goal:', error);
      toast.error('Error saving goal.');
    } finally {
      setIsLoading(false);
    }
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

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type of Goal</label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700">Target Weight</label>
                  <input
                    type="number"
                    name="target"
                    value={formGoals.target}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Weight</label>
                  <input
                    type="number"
                    name="current"
                    value={formGoals.current}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formGoals.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formGoals.startDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formGoals.endDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formGoals.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 text-white rounded-lg ${
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {isLoading ? 'Saving...' : editGoals ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-black  hover:text-white bg-gray-200 rounded-lg hover:bg-gray-600"
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

export default AddGoals;
