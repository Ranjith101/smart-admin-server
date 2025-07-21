module.exports = (app) => {
  const userCtrl = require("../controllers/user.controller");
  const router = require("express").Router();

  router.post("/create", userCtrl.createUser);
  router.get("/", userCtrl.findAllUsers);
  router.post("/login", userCtrl.login);    // For view/edit
  router.put("/:id", userCtrl.updateUser);        // ✅ Edit
  router.delete("/:id", userCtrl.deleteUser);     // ✅ Delete
  router.get("/:id", userCtrl.findUserById);
  app.use("/api/users", router);
  
};
