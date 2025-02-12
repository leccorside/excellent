# Instruções para rodar o projeto 📜

### 1 - SERVIDOR MYSQL ✨
Instalar o servidor MYSQL como Xampp, e executar na porta 3306

## 2 - DELETAR ARQUIVO PACKEGE-LOCK CASO ESTEJA PRESENTE NA RAIZ DO BACKEND ✨
rm package-lock.json

## 3 - INSTALAR MÓDULOS NO BACKEND ✨
npm install --legacy-peer-deps

## 4 - DELETAR ARQUIVO PACKEGE-LOCK CASO ESTEJA PRESENTE NA RAIZ DO FRONTEND ✨
rm package-lock.json

## 5 - INSTALAR MÓDULOS NO FRONTEND ✨
npm install --legacy-peer-deps

## 6 - INSTALAR MÓDULO ADICIONAL NO FRONTEND ✨
npm install @popperjs/core --legacy-peer-deps

## 7 - INICIAR BACKEND ✨
node server.js

## 8 - INICIAR FRONTEND ✨
ng serve

## 9 - ABRIR NO NAVEGADOR ✨
(http://localhost:4200/)