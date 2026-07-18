import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Login from './pages/Login'
import './App.css'



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/projects" element={<Projects />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
