const { Schema, model, Mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "registered",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const message = model("message", userSchema);

module.exports = message;
