const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  status: {
    type: String,
    enum: ["waiting", "processing", "completed", "closed"],
    default: "waiting",
  },
  date: {
    type: Date,
    default: () => {
      let nowDate = new Date(Date.now());
      return nowDate.toISOString().split("T")[0];
    },
  },
  createdAt: { type: Date, default: Date.now },
});

queueSchema.index({ date: 1, number: 1 }, { unique: true });

const Queue = mongoose.model("Queue", queueSchema);

module.exports = Queue;
