import { useState } from 'react'

import api from '../services/api'



function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const response = await api.post('/auth/login', {
            email, password
        })

        localStorage.setItem('access_token', response.data.access_token)
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