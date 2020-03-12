const express = require("express");

const route = express.Router();

const FieisController = require("./controllers/FieisController");

route.get("/fieis", FieisController.index);
route.post("/fieis", FieisController.store);
route.get("/fieis/:id", FieisController.show);
route.put("/fieis/:id", FieisController.update);
route.delete("/fieis/:id", FieisController.delete);

module.exports = route;
