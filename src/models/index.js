const Sequelize = require("sequelize");
let mode = { development: "development", production: "production", test: "test" };

let env = mode.production;
const config = require(__dirname + "/../config/config.json")[env];
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};
db.env = env
db.Sequelize = Sequelize;
db.sequelize = sequelize;

let files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

for (let file of files) {
  let parsedFileName = path.parse(file).name;
  let model = parsedFileName.charAt(0).toUpperCase() + parsedFileName.slice(1);
  db[model] = require(path.join(__dirname, file))(
    sequelize,
    Sequelize.DataTypes
  );
}


db.Categories.belongsTo(db.Place, { foreignKey: "PlaceID" });
db.Place.hasMany(db.Categories, { foreignKey: "PlaceID" });

db.Reviews.belongsTo(db.Place, { foreignKey: "PlaceID" });
db.Place.hasMany(db.Reviews, { foreignKey: "PlaceID" });

db.MenuItem.belongsTo(db.Categories, {foreignKey: "CategoryID"})
db.MenuItem.belongsTo(db.Place, {foreignKey: "PlaceID"})
db.Place.hasMany(db.MenuItem, {foreignKey: "PlaceID"})
db.Categories.hasMany(db.MenuItem, {foreignKey: "CategoryID"})


db.FoodOrder.belongsTo(db.Place, {foreignKey: "PlaceID" })
db.Place.hasMany(db.FoodOrder, {foreignKey: "PlaceID" })

db.MenuItem.hasMany(db.FoodOrderDetail, {foreignKey: "MenuItemID"})
db.FoodOrderDetail.belongsTo(db.MenuItem, {foreignKey: "MenuItemID"})
db.FoodOrderDetail.belongsTo(db.FoodOrder, {foreignKey: "FoID"})
db.FoodOrder.hasMany(db.FoodOrderDetail, {foreignKey: "FoID"})


module.exports = db