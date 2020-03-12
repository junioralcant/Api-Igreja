const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const OfertaSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true
  },
  fieu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fieis",
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

OfertaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Oferta", OfertaSchema);
