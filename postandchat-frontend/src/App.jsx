import { useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials} from './redux/slices/authSlice';
import AppRoutes from '../src/routes/appRoutes';
import Navbar from './components/navBar';


function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    if (!tokenRef.current) return;
     const checkAuth=async()=>{
      if (!tokenRef.current) return;
    try{
    const res=await fetch('http://localhost:8000/api/refresh', {
      method: 'POST',
      credentials: 'include', 
      headers: { 'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`
       }
    });
     const data=await res.json();

        if (data.access_token) {
          dispatch(setCredentials(data)); 
        }
      }
      catch(error){
        console.error("Token refresh failed");
        dispatch(logoutState());
      }
  };
  checkAuth();
  const FIFTY_FIVE_MINUTES = 55 * 60 * 1000;
    const intervalId = setInterval(checkAuth, FIFTY_FIVE_MINUTES);
    return () => clearInterval(intervalId);
},[dispatch]);

 

  return (
    <div>
     
     <Navbar />
      <h1>PostAndChat</h1>
      <AppRoutes />
    </div>
  );
}

export default App;