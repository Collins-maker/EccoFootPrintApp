const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mssql = require("mssql");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());

// Replace these with your actual MSSQL database credentials
const dbConfig = {
  user: "sa",
  password: "Mtumishi",
  server: "localhost",
  database: "ecofootprintapp",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Initialize MSSQL connection pool
mssql
  .connect(dbConfig)
  .then(() => {
    console.log("Connected to MSSQL");
  })
  .catch((err) => console.error(err));

// Define routes for CRUD operations
app.get("/api/users", async (req, res) => {
  try {
    const result = await mssql.query`SELECT * FROM users.userProfile`;
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  const { userName, email, password } = req.body;
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
});

// ... Implement update and delete routes similarly

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
