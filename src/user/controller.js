const User = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      pass: req.body.pass,
    });
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    if (!token || !newUser) {
      throw new Error("An error occured when creating a new user.");
    }
    delete user["_id"];
    delete user["pass"];
    res.status(200).send({
      msg: `new user created: ${newUser.username}.`,
      user: {
        user,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at CreateUser: ${error}` });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
    if (!user || !token) {
      throw new Error("No user found.");
    }
    delete user["_id"];
    delete user["pass"];
    res.status(200).send({
      msg: `You have logged in successfully. Welcome, ${user.username}.`,
      user: {
        user,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at login: ${error.message}` });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.newPassword) {
      req.user.newPassword = await bcrypt.hash(req.body.newPassword, 8);
      req.result = await User.updateOne(
        { username: req.user.username },
        { pass: req.user.newPassword }
      );
    } else if (req.body.newUsername) {
      req.result = await User.updateOne(
        { username: req.user.username },
        { username: req.body.newUsername }
      );
    }
    if (!req.result) {
      throw new Error("Incorrect credentials.");
    }
    res.status(200).send({ msg: "Request processed.", result: req.result });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ username: req.user.username });
    if (!result) {
      throw new Error("Incorrect credentials.");
    }
    res
      .status(200)
      .send({ msg: `Delete successful: ${req.user.username}`, deleted: true });
  } catch (error) {
    res.status(500).send({ err: `Error at deleteUser: ${error.message}` });
  }
};
