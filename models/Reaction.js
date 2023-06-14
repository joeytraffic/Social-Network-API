const { Schema, Types, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughtId: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// const Reaction = model("Reaction", reactionSchema);

module.exports = reactionSchema;
