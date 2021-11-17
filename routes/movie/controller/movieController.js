const User = require("../../user/model/User");
const Movie = require("../model/Movie");

async function addFavoriteMovie(req, res) {
  try {
    let errObj = {};
    const { title, poster, imdbLink } = req.body;

    if (!title) {
      errObj.title = "No title";
    }

    if (!poster) {
      errObj.poster = "No poster";
    }

    if (!imdbLink) {
      errObj.imdbLink = "No imdb link";
    }

    if (Object.keys(errObj).length > 0) {
      return res.status(500).json({
        message: "error",
        error: errObj,
      });
    }

    const decoded = res.locals.decoded;

    const foundUser = await User.findOne({ email: decoded.email });

    const favorite = new Movie({
      title,
      poster,
      imdbLink,
      owner: foundUser._id,
    });

    const savedFavorite = await favorite.save();

    foundUser.favorites.push(savedFavorite._id);

    await foundUser.save();

    res.json({ message: `${favorite.title} saved to favorites`, favorite });
  } catch (e) {
    res.status(500).json({ message: "error", error: errObj });
  }
}

async function displayFavorites(req, res) {
  const decoded = res.locals.decoded;
  const foundUser = await User.findOne({ email: decoded.email }).populate(
    "favorites"
  );

  res.json({ message: "success", payload: foundUser.favorites });
}
module.exports = {
  addFavoriteMovie,
  displayFavorites,
};
