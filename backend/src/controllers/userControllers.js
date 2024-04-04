const mssql = require("mssql");
const config = require("../config/config");

// Display registered users
// app.get("/api/users", async (req, res) => {
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

module.exports = {
  getAllUsers,
};
