module.exports = (app) => {
  const userCtrl = require("../controllers/user.controller");
  const router = require("express").Router();

  router.post("/create", userCtrl.createUser);
  router.get("/", userCtrl.findAllUsers);
  router.post("/login", userCtrl.login);
  app.use("/api/users", router);
};
