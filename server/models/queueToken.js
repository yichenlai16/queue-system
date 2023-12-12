const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const QueueTokenSchema = new mongoose.Schema({
  token: { type: "UUID", default: () => randomUUID() },
  scanned: { type: Boolean, default: false },
  number: { type: Number, required: true },
  date: {
    type: Date,
    default: () => {
      let nowDate = new Date(Date.now());
      return nowDate.toISOString().split("T")[0];
    },
  },
  createdAt: { type: Date, default: Date.now },
});

QueueTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const QueueToken = mongoose.model("QueueToken", QueueTokenSchema);

module.exports = QueueToken;
