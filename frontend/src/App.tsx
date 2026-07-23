import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { TimerProvider } from './context/TimerContext'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Login from './pages/Login'
import TimeEntries from './pages/TimeEntries'
import Register from './pages/Register'
import Invoices from './pages/Invoices'
import './App.css'



function App() {
  return (
    <TimerProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/time-entries" element={<TimeEntries />} />
                    <Route path="/invoices" element={<Invoices />} />
                </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </TimerProvider>
  )
}

export default App
