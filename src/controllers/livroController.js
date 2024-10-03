import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

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
        const novoLivro = req.body;           
        try {
            const novoAutorId = novoLivro.autor;
            if (novoAutorId) {
                const autorEncontrado = await autor.findById(novoLivro.autor);
                // Na próxima linha de código usamos {...autorEncontrado._doc} em vez de autorEncontrado porque autorEncontrado é um objeto do mongoose com muitas informações.
                // As informações que quereos (os dados do autor) ficam dentro de _doc.
                const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
                const livroCriado = await livro.create(livroCompleto);
            } else {
                const livroCriado = await livro.create(novoLivro);
            }
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
            const novoAutorId = req.body.autor;
    
            
            if (novoAutorId) {
            const autorEncontrado = await autor.findById(novoAutorId);            
            await livro.findByIdAndUpdate(id, { autor: autorEncontrado._doc });
            } else {
            await livro.findByIdAndUpdate(id, req.body);
            }
    
            res.status(200).json({
                message: "Livro atualizado com sucesso"
            });
        } catch (erro) {
            res.status(500).json({
                message: `Falha ao atualizar livro: ${erro.message}`
            });
        }
    }

    static async excluirLivro(req, res) {
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

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosEncontrados = await livro.find({ editora: editora });
            res.status(200).json(livrosEncontrados);
        }
        catch(erro) {
            res.status(500).json({
                message: `Falha ao buscar livros: ${erro.message}`
            })
        }
    }

};

export default LivroController;