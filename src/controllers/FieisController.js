const Fieis = require("../models/Fieis");

class FieisController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const fieis = await Fieis.paginate(filters);

    return res.json(fieis);
  }

  async store(req, res) {
    const fieu = await Fieis.create(req.body);

    return res.json(fieu);
  }

  async show(req, res) {
    const fieu = await Fieis.findById(req.params.id);

    return res.json(fieu);
  }

  async update(req, res) {
    const fieu = await Fieis.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(fieu);
  }

  async store(req, res) {
    const fieu = await Fieis.create(req.body);

    return res.json(fieu);
  }

  async delete(req, res) {
    await Fieis.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new FieisController();
