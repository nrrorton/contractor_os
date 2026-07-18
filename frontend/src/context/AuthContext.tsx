import { createContext, useState } from 'react'

import api from '../services/api'



interface AuthContextType {
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('access_token')
    })

    async function login(email: string, password: string) {
        const response = await api.post('/auth/login', {
            email, password
        })

        const accessToken = response.data.access_token

        localStorage.setItem('access_token', accessToken)

        setToken(accessToken)
    }

    function logout() {
        localStorage.removeItem('access_token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext