import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App