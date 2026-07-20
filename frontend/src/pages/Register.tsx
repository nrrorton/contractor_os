import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../services/api'
import { ui } from '../styles/ui'



function Register () {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        await api.post('/auth/register', {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        })

        navigate('/login')
    }

    return (
        <div className={ui.page}>

            <div className="mx-auto mt-12 max-w-md">

                <div className={ui.card}>

                    <h1 className={ui.pageTitle}>
                        Create Account
                    </h1>

                    <form
                        className={ui.form}
                        onSubmit={handleSubmit}
                    >

                        <div>

                            <label className={ui.label}>
                                First Name
                            </label>

                            <input
                                className={ui.input}
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />

                        </div>

                        <div>

                            <label className={ui.label}>
                                Last Name
                            </label>

                            <input
                                className={ui.input}
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />

                        </div>

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

                        <div>

                            <label className={ui.label}>
                                Confirm Password
                            </label>

                            <input
                                className={ui.input}
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />

                        </div>

                        <button
                            className={ui.button}
                            type="submit"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="mt-6 text-sm text-slate-600">

                        Already have an account?{' '}

                        <Link
                            className="font-medium text-blue-600 hover:underline"
                            to="/login"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    )
}

export default Register