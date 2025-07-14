import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getWorklogsAction, login } from '../redux/action';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklog.worklogs);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    targetSteps: '',
    currentWeight: '',
    targetWeight: '',
  });

  const genderOptions = ['Male', 'Female', 'Trans'];
  const initials = user?.name?.charAt(0).toUpperCase() || '?';
  const totalWorkouts = worklogs.length;
  const totalDuration = worklogs.reduce((sum, log) => sum + parseInt(log.duration || 0), 0);

  useEffect(() => {
    if (user) {
      setFormData({
        gender: user.gender || '',
        age: user.age || '',
        targetSteps: user.targetSteps || '',
        currentWeight: user.currentWeight || '',
        targetWeight: user.targetWeight || '',
      });
    }
  }, [user, showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const res = await axios.get(`http://localhost:5000/users/${user.id}`);
      const editdUser = {
        ...res.data,
        ...formData,
      };

      await axios.patch(`http://localhost:5000/users/${user.id}`, editdUser);
      dispatch(login(editdUser));
      setShowModal(false);
      setFormData({
        gender: '',
        age: '',
        targetSteps: '',
        currentWeight: '',
        targetWeight: '',
      });
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };

  return (
    <div className="w-full max-w-5xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="p-4 transition bg-white rounded-lg shadow hover:shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white bg-gray-800 rounded-full">{initials}</div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col w-full pt-4 mt-4 text-sm text-gray-700 md:mt-0 md:ml-auto">
          <div className="flex justify-between py-1 border-b"><span className="w-32 font-semibold">Gender</span><span>{user?.gender || 'N/A'}</span></div>
          <div className="flex justify-between py-1 border-b"><span className="w-32 font-semibold">Age</span><span>{user?.age || 'N/A'}</span></div>
          <div className="flex justify-between py-1 border-b"><span className="w-32 font-semibold">Target Steps</span><span>{user?.targetSteps || 'N/A'}</span></div>
          <div className="flex justify-between py-1 border-b"><span className="w-32 font-semibold">Total Weight</span><span>{user?.currentWeight != null && user?.currentWeight !== '' ? `${user.currentWeight} kg` : 'N/A'}</span></div>
          <div className="flex justify-between py-1"><span className="w-32 font-semibold">Target Weight</span><span>{user?.targetWeight != null && user?.targetWeight !== '' ? `${user.targetWeight} kg` : 'N/A'}</span></div>
          <div className="flex justify-end mt-4">
            <button onClick={() => setShowModal(true)} className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-600">Edit</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-30" onClick={() => setShowModal(false)}>
          <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
            <span className="flex justify-start text-xl font-medium text-gray-900">Edit Profile</span>
            <button onClick={() => setShowModal(false)} className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-black">&times;</button>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input type="number" placeholder="Age" className="w-full p-2 border rounded" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required />
              <select className="w-full p-2 border rounded" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} required>
                <option value="">Select Gender</option>
                {genderOptions.map((gender) => (<option key={gender} value={gender}>{gender}</option>))}
              </select>
              <input type="text" placeholder="Target Steps" className="w-full p-2 border rounded" value={formData.targetSteps} onChange={(e) => setFormData({ ...formData, targetSteps: e.target.value })} required />
              <input type="text" placeholder="Total Weight" className="w-full p-2 border rounded" value={formData.currentWeight} onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })} />
              <input type="text" placeholder="Target Weight" className="w-full p-2 border rounded" value={formData.targetWeight} onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })} />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-600">Edit Details</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white border rounded-lg shadow"><p className="text-base">Total Duration</p><p className="text-2xl font-medium">{totalDuration}</p></div>
        <div className="p-4 bg-white border rounded-lg shadow"><p className="text-base">Total Workouts</p><p className="text-2xl font-medium">{totalWorkouts}</p></div>
      </div>
    </div>
  );
}

export default Profile;
