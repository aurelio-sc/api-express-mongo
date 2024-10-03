import express from 'express';
import livros from './livrosRoutes.js';

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("API com Express.js e MongoDB"));

    //A linha a seguir importa todas as rotas de livros (./livrosRoutes.js).
    app.use(express.json(), livros);    
}

export default routes;