const express = require("express");
const mssql = require("mssql");
const config = require("./src/config/config");
const userRoutes = require("./src/routes/userRoutes");
const footprintRoutes = require('./src/routes/footprintsRoutes');
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
}));

async function startApp() {
    try {
        const pool = await mssql.connect(config);
        console.log("App connected to database");

        app.use((req, res, next) => {
            req.pool = pool;
            next();
        });

        app.use(userRoutes);
        app.use(footprintRoutes);

        const port = process.env.PORT || 5001;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log("Error connecting to the database");
        console.log(error);
    }
}

startApp();
