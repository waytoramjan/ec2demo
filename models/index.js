const dbConfig = require("../config/db.config.js");
const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB is Connected");
  })
  .catch((err) => console.log(err));

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log(db);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// sequelize
//   .sync({ alter: true })
//   .then(() => console.log("Tables synced"))
//   .catch((e) => console.log(e));

module.exports = db;
