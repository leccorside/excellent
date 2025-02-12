# Instruções para rodar o projeto 📜

### 1 - SERVIDOR MYSQL ✨
Instalar o servidor MYSQL como Xampp, e executar na porta 3306 para rodar o banco de dados

### 2 - BANCO DE DADOS ✨
Criar um banco com o nome de "nest_project", e logo após importar o arquivo SQL (nest_project.sql) que está na raiz do projeto

### 3 - DELETAR ARQUIVO PACKEGE-LOCK DA RAIZ DO BACKEND ✨
rm package-lock.json

### 4 - INSTALAR MÓDULOS NO BACKEND ✨
npm install --legacy-peer-deps

### 5 - DELETAR ARQUIVO PACKEGE-LOCK DA RAIZ DO FRONTEND ✨
rm package-lock.json

### 6 - INSTALAR MÓDULOS NO FRONTEND ✨
npm install --legacy-peer-deps

### 7 - INSTALAR MÓDULO ADICIONAL NO FRONTEND ✨
npm install @popperjs/core --legacy-peer-deps

### 8 - INICIAR BACKEND ✨
node server.js

### 9 - INICIAR FRONTEND ✨
ng serve

### 10 - ABRIR NO NAVEGADOR ✨
(http://localhost:4200/)