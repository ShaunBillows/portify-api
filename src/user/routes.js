const { Router } = require("express");

const userRouter = Router();
const {
  createUser,
  deleteUser,
  login,
  updateUser
} = require("./controller");
const {
  updatePlaylist,
  createPlaylist,
  mergePlaylist,
  deletePlaylist
} = require("../playlist/controller");
const { hashPass, checkPass, checkToken } = require("../middleware");

userRouter.get("/login", checkToken, login);
userRouter.post("/login", checkPass, login);
userRouter.post("/user", hashPass, createUser);
userRouter.delete("/user", checkToken, deleteUser);
userRouter.patch("/user", checkToken, checkPass, updateUser);

// reads all users playlists
// userRouter.get("/playlist", checkToken, readPlaylists)
// change one track in a playlist
userRouter.patch("/playlist", checkToken, updatePlaylist)
// creates a new playlist
userRouter.post("/playlist", checkToken, createPlaylist)
// merges two playlists, creates new playlist
userRouter.post("/merge", checkToken, mergePlaylist)
// deletes playlist
userRouter.delete("/playlist", checkToken, deletePlaylist)

module.exports = userRouter;

