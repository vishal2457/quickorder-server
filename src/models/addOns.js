module.exports = (sequelize, DataType) => {
    const AddOns = sequelize.define(
      "AddOns",
      {
        ID: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        MenuItemID: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        Description: {
            type: DataType.TEXT,
            defaultValue: null
        },
        AddOn: {
            type: DataType.STRING,
            allowNull: false
        },
        Price: {
            type: DataType.STRING,
            allowNull: false
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
    return AddOns;
  };
  