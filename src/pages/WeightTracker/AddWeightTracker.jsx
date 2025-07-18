import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AddWeightTracker({ editWeightTracker, setEditWeightTracker }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formWeightTracker, setFormWeightTracker] = useState({
    weight: '',
    date: '',
    notes: ''
  });
const dispatch = useDispatch(); 
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (editWeightTracker) {
      setShowModal(true);
      setFormWeightTracker({
        weight: editWeightTracker.weight.toString(),
        date: editWeightTracker.date,
        notes: editWeightTracker.notes,
      });
    }
  }, [editWeightTracker]);

  const handleChange = (e) => {
    setFormWeightTracker((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (parseFloat(formWeightTracker.weight) <= 0) {
    toast.error('Weight must be greater than 0.');
    return;
  }
  if (new Date(formWeightTracker.date) > new Date()) {
    toast.error('Date cannot be in the future.');
    return;
  }

  setIsLoading(true);
  try {
    const res = await fetch(`http://localhost:5000/users/${user.id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.status}`);
    }
    const userData = await res.json();

    const newLog = {
      ...formWeightTracker,
      id: editWeightTracker?.id || Date.now().toString(),
    };

    let updatedWeightLogs = [];

    if (editWeightTracker) {
      updatedWeightLogs = userData.weightlogs.map(log =>
        log.id === newLog.id ? newLog : log
      );
    } else {
      updatedWeightLogs = [...(userData.weightlogs || []), newLog];
    }

    const updatedUser = { ...userData, weightlogs: updatedWeightLogs };

    const updateRes = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });

    if (!updateRes.ok) {
      throw new Error(`Failed to update weight log: ${updateRes.status}`);
    }

    // Only show success toast after successful PUT
    if (editWeightTracker) {
      toast.success('Weight log updated!');
    } else {
      toast.success('Weight log added!');
    }

    localStorage.setItem('fitnessUser', JSON.stringify(updatedUser));
    dispatch({ type: "LOGIN", payload: updatedUser });

    closeModal();
  } catch (error) {
    console.error('Error updating weight logs:', error);
    toast.error('Error updating weight log.');
  } finally {
    setIsLoading(false);
  }
};


  const closeModal = () => {
    setShowModal(false);
    setFormWeightTracker({ weight: '', date: '', notes: '' });
    setEditWeightTracker(null);
  };

  return (
    <div className="flex justify-end w-full">
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
      >
        <Plus className="inline-block w-4 h-4 mr-1" />  Add Weight
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl px-6 py-4 transition-all duration-300 transform scale-95 bg-white border rounded-lg shadow-md opacity-0 backdrop-blur-md border-gray-500/30 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xl font-semibold">
              {editWeightTracker ? 'Edit Weight Log' : 'Add Weight Log'}
            </span>
            <button
              onClick={closeModal}
              className="absolute text-2xl text-gray-500 top-2 right-4 hover:text-black"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="weight" className="block mb-1 font-medium">
                  Weight (Kg)
                </label>
                <input
                  name="weight"
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your weight"
                  value={formWeightTracker.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block mb-1 font-medium">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formWeightTracker.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="notes" className="block mb-1 font-medium">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  className="w-full p-2 border rounded"
                  value={formWeightTracker.notes}
                  onChange={handleChange}
                  required
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
                  {isLoading ? 'Saving...' : editWeightTracker ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:text-white hover:bg-gray-600"
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

export default AddWeightTracker;
