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

```bash
# clone o repositório
git clone https://github.com/guilherme-corsino/promo-vendas-web.git
cd promo-vendas-web

# instale as dependências
npm install

# configure as variáveis de ambiente
cp .env.local.example .env.local

# rode o projeto
npm run dev
```

Acesse em: http://localhost:3001

## 📁 Estrutura

promo-vendas-web/
├── src/
│ ├── app/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── dashboard/
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── context/
│ │ └── AuthContext.tsx
│ ├── lib/
│ │ └── api.ts
│ └── types/
├── .env.local.example
└── README.md

## 🔗 Projeto relacionado

Backend: [promo-vendas-api](https://github.com/guilherme-corsino/promo-vendas-api)