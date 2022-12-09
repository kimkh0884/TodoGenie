const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    start: { type: Date },
    end: { type: Date, required: true},
    state: { type: Number },
  },
  {
    timestamps: true,
  }
);

todoSchema.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

todoSchema.statics.findAll = function (user) {
  return this.find({ owner: user });
};

todoSchema.statics.findByTime = function (user, startDate, endDate) {
  return this.find({
    owner: user, 
    end: {$gte : startDate, $lte : endDate}
  })
}

todoSchema.statics.findTopRank = function () {
  return this.aggregate([
    { "$group": { 
        "_id": '$title', 
        "count": { "$sum": 1 }
    }},

    { "$sort": { "count": -1 } }
]);
}

todoSchema.statics.findOneByInfo = function (user, title) {
  return this.findOne({ owner : user, title : title });
};

todoSchema.statics.findOneById = function(_id) {
  return this.findOne({ _id });
};

todoSchema.statics.deleteById = function (_id) {
  return this.deleteOne({ _id });
};

todoSchema.statics.search = function(keyword) {
  return this.find(
      { $text: { $search: keyword } },
      { score: { $meta: "textScore" } }
  ).sort(
      { score: { $meta: "textScore" } }
  );
}

module.exports = mongoose.model("Todo", todoSchema);