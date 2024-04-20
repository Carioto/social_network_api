const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtContent: { type: String, required: true },
});

const friendSchema = new mongoose.Schema({
  friendName: userSchema.username,
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

userSchema.virtual("friendCount").get(function () {
  return this.posts.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;