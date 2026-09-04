import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton'; 

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="font-bold text-xl">Post & Chat</Link>
      
      <div className="flex gap-4 items-center">
        {token ? (
          <LogoutButton />
        ) : (       
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}