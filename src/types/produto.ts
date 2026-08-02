export interface Produto {
    id: number
    nome: string
    descricao: string | null
    categoria: string
    fotoUrl: string | null
    precoCompra: string
    precoVenda: string
    status: 'EM_ESTOQUE' | 'VENDIDO'
    usuarioId: number
    createdAt: string
    updatedAt: string
    vendidoEm: string | null
}

export interface DashboardResumo {
    resumo: {
        totalProdutos: number
        produtosEmEstoque: number
        produtosVendidos: number
    }
    financeiro: {
        totalInvestidoEstoque: string
        totalInvestidoVendidos: string
        totalVendido: string
        lucroTotal: string
    }
}