import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/authentication/Login'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
