const User = require("../user/model");

exports.createPlaylist = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const playlist = req.body.playlist; // sanitise this input
    const title = req.body.title; // sanitise this input
    if (!playlist || !title) {
      throw new Error("Missing fields.");
    }
    if (!Array.isArray(playlist)) {
      throw new Error("playlist must be an array.");
    }
    const result = await User.updateOne(
      { username: user.username },
      { $addToSet: { playlists: { name: title, playlist: playlist } } }
    );
    delete user["_id"];
    delete user["pass"];
    user.playlists.push({ name: title, playlist: playlist });
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at createPlaylist: ${error.message}` });
  }
};

exports.mergePlaylist = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const playlists = req.body.playlists; // sanitise this input
    const title = req.body.title; // sanitise this input
    if (!playlists || !title) {
      throw new Error("Missing fields.");
    }
    const updatedPlaylist = [
      ...new Set(
        playlists
          .reduce((x, y) => [...x, ...y.playlist], [])
          .map(JSON.stringify)
      ),
    ].map(JSON.parse);

    const result = await User.updateOne(
      { username: user.username },
      { $addToSet: { playlists: { name: title, playlist: updatedPlaylist } } }
    );
    delete user["_id"];
    delete user["pass"];
    user.playlists.push({ name: title, playlist: updatedPlaylist });
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at mergePlaylist: ${error.message}` });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const newPlaylist = req.body.newPlaylist; // sanitise this input
    const title = req.body.title; // sanitise this input
    if (!newPlaylist || !title) {
      throw new Error("Missing fields.");
    }
    const updatedPlaylists = user.playlists.map((x) =>
      x.name !== title ? x : { name: title, playlist: newPlaylist }
    );
    result = await User.updateOne(
      { username: user.username },
      { playlists: updatedPlaylists }
    );
    delete user["_id"];
    delete user["pass"];
    user.playlists = updatedPlaylists;
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at updatePlaylist: ${error.message}` });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const playlist = req.body.playlist; // sanitise this input
    const title = req.body.title; // sanitise this input

    if (!playlist || !title) {
      throw new Error("Missing fields.");
    }

    const result = await User.updateOne(
      { username: user.username },
      { $pull: { playlists: { name: title, playlist: playlist } } }
    );
    delete user["_id"];
    delete user["pass"];
    user.playlists = user.playlists.filter((x) => x.name !== title);
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at createPlaylist: ${error.message}` });
  }
};
