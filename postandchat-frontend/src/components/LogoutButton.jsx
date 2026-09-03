import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/api/authApi';
import { logoutState } from '../redux/slices/authSlice';

export default function LogoutButton() {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Backend တွင် Token/Cookie ကို ဖျက်ခိုင်းခြင်း
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(logoutState()); // Redux RAM ထဲမှ Token ကို ရှင်းထုတ်ခြင်း
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}