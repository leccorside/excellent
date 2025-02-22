<div align="center">
  <h1 align="center">
    Desafio Excellent
  </h1>
</div>

<div align="center">

![Versão NODE](http://img.shields.io/static/v1?label=v18.13.0&message=%20NODE&color=GREEN&style=for-the-badge)
![Versão NPM](http://img.shields.io/static/v1?label=v8.19.3&message=%20NPM&color=BLUE&style=for-the-badge)
![Versão NESTJS](http://img.shields.io/static/v1?label=v11.0.2&message=%20NESTJS&color=PINK&style=for-the-badge)
![Versão ANGULAR](http://img.shields.io/static/v1?label=v13.0.0&message=%20ANGULAR&color=PINK&style=for-the-badge)

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NestJs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

</div>

# Instruções para rodar o projeto 📜

### 1 - SERVIDOR MYSQL ✨
Instalar o servidor MYSQL como Xampp, e executar na porta 3306 para rodar o banco de dados

### 2 - BAIXAR O PROJETO ✨
```bash
git clone https://github.com/leccorside/excellent.git
```

### 3 - BANCO DE DADOS ✨
Criar um banco com o nome de "nest_project", e logo após importar o arquivo SQL (nest_project.sql) que está na raiz do projeto

### 4 - DELETAR ARQUIVO PACKEGE-LOCK DA RAIZ DO BACKEND ✨
```bash
rm package-lock.json
```

### 5 - INSTALAR MÓDULOS NO BACKEND ✨
```bash
npm install --legacy-peer-deps
```

### 6 - DELETAR ARQUIVO PACKEGE-LOCK DA RAIZ DO FRONTEND ✨
```bash
rm package-lock.json
```

### 7 - INSTALAR MÓDULOS NO FRONTEND ✨
```bash
npm install --legacy-peer-deps
```

### 8 - INSTALAR MÓDULO ADICIONAL NO FRONTEND ✨
```bash
npm install @popperjs/core --legacy-peer-deps
```

### 9 - INICIAR BACKEND ✨
```bash
node server.js
```

### 10 - INICIAR FRONTEND ✨
```bash
ng serve
```

### 11 - ABRIR NO NAVEGADOR ✨
(http://localhost:4200/)