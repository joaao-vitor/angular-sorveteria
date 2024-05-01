# Sorveteria Angular

Este é um projeto de exemplo de uma aplicação web de sorveteria desenvolvida com Angular.

## Deploy

Este projeto está atualmente implantado em Vercel. Você pode acessá-lo [aqui](https://angular-sorveteria.vercel.app).

## Pré-requisitos

Antes de começar, verifique se você atende aos seguintes requisitos:

- Você instalou o Node.js e o npm (Node Package Manager).
- Você instalou o Angular CLI globalmente.
- - Você configurou uma variável de ambiente chamada `API_URL` que aponta para a URL da sua API.


## Instalando e executando o projeto

Para instalar e executar o projeto, siga estas etapas:

1. Clone este repositório:

```
git clone https://github.com/joaao-vitor/angular-sorveteria.git
```

2. Navegue até o diretório do projeto:

```
cd angular-sorveteria
```

3. Instale as dependências:

```
npm install
```

4. Execute o servidor de desenvolvimento:

```
npm start
```

O servidor de desenvolvimento será executado em `http://localhost:4200/`.

## Utilizando o JSON Server para simular uma API

Este projeto utiliza o JSON Server para simular uma API REST. O arquivo `db/db.json` contém os dados utilizados pela aplicação.

Para iniciar o servidor JSON, siga estas etapas:

1. Certifique-se de ter o JSON Server instalado globalmente:

```
npm install -g json-server
```

2. Navegue até o diretório `db`:

```
cd db
```

3. Inicie o servidor JSON:

```
json-server --watch db.json
```

O servidor JSON será executado em `http://localhost:3000/`.

