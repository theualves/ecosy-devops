# --- ETAPA 1: DEPS & BUILD ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os arquivos de configuração do Node
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o resto do código fonte
COPY . .

# Cria a versão otimizada de produção
RUN npm run build

# --- ETAPA 2: RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copia apenas os arquivos necessários para rodar
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta 3000
EXPOSE 3000

# Inicia o servidor Next.js
CMD ["npm", "start"]