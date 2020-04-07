const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/gaselessRouterAbi.js", function(req, res) {
  res.sendFile(__dirname + "/gaselessRouterAbi.js");
});
app.get("/erc712DaiPermit.js", function(req, res) {
  res.sendFile(__dirname + "/erc712DaiPermit.js");
});
app.get("/erc712BiconomyTry.js", function(req, res) {
  res.sendFile(__dirname + "/erc712BiconomyTry.js");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
