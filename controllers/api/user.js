const router = require("express").Router();
const User = require("../../models/User");

// routes for /api/user

// show all users
router.get("/", async (req, res) => {
  try {
    const userdata = await User.find({});

    console.log(userdata);
    return res.status(200).json(userdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//show one user
router.get("/:id", async (req, res) => {
  try {
    const userdata = await User.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("thoughts")
      .populate("friends");
    if (!userdata) {
      return res.status(404).json({ message: "No user with that ID exists" });
    }
    console.log(userdata);
    return res.status(200).json(userdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//add user
router.post("/", async (req, res) => {
  try {
    const userdata = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    console.log(userdata);
    return res.status(200).json({ message: "User added" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//update user
router.put("/:id", async (req, res) => {
  try {
    const userdata = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
    );
    console.log(userdata);
    return res.json({ message: "User updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete user
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

// add friend
router.post("/:id/friends/:friendId", async (req, res) => {
  try {
    const addFriend = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
    );
    if (!addFriend) {
      return res.status(404).json({ message: "No user with that ID exists" });
    }
    console.log(addFriend);
    return res.status(200).json({ message: "Friend added to user" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete friend
router.delete("/:id/friends/:friendId", async (req, res) => {
  try {
    const deleteFriend = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
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
