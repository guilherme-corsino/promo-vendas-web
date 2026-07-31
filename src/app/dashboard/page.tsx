'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { apiFetch } from '@/lib/api'
import { Produto } from '@/types/produto'

export default function DashboardPage() {
    const { usuario, logout } = useAuth()
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const data = await apiFetch('/produtos')
                setProdutos(data)
            } catch (err: any) {
                setErro(err.message || 'Erro ao carregar produtos')
            } finally {
                setCarregando(false)
            }
        }

        carregarProdutos()
    }, [])

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
                    <h2 className="text-lg font-semibold mb-4">Meus Produtos</h2>

                    {carregando && <p>Carregando...</p>}
                    {erro && <p className="text-red-500">{erro}</p>}

                    {!carregando && produtos.length === 0 && (
                        <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
                    )}

                    <div className="space-y-3">
                        {produtos.map((produto) => (
                            <div
                                key={produto.id}
                                className="border rounded-md p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{produto.nome}</p>
                                    <p className="text-sm text-gray-500">{produto.categoria}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">R$ {produto.precoVenda}</p>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${produto.status === 'VENDIDO'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}
                                    >
                                        {produto.status === 'VENDIDO' ? 'Vendido' : 'Em estoque'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}