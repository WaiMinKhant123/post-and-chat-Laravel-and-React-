import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logoutState } from './redux/slices/authSlice';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetch('http://localhost:8000/api/refresh', {
      method: 'POST',
      credentials: 'include', 
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          dispatch(setCredentials(data)); 
        }
      })
      .catch(() => {
        // Refresh token မရှိရင် သို့မဟုတ် သက်တမ်းကုန်နေရင် silence ထားမည်
      });
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(logoutState());
    }
  };

  return (
    <div>
      <h1>PostAndChat</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '15px', listStyle: 'none' }}>
          {token ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div>
        <Routes>
          {/* Base path '/' ဝင်လာပါက /login သို့ ပို့မည် */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;