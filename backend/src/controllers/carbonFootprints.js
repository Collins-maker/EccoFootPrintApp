const mssql = require("mssql");
const config = require("../config/config");
const sendMail = require("../utils/sendMail");
const markup = require("../utils/markup");
require("dotenv").config();

async function carbonFootprints(req, res) {
  const footprints = req.body;

  console.log("checking the user", footprints);
  try {
    // Get UserID from the session
    const userID = req.body.UserID;

    const { selectedFactor, quantity, category, result } = req.body;

    // Connect to the database
    const pool = await mssql.connect(config);

    // Insert data into the database using parameterized query
    const request = pool.request();
    await request
      .input("UserID", mssql.Int, userID)
      .input("selectedFactor", mssql.VarChar(255), selectedFactor)
      .input("quantity", quantity)
      .input("category", category)
      .input("result", result).query(`
                         INSERT INTO users.CarbonFootprints (UserID, SelectedFactor, Quantity, Category, Results) 
                         VALUES (@UserID, @selectedFactor, @quantity, @category, @result)
                     `);

    // Fetching the results from the database
    const results = await pool.request().input("userID", mssql.Int, userID)
      .query(`
    SELECT TOP 1 *
    FROM users.CarbonFootprints
    WHERE UserID = @userID
    ORDER BY DateRecorded DESC;
  `);

    console.log("Database results:", results.recordset);

    const footprintResult = results.recordset[0];

    const request1 = pool.request();
    const userDetails = await request1.input("UserID", mssql.Int, userID)
      .query(`
    SELECT *
    FROM users.Users
    WHERE UserID = @UserID;
  `);

    // Access the user details from the re
    const user = userDetails.recordset[0];

    const html = await markup("./src/views/footprints.ejs", {
      name: user.username,
      selectedFactor: footprintResult.SelectedFactor,
      quantity: footprintResult.Quantity,
      category: footprintResult.Category,
      result: footprintResult.Results,
      totalresult: footprintResult.TotalResults,

      text: "We are so glad that you took a courageous step to calculate Your carbon footprints With us. Here are the results to make sure we keep you in truck and updated!",
    });

    // Execute SQL query to select user details

    const message_options = {
      to: user.email,

      from: process.env.USER_EMAIL,

      subject: "Your Carbon FootPrints results",

      html: html,
    };

    console.log("this is the user", user);
    console.log("This is the receivers Email: ", user.email);

    await sendMail(message_options);

    // Close the database connection
    await pool.close();

    return res.status(201).json({
      success: true,
      message: "Carbon Footprints successfully keyed in",
      // data: results.recordset,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { carbonFootprints };
