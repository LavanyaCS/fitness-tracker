import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddGoals from './AddGoals.jsx'
import { deleteGoalsAction } from '../../redux/action.js';
import { EllipsisVertical } from 'lucide-react';
function Goals() {
  const [editGoals, setEditGoals] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const goals = useSelector((state) => state.goal.goals);
  const [openMenuId, setOpenMenuId] = useState(null);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      dispatch(deleteGoalsAction(id));
    }
  };

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-start text-2xl font-bold">Goals Details</div>
<div className="flex justify-end">
      {user && (
        <AddGoals editGoals={editGoals} setEditGoals={setEditGoals} />
      )}
      </div></div>
        

      {goals.length === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border border-gray-100 rounded-lg shadow">No goals added yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {goals.map((goal) => (
            <div key={goal.id} className="relative flex flex-col p-4 mb-4 space-y-2 transition bg-white border border-gray-200 rounded-lg shadow dark:border-gray-200 dark:bg-gray-100 hover:shadow-md transitionhover:shadow-md">
              <div className="flex w-full"><span className="w-32">Goal Type</span><span className="w-2">:</span> {goal.type}</div>
              <div className="flex w-full"><span className="w-32">Target Weight</span><span className="w-2">:</span> {goal.target}</div>
              <div className="flex w-full"><span className="w-32">Current Weight</span><span className="w-2">:</span> {goal.current}</div>
              <div className="flex w-full"><span className="w-32">Status</span><span className="w-2">:</span> {goal.status}</div>
              

              <div className="absolute z-10 flex justify-end right-4 bottom-4 ">
                <button
                  onClick={() => setOpenMenuId(openMenuId === goal.id ? null : goal.id)}
                  className="p-2 text-gray-600 bg-white rounded-full shadow-xl hover:text-black"
                >
                  <EllipsisVertical />
                </button>
                {openMenuId === goal.id && (
                  <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg w-28">

                    <button
                      onClick={() => { setEditGoals(goal), setOpenMenuId(null) }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { handleDelete(goal.id); setOpenMenuId(null) }}
                      className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>)}
              </div>
            </div>
          ))}</div>
      )}</div>
  )
}

export default Goals
