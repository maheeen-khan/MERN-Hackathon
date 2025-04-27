import React , {useState, useEffect}from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import PageNotFound from '../pages/PageNotFound';
import UserPanel from '../pages/UserPanel';
import MyLayout from '../components/MyLayout';

const AppRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token);
  }, [location.pathname]); // re-check token on every route change


  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/" element={<LoginForm />} />
      <Route path="/user-panel" element={isLoggedIn ? <MyLayout><UserPanel /></MyLayout> :  <Navigate to="/" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoute