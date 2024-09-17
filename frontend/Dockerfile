# Use uma imagem base adequada com Node.js atualizado
FROM node:18-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm ci

# Copie o restante do código da aplicação
COPY . .

# Use uma imagem base menor para o ambiente de desenvolvimento
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários do estágio de construção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app .

# Instale as dependências de produção
RUN npm install

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]