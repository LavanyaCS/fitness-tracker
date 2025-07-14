import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddGoals from './AddGoals.jsx';
import { deleteGoalsAction } from '../../redux/action.js';
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'react-toastify';

function Goals() {
  const [editGoals, setEditGoals] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const goals = user?.goals || [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await dispatch(deleteGoalsAction(id));
        toast.success('Goal deleted successfully!', { position: 'top-center' });
      } catch (error) {
        console.error('Error deleting goal:', error);
        toast.error('Error deleting goal.');
      }
      setOpenMenuId(null);
    }
  };

  const statusColor = (status) => {
    if (!status) return '';
    const lower = status.toLowerCase();
    if (lower === 'completed') return 'text-green-600 font-semibold';
    if (lower === 'in progress') return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const sortedGoals = [...goals].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl font-bold">Goals Details</div>
        <AddGoals editGoals={editGoals} setEditGoals={setEditGoals} />
      </div>

      {sortedGoals.length === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border rounded-lg shadow">
          No goals added yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sortedGoals.map((goal) => (
            <div
              key={goal.id}
              className="relative flex flex-col p-4 space-y-2 transition bg-white border rounded-lg shadow hover:shadow-md"
            >
              <div className="flex w-full">
                <span className="w-32 font-medium">Goal Type</span>
                <span className="mx-1">:</span> {goal.type}
              </div>
              <div className="flex w-full">
                <span className="w-32 font-medium">Target Weight</span>
                <span className="mx-1">:</span> {goal.target}
              </div>
              <div className="flex w-full">
                <span className="w-32 font-medium">Current Weight</span>
                <span className="mx-1">:</span> {goal.current}
              </div>
              <div className="flex w-full">
                <span className="w-32 font-medium">Status</span>
                <span className="mx-1">:</span>
                <span className={statusColor(goal.status)}>{goal.status}</span>
              </div>
              {goal.startDate && (
                <div className="flex w-full">
                  <span className="w-32 font-medium">Start Date</span>
                  <span className="mx-1">:</span> {goal.startDate}
                </div>
              )}
              {goal.endDate && (
                <div className="flex w-full">
                  <span className="w-32 font-medium">End Date</span>
                  <span className="mx-1">:</span> {goal.endDate}
                </div>
              )}
              {goal.notes && (
                <div className="flex w-full">
                  <span className="w-32 font-medium">Notes</span>
                  <span className="mx-1">:</span> {goal.notes}
                </div>
              )}

              <div className="absolute flex justify-end right-4 bottom-4">
                <button
                  onClick={() => setOpenMenuId(openMenuId === goal.id ? null : goal.id)}
                  className="p-2 text-gray-600 bg-white rounded-full shadow hover:text-black"
                  aria-label="Options"
                >
                  <EllipsisVertical />
                </button>
                {openMenuId === goal.id && (
                  <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border rounded-lg shadow w-28 p-2">
                    <button
                      onClick={() => {
                        setEditGoals(goal);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
                    >
                      Delete
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

export default Goals;
