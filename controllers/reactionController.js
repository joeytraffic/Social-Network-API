const { Thought } = require("../models");

const reactionController = {
  addReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = reactionController;
