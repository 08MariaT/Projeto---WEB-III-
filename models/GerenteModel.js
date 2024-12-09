const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gerenteSchema = Schema ( {
    id :Number,
    nome: String,
    email : String
});

module.exports = mongoose.model("Gerente", gerenteSchema);