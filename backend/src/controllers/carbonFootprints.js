const mssql = require("mssql");
const config = require("../config/config");
const sendMail = require("../utils/sendMail");
const markup = require("../utils/markup");
require("dotenv").config();

async function carbonFootprints(req, res) {
  const user = req.session.user;

  console.log("checking the user", user);
  try {
    const userID = req.params.UserID; // Get UserID from URL parameter
    const { selectedFactor, quantity, category, result } = req.body;

    // Connect to the database
    const pool = await mssql.connect(config);

    // Insert data into the database using parameterized query
    const request = pool.request();
    await request
      .input("userID", mssql.Int, userID)
      .input("selectedFactor", mssql.VarChar(255), selectedFactor)
      .input("quantity", quantity)
      .input("category", category)
      .input("result", result).query(`
                         INSERT INTO users.CarbonFootprints (UserID, SelectedFactor, Quantity, Category, Results) 
                         VALUES (@userID, @selectedFactor, @quantity, @category, @result)
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

    const html = await markup("./src/views/footprints.ejs", {
      name: user.username,
      selectedFactor: footprintResult.SelectedFactor,
      quantity: footprintResult.Quantity,
      category: footprintResult.Category,
      result: footprintResult.Results,
      totalresult: footprintResult.TotalResults,

      text: "We are so glad that you took a courageous step to calculate Your carbon footprints With us. Here are the results to make sure we keep you in truck and updated!",
    });

    const message_options = {
      to: user.email_address,

      from: process.env.USER_EMAIL,

      subject: "Your Carbon FootPrints results",

      html: html,
    };

    console.log("this is the user", user);
    console.log("This is the receivers Email: ", user.email_address);

    await sendMail(message_options);

    return res.status(201).json({
      success: true,

      message: "Carbon Fottprints successfully keyed in",

      // data: results.recordset,
    });

    // Close the database connection
    await pool.close();

    // Send response to the client
    res.status(200).json({ message: "Data saved successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { carbonFootprints };
