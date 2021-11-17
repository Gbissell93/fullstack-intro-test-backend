var express = require("express");
const { jwtMiddleware } = require("../user/Auth/shared/jwt");
const {
  addFavoriteMovie,
  displayFavorites,
} = require("./controller/movieController");

var router = express.Router();

/* GET home page. */
router.get("/my-favorites", jwtMiddleware, displayFavorites);

router.post("/add-to-favorites", jwtMiddleware, addFavoriteMovie);

module.exports = router;
