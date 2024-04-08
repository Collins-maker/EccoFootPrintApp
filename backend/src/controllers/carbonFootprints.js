const mssql = require("mssql");
const config = require("../config/config");
const sendMail = require("../utils/sendMail");
const markup = require("../utils/markup");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function carbonFootprints(req, res) {
  const footprints = req.body;

  console.log("checking the user", footprints);

  try {
    // Get JWT token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token and decode the payload
    const decodedToken = jwt.verify(token, process.env.SECRET); // Replace 'your_secret_key' with your actual secret key
    const userId = decodedToken.userId; // Assuming your JWT payload contains userId
    // const user = decodedToken;

    const { selectedFactor, quantity, category, result } = req.body;

    // Connect to the database
    const pool = await mssql.connect(config);

    // Insert data into the database using parameterized query
    const request = pool.request();
    await request
      .input("UserID", mssql.Int, userId) // Use userId obtained from JWT token
      .input("selectedFactor", mssql.VarChar(255), selectedFactor)
      .input("quantity", quantity)
      .input("category", category)
      .input("result", result).query(`
         INSERT INTO users.CarbonFootprints (UserID, SelectedFactor, Quantity, Category, Results) 
         VALUES (@UserID, @selectedFactor, @quantity, @category, @result)
      `);

    // Fetch the inserted data from the database
    const results = await pool.request().input("userID", mssql.Int, userId)
      .query(`
        SELECT TOP 1 *
        FROM users.CarbonFootprints
        WHERE UserID = @userID
        ORDER BY DateRecorded DESC;
      `);

    console.log("Database results:", results.recordset);

    const footprintResult = results.recordset[0];

    // Fetch user details from the database based on UserID
    const userDetails = await pool.request().input("UserID", mssql.Int, userId)
      .query(`
        SELECT *
        FROM users.Users
        WHERE UserID = @UserID;
      `);

    // Access the user details
    const user = userDetails.recordset[0];

    // Close the database connection
    await pool.close();

    // Return success response with user details
    return res.status(201).json({
      success: true,
      message: "Carbon Footprints successfully keyed in",
      user: user,
      footprintResult: footprintResult,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function goals(req, res) {
  try {
    // Get JWT token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token and decode the payload
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;

    console.log("Decoded token is here: ", decodedToken);
    const pool = await mssql.connect(config);

    // Insert data into the database using parameterized query

    const userDetails = await pool.request().input("UserID", mssql.Int, userId)
      .query(`
        SELECT *
        FROM users.Users
        WHERE UserID = @userId;
      `);

    // Access the user details
    const user = userDetails.recordset[0];

    // Extract goals object from the request body
    const { Goals } = req.body;

    // Extract individual goals for each category
    const { Fuel, CleanEnergy, BooksAndCellulosePapers } = Goals;

    // Connect to the database
    const pool1 = await mssql.connect(config);

    // Insert goals into the database
    const request = pool1.request();
    await request
      .input("UserID", mssql.Int, userId)
      .input("Fuel", mssql.Int, Fuel)
      .input("CleanEnergy", mssql.Int, CleanEnergy)
      .input("BooksAndCellulosePapers", mssql.Int, BooksAndCellulosePapers)
      .query(`
         INSERT INTO users.Goals (UserID, Fuel, CleanEnergy, BooksAndCellulosePapers) 
         VALUES (@UserID, @Fuel, @CleanEnergy, @BooksAndCellulosePapers)
      `);

    // Fetching the Carbon Foot print results results from the database
    const results = await pool.request().input("userID", mssql.Int, userId)
      .query(`
  SELECT TOP 1 *
  FROM users.CarbonFootprints
  WHERE UserID = @userId
  ORDER BY DateRecorded DESC;
`);
    console.log("Database results:", results.recordset);

    const footprintResult = results.recordset[0];

    const goalsFromDatabase = await pool
      .request()
      .input("userID", mssql.Int, userId).query(`
SELECT TOP 1 *
FROM users.Goals
WHERE UserID = @userId
ORDER BY GoalDate DESC;
`);
    console.log("Goals Database results:", results.recordset);

    const GoalsD = goalsFromDatabase.recordset[0];

    const html = await markup("./src/views/footprints.ejs", {
      name: user.username,
      selectedFactor: footprintResult.SelectedFactor,
      quantity: footprintResult.Quantity,
      category: footprintResult.Category,
      result: footprintResult.Results,
      totalresult: footprintResult.TotalResults,

      text1:
        "We are so glad that you took a courageous step to calculate Your carbon footprints With us. Here are the results  and the goals you have set to make sure we keep you in truck and updated!",

      text: "Below are the goals that you have set for various factors",

      Fuel: GoalsD.Fuel,
      CleanEnergy: GoalsD.CleanEnergy,
      BooksAndCellulosePapers: GoalsD.BooksAndCellulosePapers,
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
    console.log("This is the receivers Email: ", user.email);

    await sendMail(message_options);

    // Close the database connection
    await pool.close();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Goals successfully saved",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { carbonFootprints, goals };
