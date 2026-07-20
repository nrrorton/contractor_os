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
        <nav className="bg-white border-b shadow-sm">

            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <h2 className="text-xl font-bold">
                    ContractorOS
                </h2>

                <ul className="flex gap-6">

                    <li>
                        <Link 
                            className="text-slate-600 hover:text-slate-900"
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-slate-600 hover:text-slate-900"
                            to="/clients"
                        >
                            Clients
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-slate-600 hover:text-slate-900"
                            to="/projects"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-slate-600 hover:text-slate-900"
                            to="/time-entries"
                        >
                            Time Entries
                        </Link>
                    </li>

                </ul>
                
                <button 
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-900"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    )
}

export default Navbar