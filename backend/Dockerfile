# Use a imagem oficial do Node.js como base
FROM node:18

# Crie o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compilar o projeto
RUN npm run build

# Expor a porta na qual a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
