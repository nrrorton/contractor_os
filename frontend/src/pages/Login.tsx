import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ui } from '../styles/ui'

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
        <div className={ui.page}>

            <div className="mx-auto mt-20 max-w-md">

                <h1 className={ui.pageTitle}>
                    Login
                </h1>

                <form
                    className={ui.form}
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label className={ui.label}>
                            Email
                        </label>

                        <input
                            className={ui.input}
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div>

                        <label className={ui.label}>
                            Password
                        </label>

                        <input 
                            className={ui.input}
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                        />

                    </div>

                    <button
                        className={ui.button}
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="mt-6 text-sm text-slate-600">

                    Don't have an account?{' '}

                    <Link
                        className="font-medium text-blue-600 hover:underline"
                        to="/register"
                    >
                        Create one
                    </Link>
                    
                </p>

            </div>

        </div>
    )
}

export default Login