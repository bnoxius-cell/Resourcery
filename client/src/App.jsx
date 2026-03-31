import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/authentication/Login'
import Home from './pages/home/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
