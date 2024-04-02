const mssql = require('mssql');
const config = require('../config/config');

async function carbonFootprints(req, res) {
    try {
        const userID = req.params.UserID;
        const { selectedFactor, quantity, category, result } = req.body;

        // Connect to the database
        await mssql.connect(config);

        // Insert data into the database
        await mssql.query`INSERT INTO CarbonFootprints (UserID, SelectedFactor, Quantity, Category, Result) 
                            VALUES (${userID}, ${selectedFactor}, ${quantity}, ${category}, ${result})`;

        // Close the database connection
        await mssql.close();

        // Send response to the client
        res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { carbonFootprints };
