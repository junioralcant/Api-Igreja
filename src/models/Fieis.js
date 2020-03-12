const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const FieisSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true
  },
  congregacao: {
    type: String,
    require: true
  },
  dataNascimento: {
    type: Date
  },
  endereco: {
    type: String
  },

  cidade: {
    type: String
  },

  bairro: {
    type: String
  },

  numeroResidencia: {
    type: String,
    required: false
  },

  estado: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

FieisSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Fieis", FieisSchema);
