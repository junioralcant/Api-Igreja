const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("OK");
});

app.listen(3001);
