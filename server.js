// Importar a biblioteca json-server
const jsonServer = require('json-server');

// Criar uma instância do servidor JsonServer 
const server = jsonServer.create();

// Criar um roteador com o arquivo db.json 
const router = jsonServer.router('db.json');

// Middlewares padrão do JsonServer (trata static files, CORS, logger, etc.)
const middlewares = jsonServer.defaults();

// Define a porta em que o servidor irá rodar
const porta = process.env.PORT || 3000;

// Utiliza os middlewares padrão
server.use(middlewares);

// Redireciona a rota raiz '/' diretamente para a tela de login
server.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Usa o roteador do db.json para as rotas da API REST
server.use(router);

// Inicia o servidor na porta definida
server.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});