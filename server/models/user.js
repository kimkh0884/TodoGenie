const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    password : { type: String, required: true },
    salt: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.create = function (payload) {
  const user = new this(payload);
  return user.save();
};

userSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model("User", userSchema);