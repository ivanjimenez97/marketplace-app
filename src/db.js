import { Sequelize } from "sequelize";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";

// Sequelize for PostgreSQL
export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",  // Change dialect to PostgreSQL
  port: DB_PORT,  // Make sure to include the correct port (5432 by default)
  password: DB_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Synchronize the database in development mode only
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev") {
  sequelize
    .sync({ alter: true })  // sync with the PostgreSQL database
    .then(() => {
      console.log("Database Synchronized Successfully.");
    })
    .catch((error) => {
      console.error("Error Synchronizing database: ", error);
    });
}