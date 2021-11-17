const jwt = require("jsonwebtoken");

jwtMiddleware = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];

      let decoded = jwt.verify(token, process.env.JWT_SECRET);

      res.locals.decoded = decoded;

      next();
    } else {
      throw {
        message: "You do not have permission",
      };
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
};

module.exports = {
  jwtMiddleware,
};
