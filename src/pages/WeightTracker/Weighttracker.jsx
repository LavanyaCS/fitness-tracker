import React, { useState } from 'react';
import AddWeightTracker from './AddWeightTracker';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWeightlogsAction } from '../../redux/action';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { toast } from 'react-toastify';

function WeightTracker() {
  const user = useSelector((state) => state.auth.user);
  const weightlogs = user?.weightlogs || [];
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editWeightTracker, setEditWeightTracker] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Weight?')) {
      try {
        const res = await fetch(`http://localhost:5000/users/${user.id}`);
        const userData = await res.json();

        const updatedWeightLogs = (userData.weightlogs || []).filter((g) => g.id !== id);
        const updatedUser = { ...userData, weightlogs: updatedWeightLogs };

        await fetch(`http://localhost:5000/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
      // Update localStorage and Redux for immediate reflection in UI
localStorage.setItem('fitnessUser', JSON.stringify(updatedUser));
dispatch({ type: "LOGIN", payload: updatedUser });
        dispatch(login(updatedUser)); // update Redux user
        toast.success('Weight deleted successfully!');
      } catch (error) {
        console.error('Error deleting Weight:', error);
        toast.error('Error deleting Weight.');
      }
      setOpenMenuId(null);
    }
  };
  const sortedWeightlogs = [...weightlogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl font-bold">Weight Tracker</div>
        <div>
          {user && (
            <AddWeightTracker
              editWeightTracker={editWeightTracker}
              setEditWeightTracker={setEditWeightTracker}
            />
          )}
        </div>
      </div>

      {sortedWeightlogs.length === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border rounded-lg shadow">
          No weight added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sortedWeightlogs.map((data) => (
            <div
              key={data.id}
              className="relative flex flex-col p-4 space-y-2 transition bg-white border rounded-lg shadow hover:shadow-md"
            >
              <div className="flex w-full">
                <span className="w-32 font-medium">Weight</span>
                <span className="w-2">:</span> {data.weight}kg
              </div>
              <div className="flex w-full">
                <span className="w-32 font-medium">Date</span>
                <span className="w-2">:</span> {data.date}
              </div>
              <div className="flex w-full">
                <span className="w-32 font-medium">Notes</span>
                <span className="w-2">:</span> {data.notes}
              </div>
              <div className="absolute flex justify-end right-4 bottom-4">
                <button
                  onClick={() => setOpenMenuId(openMenuId === data.id ? null : data.id)}
                  className="p-2 text-gray-600 bg-white rounded-full shadow hover:text-black"
                  aria-label="Options"
                >
                  <EllipsisVertical />
                </button>
                {openMenuId === data.id && (
                  <div className="absolute right-0 z-10 w-32 p-1 mt-2 origin-top-right bg-white rounded-lg shadow">
                    <button
                      onClick={() => {
                        setEditWeightTracker(data);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <Pencil className="inline-block w-4 h-4 mr-1" />   Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        >
                        <Trash className="inline-block w-4 h-4 mr-1" />  Delete
                        </button>
                   
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeightTracker;
