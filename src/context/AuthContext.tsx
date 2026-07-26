'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'

interface Usuario {
    id: number
    nome: string
    email: string
}

interface AuthContextType {
    usuario: Usuario | null
    loading: boolean
    login: (email: string, senha: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario')
        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo))
        }
        setLoading(false)
    }, [])

    async function login(email: string, senha: string) {
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, senha }),
        })

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        setUsuario(data.usuario)
        router.push('/dashboard')
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        setUsuario(null)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ usuario, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider')
    }
    return context
}