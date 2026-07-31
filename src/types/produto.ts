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