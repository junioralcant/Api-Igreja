const { formatToTimeZone } = require("date-fns-timezone");

const Dizimo = require("../models/Dizimo");
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

    const dizimos = await Dizimo.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 40,
      populate: ["fieu"],
      sort: "-data"
    });

    return res.json(dizimos);
  }

  async store(req, res) {
    const fieu = await Fieis.findById(req.body.fieu);

    const dizimo = await Dizimo.create({ ...req.body, nome: fieu.nome });

    return res.json(dizimo);
  }

  async show(req, res) {
    const dizimo = await Dizimo.findById(req.params.id).populate(["fieu"]);

    return res.json(dizimo);
  }

  async update(req, res) {
    const dizimo = await Dizimo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (req.body.fieu) {
      const fieu = await Fieis.findById(req.body.fieu);

      dizimo.nome = fieu.nome;
      await dizimo.save();
    }

    return res.json(dizimo);
  }

  async delete(req, res) {
    await Dizimo.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new FieisController();
