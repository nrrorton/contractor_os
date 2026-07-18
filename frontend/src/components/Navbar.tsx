import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <nav>
            <h2>ContractorOS</h2>

            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>

                <li>
                    <Link to="/clients">Clients</Link>
                </li>

                <li>
                    <Link to="/projects">Projects</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar