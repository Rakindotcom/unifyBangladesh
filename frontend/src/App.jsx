import React from 'react'
import Header from './Components/Header'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Components/Footer'
import Profile from './Pages/Profile'

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <ToastContainer />
      <Footer />
    </>
  )
}

export default App