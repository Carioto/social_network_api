const router = require("express").Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");

// routes for /api/thought

// show all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughtdata = await Thought.find({}, "thoughtText");
    console.log(thoughtdata);
    return res.status(200).json(thoughtdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// show one thought
router.get("/:id", async (req, res) => {
  try {
    const thoughtdata = await Thought.findById({ _id: req.params.id });
    return res.status(200).json(thoughtdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// add a thought
router.post("/:id", async (req, res) => {
  try {
    const uname = await User.findById({ _id: req.params.id });
    if (!uname) {
      return res.status(404).json({ message: "that user ID does not exist" });
    }
    const thoughtdata = await Thought.create({
      thoughtText: req.body.text,
      userName: uname.username,
    });
    const idToUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { thoughts: thoughtdata._id } },
    );
    return res.status(200).json(thoughtdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update a thought
router.put("/:id", async (req, res) => {
  try {
    const thoughtdata = await Thought.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { thoughtText: req.body.text } },
    );
    return res.status(200).json(thoughtdata);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete thought
router.delete("/:id", async (req, res) => {
  try {
    const thoughtdata = await Thought.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json(thoughtdata);
  } catch (err) {
    return res.status(200).json(err);
  }
});

router.post('/:id/reactions', async (req,res) => {
  try{
    const reactiondata = await Thought.findByIdAndUpdate(
      {_id:req.params.id},
      {$addToSet:{reactions:req.body}},
    );
    console.log(`\x1b[35m` + reactiondata)
  
  return res.status(200).json(reactiondata);
} catch (err){
  return res.status(500).json(err);
}
});

router.delete("/:id/reactions/:reactionId", async (req, res) => {
  try {
    const reactiondata = await Thought.findByIdAndUpdate(
      { _id: req.params.id },
      {$pull: {reactions: {reactionId: req.params.reactionId}}}
    );
    return res.status(200).json(reactiondata);
  } catch (err) {
    return res.status(200).json(err);
  }
});
module.exports = router;
