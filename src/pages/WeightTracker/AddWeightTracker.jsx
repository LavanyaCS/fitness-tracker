import React from 'react'
import axios from 'axios'
import { addWeightlogsAction } from '../../redux/action'
import { useDispatch } from 'react-redux';
function AddWeightTracker() {
const [weight,setWeight]= useState('');
const [date,setDate]= useState('');
const dispatch = useDispatch();
const handleSubmit = (e) => {
    e.preventDefault();
    const weightlog = {
        id: Date.now(),
        weight:parseFloat(weight),
        date,
    };
    dispatch(addWeightlogsAction(weightlog));
    setWeight('');
    setDate('');

};
  return (
    <div>
 <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-center">Add Weight Log</h2>
     <input type="number" className="w-full p-2 border rounded" step="0.1" placeholder="Weight (Kg)" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
     <input type="date" className="w-full p-2 border rounded" step="0.1" placeholder="Date (Kg)" value={date} onChange={(e) => setDate(e.target.value)} required/>
 <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Add Weight Log
      </button>     
      </form>    
    </div>
  )
}

export default AddWeightTracker
