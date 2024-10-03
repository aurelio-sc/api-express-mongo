import livro from '../models/Livro.js';

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao buscar livros: ${erro.message}`
            })
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao buscar livro: ${erro.message}`
            })
        }
    }    

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);            
            res.status(201).json({
                message: "Criado com sucesso",
                livro: novoLivro
            });
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao cadastrar livro: ${erro.message}`
            })
        }
        
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Livro atualizado com sucesso"
            });
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao atulizar livro: ${erro.message}`
            })
        }
    }

    static async excluirLivroPorId(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json("Livro excluído com sucesso");
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao excluir livro: ${erro.message}`
            })
        }
    }

};

export default LivroController;