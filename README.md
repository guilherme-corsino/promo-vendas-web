# promo-vendas-web

Frontend do PromoVendas — sistema de gestão de estoque e vendas para negócio real de revenda de produtos.

## 🚀 Tecnologias

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Context API (gerenciamento de estado de autenticação)

## 🔐 Funcionalidades

- Autenticação com JWT consumindo a API do PromoVendas
- Gerenciamento de estado global de sessão via Context API
- Rotas protegidas para área administrativa
- Consumo de API REST com tratamento de erros centralizado

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- promo-vendas-api rodando (https://github.com/guilherme-corsino/promo-vendas-api)

### Passo a passo

1. Clone o repositório

```bash
git clone https://github.com/guilherme-corsino/promo-vendas-web.git
cd promo-vendas-web
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.local.example .env.local
```

4. Rode o projeto

```bash
npm run dev
```

Acesse em: http://localhost:3001

## 📁 Estrutura

```
promo-vendas-web/
  src/
    app/
      login/
        page.tsx
      dashboard/
        page.tsx
      layout.tsx
    context/
      AuthContext.tsx
    lib/
      api.ts
    types/
  .env.local.example
  README.md
```

## 🔗 Projeto relacionado

Backend: [promo-vendas-api](https://github.com/guilherme-corsino/promo-vendas-api)