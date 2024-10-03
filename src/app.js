import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão: ", erro);
});

conexao.once("open", () => {
    console.log("Conectado ao banco de dados!");
})

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: 'Senhor dos Aneis',
    },
    {
        id: 2,
        titulo: 'O Hobbit',
    },
];

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id === Number(id));
}

app.get('/', (req, res) => {
    res.status(200).send('API com Express.js e MongoDB');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).json(livros);
});

app.put('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros[index]);
});

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send('livro excluido com sucesso!');
});

export default app;

