# English 90

> 90 dias · 15 minutos por dia · Repetição espaçada · Progresso real

Um Progressive Web App (PWA) para acompanhar um plano estruturado de 90 dias de aprendizado de inglês — com vocabulário diário, produção de frases e revisões automáticas por repetição espaçada.

---

## Funcionalidades

- **Lição diária** — 2 palavras novas por dia, com exemplos e exercícios de produção
- **Repetição espaçada** — revisões automáticas agendadas em +1, +3, +7, +15 e +30 dias
- **Sequência (streak)** — acompanhamento de dias consecutivos praticados
- **Calendário de 90 dias** — visão geral do progresso dia a dia
- **Banco de vocabulário** — todas as palavras aprendidas, pesquisáveis e filtráveis
- **Exportação de dados** — download do seu progresso em JSON ou CSV
- **Funciona offline** — Service Worker cacheia o app para uso sem internet
- **Instalável** — pode ser instalado na tela inicial do celular (PWA)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Autenticação & Banco | Supabase (Postgres + Auth) |
| Offline | Service Worker (cache-first) |
| Deploy | Vercel |

---

## Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Conta no [Supabase](https://supabase.com) (gratuita)
- Conta na [Vercel](https://vercel.com) (gratuita, opcional para deploy)

---

## Configuração Local

### 1. Clone e instale as dependências

```bash
git clone https://github.com/FelipeMeiraIA/english-90.git
cd english-90
npm install
```

### 2. Crie um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) → **New Project**
2. Anote a **Project URL** e a **anon key** (Settings → API)

> ⚠️ Use sempre a **anon key**, nunca a `service_role` key.

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 4. Configure o banco de dados

No painel do Supabase → **SQL Editor**, execute os scripts na ordem:

```
1. supabase/schema.sql   → cria todas as tabelas e triggers
2. supabase/rls.sql      → ativa o Row Level Security
3. supabase/seed.sql     → popula os 90 dias de currículo
```

### 5. Configure a autenticação

No painel do Supabase → **Authentication → URL Configuration**:

- **Site URL:** `http://localhost:3000` (desenvolvimento)
- **Redirect URLs:** adicione `http://localhost:3000/auth/callback`

### 6. Rode localmente

```bash
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Deploy na Vercel

### 1. Suba o repositório para o GitHub

```bash
git add .
git commit -m "feat: initial commit"
git remote add origin https://github.com/seu-usuario/english-90.git
git push -u origin main
```

### 2. Importe na Vercel

1. Acesse [vercel.com](https://vercel.com) → **New Project** → importe do GitHub
2. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Clique em **Deploy**

### 3. Atualize as URLs no Supabase

Após o deploy, adicione sua URL da Vercel no Supabase:

- **Authentication → URL Configuration → Redirect URLs:**
  `https://seu-app.vercel.app/auth/callback`

---

## Estrutura do Projeto

```
english-90/
├── app/
│   ├── (auth)/
│   │   └── login/            # Tela de login (magic link)
│   ├── (app)/
│   │   ├── dashboard/        # Painel de progresso e sequência
│   │   ├── today/            # Lição do dia (coração do app)
│   │   ├── calendar/         # Grade de 90 dias
│   │   ├── items/            # Banco de vocabulário
│   │   ├── settings/         # Exportar dados, resetar, configurações
│   │   └── onboarding/       # Configuração inicial (primeira vez)
│   ├── api/
│   │   ├── complete-day/     # POST: salva o dia e cria revisões
│   │   ├── mark-review/      # POST: marca revisão como concluída
│   │   └── export/           # GET: exporta dados em JSON ou CSV
│   └── auth/callback/        # Handler de retorno do OAuth
├── components/
│   ├── nav.tsx               # Navegação (lateral no desktop, inferior no mobile)
│   └── sw-register.tsx       # Registro do Service Worker
├── lib/
│   ├── supabase/             # Clientes Supabase (browser e servidor)
│   ├── types.ts              # Interfaces TypeScript
│   └── utils.ts              # Utilitários: datas, repetição espaçada, exportação
├── public/
│   ├── manifest.json         # Manifesto PWA
│   ├── sw.js                 # Service Worker
│   └── icons/                # Ícones do app
└── supabase/
    ├── schema.sql            # Estrutura do banco de dados
    ├── rls.sql               # Políticas de Row Level Security
    └── seed.sql              # Conteúdo dos 90 dias
```

---

## Banco de Dados

```
plan_days          → currículo dos 90 dias (conteúdo estático)
user_profiles      → configurações do usuário (data de início, fuso horário)
user_day_progress  → registro das sessões diárias (frases, notas)
user_items         → vocabulário aprendido por usuário
spaced_reviews     → revisões agendadas (D+1, D+3, D+7, D+15, D+30)
```

Cada usuário acessa **somente seus próprios dados** — garantido pelas políticas de Row Level Security (RLS) do Supabase.

---

## Como Funciona

### Fluxo da lição diária

1. Usuário abre **Hoje**
2. Vê revisões pendentes (até 10, as mais antigas primeiro)
3. Lê os 2 itens novos do dia
4. Escreve 2 frases individuais + 1 frase conectando as duas ideias
5. Opcional: mini-parágrafo e auto-avaliação
6. Clica em **Completar Dia** →
   - Salva o progresso (`user_day_progress`)
   - Registra as 2 palavras aprendidas (`user_items`)
   - Agenda 10 revisões futuras (`spaced_reviews`)

### Repetição espaçada

As revisões são agendadas a partir da data em que o dia foi **completado**:

| Intervalo | Quando revisar |
|---|---|
| +1 dia | Revisão rápida |
| +3 dias | Reforço inicial |
| +7 dias | Consolidação |
| +15 dias | Retenção de médio prazo |
| +30 dias | Retenção de longo prazo |

### As 3 fases dos 90 dias

| Fase | Dias | Foco |
|---|---|---|
| Fase 1 | 1–30 | Base: conectores, estruturas, verbos essenciais |
| Fase 2 | 31–60 | Tópicos: negócios, tecnologia, mentalidade, finanças |
| Fase 3 | 61–90 | Avançado: argumentação, redações, simulações |

---

## Segurança

- Autenticação via **magic link** por e-mail (sem senha)
- Sessões gerenciadas pelo Supabase com cookies seguros (SSR)
- **Row Level Security** ativo em todas as tabelas — nenhum usuário acessa dados de outro
- Variáveis de ambiente nunca são commitadas (`.gitignore`)

---

## Desenvolvimento

```bash
# Verificar erros de TypeScript
npx tsc --noEmit --watch

# Supabase local (opcional)
npx supabase start
npx supabase db push
```

---

## Licença

MIT — livre para usar, modificar e distribuir.

---

*English 90 — Construído para quem quer consistência e resultado real.*
