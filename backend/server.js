const express = require("express");
require("dotenv").config();
const session = require("express-session");
const { v4 } = require("uuid");
const redis = require("redis");
const mssql = require("mssql");
const config = require("./src/config/config");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const authenticationRoutes = require("./src/routes/authenticationRoutes");
const footprintRoutes = require("./src/routes/footprintsRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

async function startApp() {
  try {
    const pool = await mssql.connect(config);
    console.log("App connected to database");

    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis");

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: "",
    });

    const oneDay = 60 * 60 * 1000 * 24;
    app.use(
      session({
        store: redisStore,
        secret: process.env.SECRET,
        saveUninitialized: true,
        genid: () => v4(),
        resave: true,
        rolling: true,
        unset: "destroy",
        cookie: {
          httpOnly: false,
          secure: false, //For production, set to true (HTTPS request)
          maxAge: oneDay,
          domain: "localhost",
        },
      })
    );

    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });
    app.get("/logout", (req, res) => {
      req.session.destroy();
      res.clearCookie("sessionID"); // Replace 'sessionID' with the name of your session cookie
      res.send("Logout successfully");
    });

    app.use(authenticationRoutes);
    app.use(footprintRoutes);

    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
}

startApp();
