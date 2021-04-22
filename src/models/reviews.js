module.exports = (sequelize, DataType) => {
    const Reviews = sequelize.define(
      "Reviews",
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
        Review: {
          type: DataType.STRING,
          allowNull: false,
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
    return Reviews;
  };
  