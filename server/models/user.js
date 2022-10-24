const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true },
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

userSchema.statics.findOneByInfo = function (id) {
  return this.findOne({ userId : id });
};

module.exports = mongoose.model("User", userSchema);