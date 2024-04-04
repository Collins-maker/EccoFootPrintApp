const config = require("../config/config");
const mssql = require("mssql");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function registerUser(req, res) {
  let user = req.body;

  let hashed_pwd = await bcrypt.hash(user.password, 8);

  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql
      .request()
      .input("username", user.username)
      .input("email", user.email)
      .input("password", hashed_pwd)
      .execute("registerUser");

    console.log(results);

    if (results.rowsAffected[0] > 0) {
      console.log("This is the user: ", user);

      return res.status(201).json({
        success: true,

        message: "User has been created",

        data: results.recordset,
      });
    }
  } else {
    return res.status(500).json({
      success: false,

      message: "user not inserted",
    });
  }
}

async function loginUser(req, res) {
  if (req.session.user) {
    // User is already logged in; return user data
    return res.json({
      success: true,
      message: "User already logged in",
      user: req.session.user,
    });
  }
  let { username, password } = req.body;

  try {
    let sql = await mssql.connect(config);

    let results = await sql
      .request()
      .input("username", username)
      .execute("getUserByUsername");
    let user = results.recordset[0];
    console.log("find", user);
    console.log("Password from database:", user.password);

    console.log("This is the password :", password);
    if (user) {
      let passwords_match = await bcrypt.compare(password, user.password);
      console.log("password comparison result: ", passwords_match);
      if (passwords_match) {
        // Store user data in the session
        req.session.user = {
          id: user.UserID,
          username: user.username,
          email_address: user.email,
        };
        console.log("user", req.session.user);
        // console.log("Session", req.session);

        req.session.authorized = true;

        res.json({
          success: true,
          message: "Logged in successfully",
          user: user,
        });
      } else {
        res.status(401).json({ success: false, message: "Wrong password" });
      }
    } else {
      res.status(404).json({ success: false, message: "No user found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getAllUsers(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    try {
      const result = await mssql.query`SELECT * FROM users.users`;
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = { registerUser, loginUser, getAllUsers };
