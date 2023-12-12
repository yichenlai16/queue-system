const express = require("express");
const router = express.Router();
const { body, header, validationResult } = require("express-validator");
const QueueToken = require("../models/queueToken");
const Queue = require("../models/queue");

function getCurrentDate() {
  // 取得今天 YYYY-MM-DD 格式日期
  const currentDate = new Date(Date.now());
  return currentDate.toISOString().split("T")[0];
}
module.exports = (expressWs) => {
  router.ws("/", function (ws, req) {
    const getWss = expressWs.getWss("/");
    ws.onmessage = function (msg) {
      getWss.clients.forEach(function (client) {
        client.send(msg.data);
      });
    };
  });

  router.get("/", async (req, res) => {
    try {
      let queue;
      const { token } = req.query;
      // 用websocket傳資料?? chatgpt
      // 如果query有token
      if (token) {
        // 找token對照的date, number，並先改掃描狀態
        const tokenResult = await QueueToken.findOneAndUpdate(
          {
            token: token,
          },
          {
            scanned: true,
          }
        );

        // 如果找到就進行排隊
        try {
          if (tokenResult) {
            queue = new Queue({
              number: tokenResult.number,
            });

            await queue.save();
          }
        } catch (error) {
          queue = null;
        }
      }

      // 找今天最新的號碼
      const todayNewestQueue = await Queue.findOne({
        date: getCurrentDate(),
      }).sort({ number: -1 });

      let queueNumber;
      // 如果沒找到代表為0
      if (!todayNewestQueue) {
        queueNumber = 0;
      } else {
        queueNumber = todayNewestQueue.number;
      }

      // 建立一個代表今天最新號碼+1的token
      const newQueueToken = new QueueToken({
        date: getCurrentDate(),
        number: queueNumber + 1,
      });
      let refresh_token = newQueueToken.token.toString();
      await newQueueToken.save();
      if (queue) {
        res.json({
          queue: {
            number: queue.number,
            status: queue.status,
            createAt: queue.createdAt,
            // date: queue.date,
          },
          token: refresh_token,
        });
      } else {
        res.json({
          queue: null,
          token: refresh_token,
        });
      }

      // ws
      // 取得 WebSocket 伺服器物件
      const wss = expressWs.getWss("/");
      // console.log(wss);
      // 在這裡使用 WebSocket 傳送文字
      wss.clients.forEach(function (client) {
        // client.send(refresh_token);
        client.send(JSON.stringify({ msg: refresh_token }));
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  });
  return router;
};
