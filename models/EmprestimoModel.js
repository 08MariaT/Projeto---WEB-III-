const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emprestimoSchema = Schema ( {
    id : String,
    nome: String,
    valor : Number
});

module.exports = mongoose.model("Emprestimo", emprestimoSchema);