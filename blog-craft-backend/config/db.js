const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log("Connected to the database successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
