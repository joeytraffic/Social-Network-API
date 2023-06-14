const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const headCount = async () => {
  const numberOfUsers = await User.aggregate().count("userCount");
  return numberOfUsers;
};

const reactionCount = async (thoughtId) =>
  Thought.aggregate([
    { $match: { _id: new ObjectId(thoughtId) } },
    { $project: { reactionCount: { $size: "$reactions" } } },
  ]);

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
        reactionCount: await reactionCount(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        req.body,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thoughts = await Thought.deleteMany({ username: user.username });

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addThought(req, res) {
    console.log("You are adding a thought");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: { _id: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const { userId, thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $push: { reactions: { reactionBody, username } },
        },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const { userId, thoughtId, reactionId } = req.params;

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $pull: { reactions: { _id: reactionId } },
        },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
