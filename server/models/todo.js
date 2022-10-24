const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

todoSchema.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

todoSchema.statics.findAll = function () {
  return this.find({});
};

todoSchema.statics.findOneByInfo = function (user, title) {
  return this.findOne({ owner : user, title : title });
};

module.exports = mongoose.model("Todo", todoSchema);