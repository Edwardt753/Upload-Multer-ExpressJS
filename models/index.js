require("dotenv").config();
const dbConfig = require("./database");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = require("./admin")(sequelize, DataTypes);

// Synchronize Sequelize Model and Actual Datatables in SQL
db.sequelize
  .sync({ force: false })
  // .sync({ force: true }) // force sync --> remove old and create new
  // .sync({ alter: true }) // sync update --> update existing table only
  .then(async () => {
    console.log("Synchronization completed.");
    // Call seeder file to seed the database based on .env conditional
  });

module.exports = db;
