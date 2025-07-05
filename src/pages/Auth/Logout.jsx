import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/action';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Clear redux user
    dispatch(logout());

    // 2. Optional: clear local/session storage
    localStorage.removeItem('user'); // if you're using localStorage for session
    sessionStorage.removeItem('user'); // if you're using sessionStorage

    // 3. Redirect to login
    navigate('/');
  }, [dispatch, navigate]);

  return null; // or a loading spinner
};

export default Logout;
