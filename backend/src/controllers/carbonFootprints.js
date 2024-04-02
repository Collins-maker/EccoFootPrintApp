const mssql = require('mssql');
const config = require('../config/config');

async function carbonFootprints(req, res) {
    try {
        const userID = req.params.UserID; // Get UserID from URL parameter
        const { selectedFactor, quantity, category, result } = req.body;

        // Connect to the database
        const pool = await mssql.connect(config);

        // Insert data into the database using parameterized query
        const request = pool.request();
        await request.input('userID', mssql.Int, userID)
                     .input('selectedFactor', mssql.VarChar(255), selectedFactor)
                     .input('quantity', mssql.VarChar(255), quantity)
                     .input('category', mssql.VarChar(255), category)
                     .input('result', mssql.VarChar(255), result)
                     .query(`
                         INSERT INTO users.CarbonFootprints (UserID, SelectedFactor, Quantity, Category, Results) 
                         VALUES (@userID, @selectedFactor, @quantity, @category, @result)
                     `);

        // Close the database connection
        await pool.close();

        // Send response to the client
        res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { carbonFootprints };
