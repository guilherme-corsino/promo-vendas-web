'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const { login } = useAuth()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setErro('')
        setCarregando(true)

        try {
            await login(email, senha)
        } catch (err: any) {
            setErro(err.message || 'Erro ao fazer login')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">PromoVendas</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-900"
                            required
                        />
                    </div>

                    {erro && (
                        <p className="text-red-500 text-sm">{erro}</p>
                    )}

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
