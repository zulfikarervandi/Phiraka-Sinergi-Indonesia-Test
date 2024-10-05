const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticate");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!")
});
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/list", isAuthenticated, userController.profile);
router.get("/list/:id", isAuthenticated, userController.getById);
router.put("/list/:id", isAuthenticated,userController.edit);
router.delete("/list/:id",isAuthenticated ,userController.delete);

module.exports = router;
