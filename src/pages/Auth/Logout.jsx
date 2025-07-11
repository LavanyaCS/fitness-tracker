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
      localStorage.removeItem("fitnessUser"); 
    // 3. Redirect to login
    navigate('/');
  }, [dispatch, navigate]);

  return null; // or a loading spinner
};

export default Logout;
