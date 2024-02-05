const mssql = require("mssql");
const config = require("../config/config");

// Display registered users
// app.get("/api/users", async (req, res) => {
async function getAllUsers(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    try {
      const result = await mssql.query`SELECT * FROM users.userProfile`;
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// app.post("/api/users",

async function registerUser(req, res) {
  const { userName, email, password } = req.body;
  let sql = await mssql.connect(config);
  if (sql.connected) {
    try {
      const result = await mssql.query`
        INSERT INTO users.userProfile (userName, email, password)
        OUTPUT INSERTED.userName
        VALUES (${userName}, ${email}, ${password})
      `;

      // Check if result.recordset is not undefined and has at least one element
      if (result.recordset && result.recordset.length > 0) {
        res.json({
          success: true,
          "registered User": result.recordset[0].userName,
        });
      } else {
        res
          .status(500)
          .json({ error: "Internal Server Error: No records inserted" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = {
  getAllUsers,
  registerUser,
};
