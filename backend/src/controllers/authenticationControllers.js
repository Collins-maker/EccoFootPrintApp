const config = require("../config/config");
const mssql = require("mssql");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

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

async function getSessionDataFromRedis(sessionIdentifier, sessionStore) {
  return new Promise((resolve, reject) => {
    sessionStore.get(sessionIdentifier, (err, session) => {
      if (err) {
        reject(err);
      } else if (!session) {
        // Session not found or expired
        resolve(null);
      } else {
        resolve(session);
      }
    });
  });
}

async function loginUser(req, res) {
  if (req.session.user) {
    // User is already logged in; return user data
    return res.json({
      success: true,
      message: "User already logged in",
      user: req.session.user,
      sessionIdentifier: req.sessionID,
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

    if (user) {
      let passwords_match = await bcrypt.compare(password, user.password);
      if (passwords_match) {
        // Generate JWT token
        const token = jwt.sign(
          { userId: user.UserID, username: user.username },
          process.env.SECRET,
          { expiresIn: "1h" }
        );

        console.log("this is the generated token :", token);

        // Store user data and session identifier in the session
        req.session.user = {
          id: user.UserID,
          username: user.username,
          email_address: user.email,
        };

        // Set UserID in the session
        req.session.userID = user.UserID;

        console.log("UserID set in the sesssion is: ", req.session.userID);

        // Generate session identifier
        const sessionIdentifier = uuidv4();
        req.session.sessionIdentifier = sessionIdentifier;

        req.session.authorized = true;

        console.log("you have logged in as :", username);

        console.log("username from session is:", user.username);
        console.log("id from session is:", user.UserID);
        console.log("email_address from session is:", user.email);

        console.log("session Identifier is :", req.session.sessionIdentifier);

        console.log("this is the logged in user: ", user);

        console.log("session identifier check again: ", sessionIdentifier);

        //send JWT token to the client
        res.json({
          success: true,
          message: "Logged in successfully",
          user: user,
          sessionIdentifier: sessionIdentifier,
          token: token,
        });

        console.log("this is res.json: ", res.json);
      } else {
        res.status(401).json({ success: false, message: "Wrong password" });
      }
    } else {
      res.status(404).json({ success: false, message: "No user found" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// async function restoreSession(req, res) {
//   const { sessionIdentifier } = req.params;

//   try {
//     // Pass req.sessionStore to getSessionDataFromRedis
//     const sessionData = await getSessionDataFromRedis(
//       sessionIdentifier,
//       req.sessionStore
//     );

//     if (sessionData) {
//       // If session data is found, return the user data
//       return res.json({
//         success: true,
//         message: "Session restored successfully",
//         user: sessionData.user,
//       });
//     } else {
//       // If session data is not found or expired, return an error
//       return res.status(404).json({
//         success: false,
//         message: "Session not found or expired",
//       });
//     }
//   } catch (error) {
//     console.error("Error restoring session:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// }

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
