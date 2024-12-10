import React from 'react'
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import Login from "./components/Login"
import Analytics from "./pages/Analytics/Page"
import UserManagement from "./pages/UserManagement/Page"
import SecureRoute from "./components/SecureRoute"
import Navbar from "./components/Navbar"

const App: React.FC = () => {

  return (
    <Router>
      <Navbar show={false} />
      <Routes>
        <Route path="/" element={<SecureRoute path='/dashboard' />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserManagement />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  )
}

export default App
