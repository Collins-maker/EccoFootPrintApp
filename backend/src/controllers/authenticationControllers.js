const config = require("../config/config");
const mssql = require("mssql");
const markup = require("../utils/markup");
const sendMail = require("../utils/sendMail");
const session = require("express-session");
require("dotenv").config();

async function loginUser(req, res) {
  //   if (req.session.user) {
  //     // User is already logged in; return user data
  //     return res.json({
  //       success: true,
  //       message: "User already logged in",
  //       user: req.session.user,
  //     });
  //   }
  let { username, password } = req.body;

  try {
    let sql = await mssql.connect(config);

    let results = await sql
      .request()
      .input("username", username)
      .execute("getUserByUsername");
    let user = results.recordset[0];
    console.log("find", user);
    console.log("Password from database:", user.Password);

    console.log("This is the password :", password);
    if (user) {
      if (password === user.Password) {
        // Store user data in the session
        req.session.user = {
          id: user.UserID,
          username: user.Username,
          email_address: user.Email,
        };
        console.log("Email", req.session.user);
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

module.exports = { loginUser };
