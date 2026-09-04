// src/components/LogoutButton.jsx
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/authApi';
import { logoutState } from '../redux/slices/authSlice';

export default function LogoutButton() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap(); 
      if (res) {
        console.log("Logout Success:", res);
      }
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      dispatch(logoutState());
      navigate('/login', { replace: true }); 
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}