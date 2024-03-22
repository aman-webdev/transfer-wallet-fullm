import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Signin, Signup, Transfer } from './pages'
import { Users } from './components/User'
import { SendMoney } from './components/SendMoney'

function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Users />} />
            <Route path="/send" element={<SendMoney />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App
