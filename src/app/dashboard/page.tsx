'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { apiFetch } from '@/lib/api'
import { Produto, DashboardResumo } from '@/types/produto'

export default function DashboardPage() {
    const { usuario, logout } = useAuth()
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [resumo, setResumo] = useState<DashboardResumo | null>(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const router = useRouter()

    async function carregarDados() {
        try {
            const [produtosData, resumoData] = await Promise.all([
                apiFetch('/produtos'),
                apiFetch('/produtos/dashboard/resumo'),
            ])
            setProdutos(produtosData)
            setResumo(resumoData)
        } catch (err: any) {
            setErro(err.message || 'Erro ao carregar dados')
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        carregarDados()
    }, [])

    async function marcarComoVendido(id: number) {
        try {
            await apiFetch(`/produtos/${id}/vender`, { method: 'PATCH' })
            carregarDados()
        } catch (err: any) {
            setErro(err.message || 'Erro ao marcar como vendido')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">PromoVendas</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Olá, {usuario?.nome}</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {resumo && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-xs text-gray-500">Em estoque</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {resumo.resumo.produtosEmEstoque}
                            </p>
                            <p className="text-xs text-gray-400">
                                R$ {resumo.financeiro.totalInvestidoEstoque} investido
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-xs text-gray-500">Vendidos</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {resumo.resumo.produtosVendidos}
                            </p>
                            <p className="text-xs text-gray-400">
                                R$ {resumo.financeiro.totalVendido} total
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-xs text-gray-500">Investido (vendidos)</p>
                            <p className="text-2xl font-bold text-gray-900">
                                R$ {resumo.financeiro.totalInvestidoVendidos}
                            </p>
                        </div>

                        <div className="bg-green-600 p-4 rounded-lg shadow-md">
                            <p className="text-xs text-green-100">Lucro total</p>
                            <p className="text-2xl font-bold text-white">
                                R$ {resumo.financeiro.lucroTotal}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Meus Produtos</h2>
                        <button
                            onClick={() => router.push('/produtos/novo')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                        >
                            + Novo Produto
                        </button>
                    </div>

                    {carregando && <p className="text-gray-500">Carregando...</p>}
                    {erro && <p className="text-red-500">{erro}</p>}

                    {!carregando && produtos.length === 0 && (
                        <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
                    )}

                    <div className="space-y-3">
                        {produtos.map((produto) => {
                            const compra = Number(produto.precoCompra)
                            const venda = Number(produto.precoVenda)
                            const lucro = venda - compra
                            const margem = compra > 0 ? ((lucro / compra) * 100).toFixed(0) : '0'

                            let diasParaVender: number | null = null
                            if (produto.status === 'VENDIDO' && produto.vendidoEm) {
                                const criado = new Date(produto.createdAt).getTime()
                                const vendido = new Date(produto.vendidoEm).getTime()
                                diasParaVender = Math.round((vendido - criado) / (1000 * 60 * 60 * 24))
                            }

                            return (
                                <div
                                    key={produto.id}
                                    className="border rounded-md p-4 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{produto.nome}</p>
                                        <p className="text-sm text-gray-500">{produto.categoria}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Comprado por R$ {produto.precoCompra} em{' '}
                                            {new Date(produto.createdAt).toLocaleDateString('pt-BR')}
                                        </p>
                                        {produto.status === 'VENDIDO' && produto.vendidoEm && (
                                            <p className="text-xs text-gray-400">
                                                Vendido em {new Date(produto.vendidoEm).toLocaleDateString('pt-BR')}
                                                {diasParaVender !== null && (
                                                    <> · {diasParaVender === 0 ? 'no mesmo dia' : `${diasParaVender} dia(s) em estoque`}</>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">R$ {produto.precoVenda}</p>
                                            <p className="text-xs text-green-600 font-medium">
                                                +R$ {lucro.toFixed(2)} ({margem}%)
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${produto.status === 'VENDIDO'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}
                                            >
                                                {produto.status === 'VENDIDO' ? 'Vendido' : 'Em estoque'}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => router.push(`/produtos/${produto.id}/editar`)}
                                            className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300"
                                        >
                                            Editar
                                        </button>

                                        {produto.status === 'EM_ESTOQUE' && (
                                            <button
                                                onClick={() => marcarComoVendido(produto.id)}
                                                className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700"
                                            >
                                                Marcar vendido
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
