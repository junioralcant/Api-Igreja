const { formatToTimeZone } = require("date-fns-timezone");

const Oferta = require("../models/Oferta");
const Fieis = require("../models/Fieis");

class FieisController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.data_min || req.query.data_max) {
      filters.data = {};

      const dataMinFormatada = formatToTimeZone(
        req.query.data_min,
        "YYYY-MM-DD", // formatação de data e hora
        {
          timeZone: "America/Sao_Paulo"
        }
      );

      const dataMaxFormatada = formatToTimeZone(
        req.query.data_max,
        "YYYY-MM-DD", // formatação de data e hora
        {
          timeZone: "America/Sao_Paulo"
        }
      );

      filters.data.$gte = dataMinFormatada;
      filters.data.$lte = dataMaxFormatada;
    }

    const ofertas = await Oferta.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 40,
      populate: ["fieu"],
      sort: "-data"
    });

    return res.json(ofertas);
  }

  async store(req, res) {
    const fieu = await Fieis.findById(req.body.fieu);

    const oferta = await Oferta.create({ ...req.body, nome: fieu.nome });

    return res.json(oferta);
  }

  async show(req, res) {
    const oferta = await Oferta.findById(req.params.id).populate(["fieu"]);

    return res.json(oferta);
  }

  async update(req, res) {
    const oferta = await Oferta.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (req.body.fieu) {
      const fieu = await Fieis.findById(req.body.fieu);

      oferta.nome = fieu.nome;
      await oferta.save();
    }

    return res.json(oferta);
  }

  async delete(req, res) {
    await Oferta.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new FieisController();
