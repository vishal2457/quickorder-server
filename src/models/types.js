module.exports = (sequelize, DataType) => {
    const Types = sequelize.define(
      "Types",
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
        TypeName: {
            type: DataType.STRING,
            allowNull: false
        },
        PhotoURL: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null
        },
        Price: {
            type: DataType.STRING,
            allowNull: false
        },
        Serves:{
          type: DataType.INTEGER,
          allowNull: true
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
    return Types;
  };
  