module.exports = (sequelize, DataType) => {
  const Categories = sequelize.define(
    "Categories",
    {
      ID: {
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      PlaceID: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      CategoryName: {
        type: DataType.STRING,
        allowNull: false,
      },
      Description: {
        type: DataType.STRING,
        allowNull: true,
      },
      IsActive: {
        type: DataType.BOOLEAN,
        defaultValue: 1,
      },
      IsDelete: {
        type: DataType.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Categories;
};
