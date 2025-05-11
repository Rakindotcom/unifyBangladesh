import React from 'react'
import Header from './Components/Header'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Components/Footer'

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer />
      <Footer />
    </>
  )
}

export default App