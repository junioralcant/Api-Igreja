const express = require("express");

const route = express.Router();

const FieisController = require("./controllers/FieisController");
const DizimoController = require("./controllers/DizimoController");

route.get("/fieis", FieisController.index);
route.post("/fieis", FieisController.store);
route.get("/fieis/:id", FieisController.show);
route.put("/fieis/:id", FieisController.update);
route.delete("/fieis/:id", FieisController.delete);

route.get("/dizimos", DizimoController.index);
route.post("/dizimos", DizimoController.store);
route.get("/dizimos/:id", DizimoController.show);
route.put("/dizimos/:id", DizimoController.update);
route.delete("/dizimos/:id", DizimoController.delete);

module.exports = route;
