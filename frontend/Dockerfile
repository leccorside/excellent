# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Compile o projeto Angular
RUN npm run build --prod

# Instale o servidor HTTP para servir o aplicativo Angular
RUN npm install -g http-server

# Exponha a porta que o servidor HTTP usará
EXPOSE 8080

# Comando para iniciar o servidor HTTP
CMD ["http-server", "dist/<nome-do-seu-projeto>"]

# Substitua <nome-do-seu-projeto> pelo nome da pasta do seu projeto
