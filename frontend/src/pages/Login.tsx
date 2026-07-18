import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'



function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useAuth()

    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        await login(email, password)

        navigate('/dashboard')
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} 
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login