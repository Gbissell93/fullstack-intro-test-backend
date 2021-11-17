require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const e = require("express");

async function getAllUsers(req, res) {
  try {
    let foundUser = await User.find({});
    res.json({ message: "success", payload: foundUser });
  } catch (e) {
    res.status(500).json({ messsage: "error", error: errObj });
  }
}

async function createUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  let errObj = {};

  try {
    let salt = await bcrypt.genSalt(15);
    let hashedword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedword,
    });

    let savedUser = await newUser.save();

    res.json({
      message: `welcome ${firstName}, you're account has been saved!`,
      payload: savedUser,
    });
  } catch (e) {
    res.status(500).json({ messsage: "error", error: e.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    let foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      return res.status(500).json({ message: "wrong email or password" });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        return res.status(500).json({ message: "wrong email or password" });
      } else {
        let token = jwt.sign(
          {
            email: foundUser.email,
            password: foundUser.password,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );

        res.json({
          message: `Login successful. welcome back ${foundUser.firstName}`,
          payload: token,
        });
      }
    }
  } catch (e) {
    res.status(500).json({ messsage: "error", error: e.message });
  }
}

async function updateUser(req, res) {
  try {
    const { firstName, lastName, username, password, confirmPassword } =
      req.body;

    if (confirmPassword !== password) {
      return res.json({
        message: " confirm password and password must match!",
      });
    } else {
      let token = req.headers.authorization.split(" ")[1];

      let decoded = await jwt.verify(token, process.env.JWT_SECRET);

      let salt = await bcrypt.genSalt(10);
      let hashedword = await bcrypt.hash(password, salt);

      req.body.password = hashedword;

      let updatedUser = await User.findOneAndUpdate(
        { email: decoded.email },
        req.body,
        { new: true }
      );
      let payload = updatedUser;
      res.json({ message: "Profile Updated", payload: payload });
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
}
// delete function still needs a little work
async function deleteUser(req, res) {
  try {
    const foundUser = await User.find({ email: res.locals.decodedData.email });
    console.log(foundUser);

    const deletedUser = await User.findByIdAndDelete(foundUser._id);

    res.json({ message: "success", payload: deletedUser });
  } catch (e) {
    res.json({ message: error, error: e.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
};
