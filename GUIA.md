# Guia do Projeto English-90

> Explicado como se voce tivesse 5 anos!

---

## O que e esse projeto?

Imagina que voce quer aprender ingles. Mas nao e so assistir uma aula e pronto. Voce precisa **praticar todo dia**, por **90 dias seguidos** (quase 3 meses!), 15 minutinhos por dia.

Esse projeto e um **aplicativo de computador** que ajuda nisso. Ele e como um diario magico:

- Todo dia ele te mostra **2 palavras novas em ingles**
- Te pede pra escrever **frases** usando essas palavras
- Depois de alguns dias, ele te pergunta de novo sobre as palavras antigas pra ver se voce ainda lembra (isso se chama **repeticao espacada**)
- Ele conta quantos dias seguidos voce praticou (sua **sequencia**)

---

## As Pastas e Arquivos (de cima pra baixo)

### `app/` — As paginas que voce ve na tela

Pensa numa casa. A pasta `app` e a **casa inteira**. Dentro dela tem os comodos.

#### `app/(auth)/` — A porta de entrada da casa

So pra quem ainda nao entrou. Aqui fica o **login**.

- **`login/page.tsx`** — A **porta da casa**. Voce coloca seu email e ela manda uma chave magica por email. Sem isso, nao da pra ver nada.

#### `app/(app)/` — Os comodos da casa (so pra quem ja entrou)

- **`dashboard/page.tsx`** — A **sala principal**. Mostra tudo: quantos dias voce fez, sua sequencia, um grafico da semana. E o "resumo geral" do seu progresso.

- **`today/page.tsx`** — O **comodo mais importante**. E aqui que voce faz a licao do dia! Ele tem essas etapas:
  1. Primeiro mostra palavras antigas pra revisar
  2. Depois mostra as 2 palavras novas do dia
  3. Pede pra voce escrever frases com elas
  4. Pede pra voce conectar as duas ideias numa frase
  5. No final voce marca o dia como **completo!**

- **`calendar/page.tsx`** — O **calendario de 90 dias**. E um quadradinho pra cada dia. Verde = feito, cinza = nao feito ainda. Da pra ver seu progresso visualmente.

- **`items/page.tsx`** — O **dicionario pessoal**. Guarda todas as palavras que voce ja aprendeu nos 90 dias. Da pra pesquisar qualquer palavra.

- **`settings/page.tsx`** — As **configuracoes**. Aqui voce pode baixar seus dados (pra guardar), mudar a data que voce comecou, ou reiniciar tudo do zero.

- **`onboarding/page.tsx`** — A **tela de boas-vindas** (so na primeira vez). Voce escolhe quando quer comecar os 90 dias.

- **`layout.tsx`** — O **esqueleto da casa**. Tem a barra de navegacao que aparece em todas as paginas (as abinhas embaixo no celular ou na lateral no computador).

#### `app/api/` — As "regras secretas" do aplicativo (o motor)

Voce nao ve isso na tela, mas ele funciona por baixo dos panos, como o motor de um carro.

- **`complete-day/route.ts`** — O "motor" que e acionado quando voce clica em "Completar dia". Ele **salva** tudo que voce fez e **agenda** as revisoes futuras.

- **`mark-review/route.ts`** — O "motor" que marca uma palavra de revisao como **ja revisada**.

- **`export/route.ts`** — O "motor" que gera o arquivo pra voce **baixar seus dados**.

#### `app/page.tsx` — A entrada principal

So redireciona voce pro lugar certo (login ou dashboard).

#### `app/layout.tsx` — A estrutura raiz

Define a fonte, as cores gerais e inclui o service worker (pra funcionar sem internet).

---

### `components/` — Pecas reutilizaveis (como peca de Lego)

Sao "blocos" que voce monta em varios lugares.

- **`nav.tsx`** — A **barra de navegacao**. No celular aparece embaixo, no computador aparece na lateral. Tem os botoes: Dashboard, Hoje, Calendario, Palavras, Configuracoes.

- **`sw-register.tsx`** — Um componente invisivel que "liga" o aplicativo offline. Como ligar um gerador de energia pra quando a luz cai.

---

### `lib/` — A "caixa de ferramentas" do programador

Funcoes uteis que varios lugares do codigo usam.

- **`types.ts`** — O **dicionario do codigo**. Define o que e cada coisa (ex: "um usuario tem email, data de inicio, fuso horario..."). E como uma ficha tecnica de cada objeto do sistema.

- **`utils.ts`** — As **ferramentas**. Funcoes que fazem calculos importantes:
  - Qual e o dia de hoje em Brasilia?
  - Em que dia dos 90 estou?
  - Quando devo revisar essa palavra? (+1, +3, +7, +15, +30 dias)
  - Qual e minha sequencia atual?
  - Como baixar um arquivo?

- **`supabase/client.ts`** — Como o aplicativo "fala" com o banco de dados no navegador.

- **`supabase/server.ts`** — Como o servidor "fala" com o banco de dados.

---

### `supabase/` — O banco de dados (onde fica guardado tudo)

Pensa num armario com gavetas. Cada gaveta guarda um tipo de informacao.

- **`schema.sql`** — O **plano do armario**. Cria as gavetas (tabelas):
  - `plan_days` — Os 90 dias do curriculo (palavras, temas, exercicios)
  - `user_profiles` — Dados de cada usuario (email, data de inicio)
  - `user_day_progress` — O que cada usuario fez em cada dia
  - `user_items` — As palavras que cada usuario aprendeu
  - `spaced_reviews` — As revisoes agendadas pra cada usuario

- **`rls.sql`** — As **travas de seguranca**. Garante que voce so ve seus proprios dados (ninguem ve o progresso do outro).

- **`seed.sql`** — O **conteudo dos 90 dias**. Sao 578 linhas com todas as licoes ja prontas (dia 1 ate dia 90, com palavras, exemplos e exercicios).

---

### `public/` — Arquivos publicos (imagens, icones)

- **`manifest.json`** — O "RG" do aplicativo pra celular. Diz o nome, as cores e os icones quando voce instala o app na tela inicial do celular.

- **`sw.js`** — O **servico offline**. Guarda uma copia do app no celular pra funcionar mesmo sem internet.

- **`icons/`** — Os **icones** do aplicativo (as imagenzinhas que aparecem na tela inicial).

---

### Arquivos soltos na raiz

- **`middleware.ts`** — O **seguranca da porta**. Antes de qualquer pagina abrir, ele verifica: "Essa pessoa esta logada?" Se nao, manda pro login. Se ja ta logada e tentou ir pro login, manda pro dashboard.

- **`next.config.js`** — Configuracoes do Next.js (o framework que faz o site funcionar). Aqui configura o cache do service worker.

- **`tailwind.config.js`** — As **cores e estilos** do aplicativo. Define a cor principal (roxo-azulado, chamado indigo) e animacoes.

- **`tsconfig.json`** — Configuracoes do TypeScript (a linguagem de programacao usada). Define que `@/` e um atalho pra pasta raiz do projeto.

- **`package.json`** — A **lista de ingredientes**. Lista todas as bibliotecas externas que o projeto usa (Next.js, React, Supabase, etc.) e os comandos pra rodar.

- **`README.md`** — O **manual do projeto**. Explica como instalar e configurar tudo pra comecar a usar.

- **`.env.example`** — Um **exemplo** de variaveis secretas. Voce copia esse arquivo, renomeia pra `.env.local` e coloca suas chaves do Supabase.

- **`.env`** (nao aparece no git) — As **chaves secretas** reais. Nao e enviado pro GitHub por seguranca.

---

## Como tudo funciona junto? (A historia completa)

```
Voce abre o app no navegador
        |
        v
middleware.ts verifica: "Voce esta logado?"
        |
   Nao esta ---> login/page.tsx (voce coloca o email)
        |
   Esta logado ---> app/(app)/today/page.tsx (a licao do dia!)
        |
        v
A pagina pede os dados pro Supabase (banco de dados)
        |
        v
Voce faz os exercicios do dia
        |
        v
Clica em "Completar Dia"
        |
        v
api/complete-day/route.ts salva tudo e agenda revisoes
        |
        v
Amanha, voce volta e tem revisoes esperando por voce!
```

---

## As 3 Fases dos 90 Dias

| Fase | Dias | O que voce aprende |
|------|------|--------------------|
| **Fase 1** | 1 a 30 | Base: conectores, estruturas, verbos essenciais |
| **Fase 2** | 31 a 60 | Topicos: negocios, tecnologia, mentalidade, financas |
| **Fase 3** | 61 a 90 | Avancado: argumentacao, redacoes, simulacoes |

---

## A Repeticao Espacada (o segredo pra nao esquecer)

Quando voce aprende uma palavra nova, o app agenda revisoes automaticamente:

- **+1 dia** depois: revisao rapida
- **+3 dias** depois: revisao
- **+7 dias** depois: revisao
- **+15 dias** depois: revisao
- **+30 dias** depois: revisao final

Isso faz voce lembrar das palavras por muito mais tempo! E ciencia! Se voce rever uma informacao no momento certo (antes de esquecer), ela fica gravada na sua memoria de longo prazo.

---

## Resumo dos Arquivos mais Importantes

| Arquivo | O que e em uma frase |
|---------|----------------------|
| `app/(app)/today/page.tsx` | A licao do dia (o coracao do app) |
| `app/(app)/dashboard/page.tsx` | Seu painel de progresso |
| `lib/utils.ts` | As contas matematicas importantes |
| `lib/types.ts` | A definicao de cada objeto do sistema |
| `supabase/seed.sql` | As 90 licoes ja prontas |
| `supabase/schema.sql` | A estrutura do banco de dados |
| `middleware.ts` | O seguranca que verifica seu login |
| `components/nav.tsx` | O menu de navegacao |
