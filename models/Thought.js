const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
thoughtSchema.virtual("formatDate").get(function () {
  return this.createdAt.toString();
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
