import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoute from './routes/AppRoute'
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import './ComponentsStyleSheet/login-signup.css';
function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} /> 
        <AppRoute />
      </BrowserRouter>
    </>
  )
}

export default App
