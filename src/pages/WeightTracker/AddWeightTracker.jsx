import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWeightlogsAction, editWeightlogsAction } from '../../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddWeightTracker({ editWeightTracker, setEditWeightTracker }) {
  const [formWeightTracker, setFormWeightTracker] = useState({
    weight: '',
    date: '',
    notes:''
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editWeightTracker) {
      setShowModal(true); // auto open modal if editing
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLog = {
      id: editWeightTracker?.id || Date.now(),
      weight: parseFloat(formWeightTracker.weight),
      date: formWeightTracker.date,
      notes: formWeightTracker.notes,
    };

    if (editWeightTracker) {
      dispatch(editWeightlogsAction(newLog));
      toast.success('Weight log updated!', { position: 'top-center' });
      setEditWeightTracker(null);
    } else {
      dispatch(addWeightlogsAction(newLog));
      toast.success('Weight log added!', { position: 'top-center' });
    }

    setShowModal(false);
    setFormWeightTracker({ weight: '', date: '', notes:'' });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormWeightTracker({ weight: '', date: '', notes:'' });
    setEditWeightTracker(null);
  };

  return (
    <div className="flex justify-end w-full">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
      >
        + Add Weight
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center h-screen px-4 text-center bg-center bg-cover bg-black/30"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl px-6 py-4 border rounded-lg shadow-md backdrop-blur-md bg-white/80 border-gray-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex justify-start text-xl font-medium text-gray-900">
              {editWeightTracker ? 'Edit Weight Log' : 'Add Weight Log'}
            </span>
            <button
              onClick={closeModal}
              className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-black"
            >
              &times;
            </button>

              <ToastContainer />
              <form
                onSubmit={handleSubmit}
                className="mt-4 space-y-4"
              >

                <div>
                  <label htmlFor="weight" className="block mb-1 font-medium text-left">
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
                  <label htmlFor="date" className="block mb-1 font-medium text-left">
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
                  <label htmlFor="notes" className="block mb-1 font-medium text-left">
                    Notes
                  </label>
                  <textarea
                    name="notes" rows="3"
                    className="w-full p-2 border rounded"
                    value={formWeightTracker.notes}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-end w-full gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-gray-800 rounded-lg w-fit hover:bg-gray-700"
                  >
                    {editWeightTracker ? 'Update' : 'Add'}
                  </button>

                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-gray-500 rounded-lg w-fit hover:bg-gray-600"
                      onClick={closeModal}
                    >
                      Cancel                   </button>
                </div>
              </form>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default AddWeightTracker;
