module.exports = (sequelize, DataType) => {
    const MenuItem = sequelize.define(
      "Menu_Item",
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
        CategoryID: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        Description: {
            type: DataType.TEXT,
            allownull: true,
            defaultValue: null
        },
        Name: {
            type: DataType.STRING,
            allowNull: false
        },
        PhotoURL: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null
        },
        FoodType: {
          type: DataType.ENUM({
            values: [
              "Veg",
              "NonVeg"
            ],
          }),
          defaultValue: "Veg",
          allowNull: true,
        }, 
        Price: {
            type: DataType.STRING,
            allowNull: false
        },
        Ingredients:{
            type: DataType.TEXT,
            defaultValue: null

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
    return MenuItem;
  };
  