const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const expressWs = require("express-ws")(app);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const queueRouter = require("./routes/queue");
const queueTokenRouter = require("./routes/queueToken")(expressWs);

app.use("/", indexRouter);
app.use("/api/queue", queueRouter);
app.use("/api/queue/token", queueTokenRouter);

// app.use("/users", usersRouter);
// app.use("/api/queuetoken", queuetokenRouter);

module.exports = app;
