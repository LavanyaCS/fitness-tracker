import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  getWorklogsAction,
  deleteWorklogsAction,
} from '../../redux/action';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddWorkLog from './AddWorkLog';
import { EllipsisVertical } from 'lucide-react';

function Worklog() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklog.worklogs);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [editWorkLogs, setEditWorkLogs] = useState(null);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const logsForSelectedDate = isDateSelected
    ? worklogs.filter((log) => formatDate(log.date) === formatDate(selectedDate))
    : worklogs;

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

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl font-bold"> {isDateSelected ? `Logs for ${formatDate(selectedDate)}` : 'All Workout Logs'}</div>

        <div className="relative flex items-center justify-end gap-2 flex-nowrap whitespace-nowrap">
          {isDateSelected && (
           <div className="relative w-full"> <button
              onClick={() => setIsDateSelected(false)}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg w-fit hover:bg-gray-600"
            >
              Clear Filter
            </button></div>
          )}

          {/* Filter Button with Popover Calendar */}
          <div className="relative w-full">
            <button
              onClick={() => setIsCalendarOpen((prev) => !prev)}
              className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              Filter by Date
            </button>

            {isCalendarOpen && (
              <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded shadow-lg">
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date);
                    setIsDateSelected(true);
                    setIsCalendarOpen(false); // close on select
                  }}
                  value={selectedDate}
                  className="p-2 rounded"
                />
              </div>
            )}
          </div>

          {user && (
            <AddWorkLog editWorkLogs={editWorkLogs} setEditWorkLogs={setEditWorkLogs} />
          )}
        </div>
      </div>

      {/* Worklog Display */}
      {worklogs.length === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border border-gray-100 rounded-lg shadow">
          No worklogs added yet.
        </p>
      ) : (
          <div>
            {/* <h2 className="mb-2 text-xl font-semibold">
              {isDateSelected ? `Logs for ${formatDate(selectedDate)}` : 'All Workout Logs'}
            </h2> */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {logsForSelectedDate.length === 0 ? (
              <p className="text-gray-600">No logs for this date.</p>
            ) : (
           
             logsForSelectedDate.map((log) => (
                <div
                  key={log.id}
                  className="relative flex flex-col p-4 space-y-2 transition bg-white border border-gray-200 rounded-lg shadow hover:shadow-md"
                >
                  <div className="flex w-full">
                    <span className="w-32">Exercise</span>
                    <span className="w-2">:</span> {log.exercise}
                  </div>
                  <div className="flex w-full">
                    <span className="w-32">Duration</span>
                    <span className="w-2">:</span> {log.duration}
                  </div>
                  <div className="flex w-full">
                    <span className="w-32">Notes</span>
                    <span className="w-2">:</span> {log.notes}
                  </div>

                  {/* Kebab Menu */}
                  <div className="absolute right-4 bottom-4">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === log.id ? null : log.id)}
                      className="p-2 text-gray-600 bg-white rounded-full shadow hover:text-black"
                    >
                      <EllipsisVertical />
                    </button>

                    {openMenuId === log.id && (
                      <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-28">
                        <button
                          onClick={() => {
                            setEditWorkLogs(log);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteWorklogsAction(log.id));
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
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
