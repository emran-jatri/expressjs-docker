const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_SECRET,
  REDIS_IP,
  REDIS_PORT,
} = require("./config/config");

const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({
  legacyMode: true,
  url: `redis://${REDIS_IP}:${REDIS_PORT}`,
  // host: REDIS_URL,
  // port: REDIS_PORT,
});
redisClient
	.connect()
	.then(() => console.log("Redis is connected successfully!"))
  .catch(console.error);

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    // .connect("mongodb://root:example@172.22.0.2:27017/?authSource=admin")
    // .connect("mongodb://root:example@mongo:27017/?authSource=admin")
    .connect(mongoURL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => {
      console.log(error);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    // saveUninitialized: false,
    secret: REDIS_SECRET,
    // resave: false,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.get("/", async (req, res) => {
	await redisClient.set("name", "Any Name");
	req.session.user = { name: "Emran Ibn Shayed"}
  res.send("<h2>Hi there !!!!</h2>");
});

const port = process.env.PORT || 3000;
console.log(
  "🚀 ~ file: index.js ~ line 11 ~ process.env.PORT",
  process.env.PORT
);
app.listen(port, () => console.log("listening on http://localhost:" + port));
