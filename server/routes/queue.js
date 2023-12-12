const express = require("express");
const router = express.Router();
const { body, header, validationResult } = require("express-validator");
const Queue = require("../models/queue");

router.post(
  "/",
  [body("number").exists().withMessage("Number is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { number } = req.body;
    try {
      const queue = new Queue({
        number,
      });
      queue.toJSON().formattedDate;

      await queue.save();
      res.send(queue);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ msg: "Queue number duplicated in same date." });
      } else {
        res.status(500).send(error);
      }
    }
  }
);

router.get(
  "/",
  // [body("date").exists().withMessage("Date is required")],
  async (req, res) => {
    try {
      const { date } = req.query;

      const inDateQueue = await Queue.find({
        date: date,
      });

      const processingQueue = await Queue.findOne({
        status: "processing",
        date: date,
      });
      res.json({
        body: { date: date ? date : "yyyy-mm-dd" },
        inDateProcessingQueue: processingQueue,
        inDateQueue: inDateQueue,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

router.patch("/", async (req, res) => {
  const { number, date, status } = req.body;
  try {
    const queue = await Queue.findOneAndUpdate(
      {
        number: number,
        date: date,
      },
      { status: status },
      { new: true }
    ).orFail();

    res.send(queue);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
