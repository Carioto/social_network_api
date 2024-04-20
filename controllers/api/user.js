const router = require("express").Router();
const User  = require("../../models/User");

// routes for /api/user

router.get("/", async (req, res) => {
  try {
    const userdata = await User.find();
    // const users = userdata.map((data) => data.get());
    console.log(userdata);
    res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userdata = await User.findById({ _id: req.params.id });
    if (!userdata) {
      return res.status(404).json({ message: "No user with that ID exists" });
    }
    console.log(userdata)
    return res.json(userdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userdata = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    return res.json(userdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userdata = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
    );
    return res.json(userdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userdata = await User.findByIdAndDelete({ _id: req.params.id });
    if (!userdata) {
      return res.status(404).json({ message: "No user with that ID exists" });
    }
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id/friends/:friendId", async (req, res) => {
  try {
    const addFriend = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
    );
    if (!addFriend) {
      return res.status(404).json({ message: "No user with that ID exists" });
    }
    console.log(addFriend);
    return res.status(200).json({ message: "friend added to user" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id/friends/:friendId", async (req, res) => {
  try {
    const deleteFriend = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId  } },
    );
    console.log(deleteFriend);
    if (!deleteFriend) {
      return res.status(404).json({ message: "No user with that ID exists" });
    }
    return res.status(200).json({ message: "Friend removed from user" });
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
