var express = require("express");
const userModel = require("../models/user");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", function (req, res) {
  if (req.body.username && req.body.userPassword) {
    const user = userModel.find(
      (user) =>
        user.username === req.body.username &&
        user.password === req.body.userPassword
    );

    if (user) {
      req.session.userName = user.username;
      return res.redirect("/historial");
    }
  }
  return res.redirect("/login/bad-login");
});

router.get("/bad-login", function (req, res) {
  res.send("Usuario incorrecto, inicie sesión nuevamente");
});

module.exports = router;
