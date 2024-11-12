import React, { useContext } from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthContext } from './context/AuthContext'

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
