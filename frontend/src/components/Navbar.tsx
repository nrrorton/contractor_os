import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'


function Navbar() {

    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav>
            <h2>ContractorOS</h2>

            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/clients">Clients</Link>
                </li>

                <li>
                    <Link to="/projects">Projects</Link>
                </li>
            </ul>
            
            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default Navbar