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
    first_name:'',
    last_name:'',
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
        first_name: user.first_name || '',
        last_name: user.last_name || '',
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
        first_name:'',
        last_name:'',
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
            <p className="text-lg font-medium">
  {user?.first_name && user?.last_name
    ? `${user.first_name} ${user.last_name}`
    : user?.name
  }
</p>


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
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-screen px-4 text-center bg-center bg-cover " onClick={() => setShowModal(false)}>
          <div className="relative w-full max-w-2xl px-6 py-4 transition-all duration-300 transform scale-95 bg-white border rounded-lg shadow-md opacity-0 backdrop-blur-md border-gray-500/30 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <span className="flex justify-start text-xl font-medium text-gray-900">Edit Profile</span>
            <button onClick={() => setShowModal(false)} className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-black">&times;</button>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 mt-4 space-y-4 gap-x-4">
              <div>
                <label htmlFor='first_name' className="block text-sm font-medium text-left text-gray-700">First Name</label>

                <input type="text" placeholder="Enter a first name" className="w-full p-2 border rounded" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
              </div>
              <div>
                <label htmlFor='last_name' className="block text-sm font-medium text-left text-gray-700">Last Name</label>

                <input type="text" placeholder="Enter a last name" className="w-full p-2 border rounded" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
              </div>

              <div>
                <label htmlFor='age' className="block text-sm font-medium text-left text-gray-700">Age</label>
                <input type="number" placeholder="Age" className="w-full p-2 border rounded" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required /></div>
              <div>
                <label htmlFor='date' className="block text-sm font-medium text-left text-gray-700">Gender</label>

                <select className="w-full p-2 border rounded" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} required>
                  <option value="">Select Gender</option>
                  {genderOptions.map((gender) => (<option key={gender} value={gender}>{gender}</option>))}
                </select></div> <div>
                <label htmlFor='date' className="block text-sm font-medium text-left text-gray-700">Target Steps</label>

                <input type="text" placeholder="Target Steps" className="w-full p-2 border rounded" value={formData.targetSteps} onChange={(e) => setFormData({ ...formData, targetSteps: e.target.value })} required />
              </div>
              <div>
                <label htmlFor='date' className="block text-sm font-medium text-left text-gray-700">Total Weight</label>

                <input type="text" placeholder="Total Weight" className="w-full p-2 border rounded" value={formData.currentWeight} onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })} />
              </div>
              <div>
                <label htmlFor='date' className="block text-sm font-medium text-left text-gray-700">Target Weight</label>

                <input type="text" placeholder="Target Weight" className="w-full p-2 border rounded" value={formData.targetWeight} onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })} />
              </div>
              <div className="flex justify-end col-span-2">
                <button type="submit"  className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-600">Edit Details</button>
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
