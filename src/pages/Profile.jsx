import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const worklogs = useSelector((state) => state.worklogs.worklogs);
  const totalWorkouts = worklogs.length;
  const totalDuration = worklogs.reduce((sum,log) => sum + parseInt(log.duration || 0) , 0);
  const initials = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="max-w-3xl p-6 mx-auto space-y-6">
      
    </div>
  )
}

export default Profile
