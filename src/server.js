const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/igreja", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {
  return res.send("OK");
});

app.listen(3001);
