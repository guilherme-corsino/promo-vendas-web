'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import { Produto } from '@/types/produto'

export default function EditarProdutoPage() {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precoCompra, setPrecoCompra] = useState('')
    const [precoVenda, setPrecoVenda] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [carregandoDados, setCarregandoDados] = useState(true)
    const router = useRouter()
    const params = useParams()
    const id = params.id

    useEffect(() => {
        async function carregarProduto() {
            try {
                const produto: Produto = await apiFetch(`/produtos/${id}`)
                setNome(produto.nome)
                setDescricao(produto.descricao || '')
                setCategoria(produto.categoria)
                setPrecoCompra(produto.precoCompra)
                setPrecoVenda(produto.precoVenda)
            } catch (err: any) {
                setErro(err.message || 'Erro ao carregar produto')
            } finally {
                setCarregandoDados(false)
            }
        }

        carregarProduto()
    }, [id])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setErro('')
        setCarregando(true)

        try {
            await apiFetch(`/produtos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    nome,
                    descricao: descricao || undefined,
                    categoria,
                    precoCompra: Number(precoCompra),
                    precoVenda: Number(precoVenda),
                }),
            })

            router.push('/dashboard')
        } catch (err: any) {
            setErro(err.message || 'Erro ao atualizar produto')
        } finally {
            setCarregando(false)
        }
    }

    if (carregandoDados) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
                <p className="text-gray-500">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Editar Produto</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-900"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Categoria</label>
                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-900"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Preço de Compra</label>
                            <input
                                type="number"
                                step="0.01"
                                value={precoCompra}
                                onChange={(e) => setPrecoCompra(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-gray-900"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Preço de Venda</label>
                            <input
                                type="number"
                                step="0.01"
                                value={precoVenda}
                                onChange={(e) => setPrecoVenda(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    {erro && <p className="text-red-500 text-sm">{erro}</p>}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => router.push('/dashboard')}
                            className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50 text-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={carregando}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {carregando ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
