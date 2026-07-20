import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'


function Layout() {
    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <main className="mx-auto max-w-6xl p-6">

                <Outlet />

            </main>
            
        </div>
    )
}

export default Layout