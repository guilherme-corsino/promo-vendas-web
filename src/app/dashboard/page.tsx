'use client'

import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
    const { usuario, logout } = useAuth()

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">PromoVendas</h1>
                    <div className="flex items-center gap-4">
                        <span>Olá, {usuario?.nome}</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p>Dashboard em construção — próximo passo!</p>
                </div>
            </div>
        </div>
    )
}