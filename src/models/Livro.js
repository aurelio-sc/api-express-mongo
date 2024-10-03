import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,        
    },
    titulo: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    editora: {
        type: String
    },
    preco: {
        type: Number
    },
    paginas: {
        type: Number
    },
    autor: autorSchema
}, {versionKey: false});

//mongoose.Schema.Types.String é a mesma coisa que String

const livro = mongoose.model('livros', livroSchema); //livros é a coleção e livroSchema é o schema. No SQL, livros seria a tabela.

export default livro;