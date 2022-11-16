const { Router } = require("express");

const userRouter = Router();
const { createUser, deleteUser, login, updateUser } = require("./controller");
const {
  updatePlaylist,
  createPlaylist,
  mergePlaylist,
  deletePlaylist,
} = require("../playlist/controller");
const { hashPass, checkPass, checkToken } = require("../middleware");

userRouter.get("/login", checkToken, login);
userRouter.post("/login", checkPass, login);
userRouter.post("/user", hashPass, createUser);
userRouter.delete("/user", checkToken, deleteUser);
userRouter.patch("/user", checkToken, checkPass, updateUser);

userRouter.patch("/playlist", checkToken, updatePlaylist);
userRouter.post("/playlist", checkToken, createPlaylist);
userRouter.post("/merge", checkToken, mergePlaylist);
userRouter.delete("/playlist", checkToken, deletePlaylist);

module.exports = userRouter;
