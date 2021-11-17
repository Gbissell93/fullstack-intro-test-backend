var express = require("express");
const {
  validateCreateData,
} = require("./Auth/authCreateUser/validateCreateUser");
const {
  checkIsUndefined,
  checkIsEmpty,
  validateLoginData,
  validateUpdateUser,
} = require("./Auth");
const { jwtMiddleware } = require("./Auth/shared/jwt");
const {
  createUser,
  getAllUsers,
  login,
  updateUser,
} = require("./controller/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", getAllUsers);
router.post(
  "/create-user",
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
  createUser
);
router.post("/login", checkIsUndefined, checkIsEmpty, validateLoginData, login);
router.put(
  "/update-user",
  checkIsUndefined,
  checkIsEmpty,
  validateUpdateUser,
  jwtMiddleware,
  updateUser
);
// router.delete("/delete-user/:id", jwtMiddleware, deleteUser);

module.exports = router;
