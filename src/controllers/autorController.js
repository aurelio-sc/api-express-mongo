import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao buscar autores: ${erro.message}`
            })
        }
    }

    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao buscar autor: ${erro.message}`
            })
        }
    }    

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);            
            res.status(201).json({
                message: "Criado com sucesso",
                autor: novoAutor
            });
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao cadastrar autor: ${erro.message}`
            })
        }
        
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Autor atualizado com sucesso"
            });
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao atulizar autor: ${erro.message}`
            })
        }
    }

    static async excluirAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json("Autor excluído com sucesso");
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao excluir autor: ${erro.message}`
            })
        }
    }

};

export default AutorController;