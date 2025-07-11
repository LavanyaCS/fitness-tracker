import React, { useEffect, useState } from 'react';
import AddWeightTracker from './AddWeightTracker';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWeightlogsAction } from '../../redux/action';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { EllipsisVertical } from 'lucide-react';
import WeightProgressChart from './WeightProgressChart';

function Weighttracker() {
  const user = useSelector((state) => state.auth.user);
  const weightlogs = useSelector((state) => state.weight.weightlogs);
  const [chartData, setChartData] = useState([]);

  const [openMenuId, setOpenMenuId] = useState(null);
  // Group worklogs by date for line chart
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    const grouped = weightlogs.reduce((acc, log) => {
      const date = formatDate(log.date);
      const weight = parseInt(log.weight, 10) || 0;
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.weight += weight;
      } else {
        acc.push({ date, weight });
      }
      return acc;
    }, []);
    setChartData(grouped);
  }, [weightlogs]);

  const userId = user?.id;
  const dispatch = useDispatch();
  const [editWeightTracker, setEditWeightTracker] = useState(null);

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
<div className="flex items-center justify-between w-full">
        <div className="flex justify-start text-2xl font-bold">Weight Tracker</div>
<div className="flex justify-end">
   {user && (
         <AddWeightTracker editWeightTracker={editWeightTracker} setEditWeightTracker={setEditWeightTracker} />
     
      )}
  </div>      </div>

     
{weightlogs.length === 0 ? (
        <p className="p-4 text-center text-gray-600 bg-white border border-gray-100 rounded-lg shadow">No weight added yet.</p>
      ) : (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="col-span-1">
          {weightlogs.map((data) => (
            <div key={data.id} className="relative flex flex-col p-4 mb-4 space-y-2 transition bg-white border border-gray-200 rounded-lg shadow dark:border-gray-200 dark:bg-gray-100 hover:shadow-md transitionhover:shadow-md">
              <div className="flex w-full"><span className="w-32">Weight</span><span className="w-2">:</span> {data.weight}kg</div>
              <div className="flex w-full"><span className="w-32">Date</span><span className="w-2">:</span> {data.date}</div>
              <div className="flex w-full"><span className="w-32">Notes</span><span className="w-2">:</span> {data.notes}</div>
               <div className="absolute z-10 flex justify-end right-4 bottom-4 ">
                <button
                  onClick={() => setOpenMenuId(openMenuId === data.id ? null : data.id)}
                  className="p-2 text-gray-600 bg-white rounded-full shadow-xl hover:text-black"
                >
                  <EllipsisVertical />
                </button>

                {openMenuId === data.id && (
                  <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg w-28">
                    <button
                      onClick={() => {
                        setEditWeightTracker(data);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"


                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteWeightlogsAction(data.id));
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

          ))}
        </div>
        <div className="col-span-1 p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Kg', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}
      {/* <WeightProgressChart /> */}
    </div >
  );
}

export default Weighttracker;
