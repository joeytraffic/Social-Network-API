const Thought = require("../models/Thought");

const thoughtController = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: "Failed to get thoughts" });
    }
  },

  getSingleThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to get thought" });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      const thought = await Thought.create({ thoughtText, username });

      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to create thought" });
    }
  },

  updateThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to update thought" });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;

      const thought = await Thought.findByIdAndDelete(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json({ message: "Thought deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete thought" });
    }
  },
};

module.exports = thoughtController;
