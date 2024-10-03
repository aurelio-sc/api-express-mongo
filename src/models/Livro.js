import mongoose from "mongoose";

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
    }
}, {versionKey: false});

//mongoose.Schema.Types.String é a mesma coisa que String

const livro = mongoose.model('livros', livroSchema); //livros é a coloeção e livroSchema é o schema. No SQL, livros seria a tabela.

export default livro;