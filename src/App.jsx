import React from 'react'
import Header from './Components/Header'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
import Mission from './Components/Mission'
import NotFound from './Pages/NotFound'
import Refund from './Components/Refund'
import Privacy from './Components/Privacy'
import Terms from './Components/Terms'
import Shipping from './Components/Shipping'
import Homepage from './Pages/Homepage'
import Contact from './Components/Contact'
import FAQ from './Components/FAQ'
import Story from './Components/Story'
import Admin from './Pages/Admin'
import Product from './Pages/Product'

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/mission" element={<Mission />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/story" element={<Story />} />
        <Route path='/product/:id' element={<Product />} />

        <Route path="/admin" element={<Admin />} />


        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
      <Footer />
    </>
  )
}

export default App