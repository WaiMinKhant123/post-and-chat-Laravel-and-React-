import { Routes, Route } from 'react-router-dom';

import Register from '@/pages/Register';
import ProtectedRoute from './protectedRoutes';
import Login from '@/pages/Login';


export default function AppRoutes() {
  return (
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route element={<ProtectedRoute />}>
    
  </Route>
</Routes>
  );}