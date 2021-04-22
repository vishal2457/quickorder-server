module.exports = (sequelize, DataType) => {
    const FoodOrder = sequelize.define(
      "Food_Order",
      {
        ID: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        PlaceID: {
          type: DataType.INTEGER,
          allowNull: false
        },
       TableNo: {
           type: DataType.INTEGER,
           allowNull: false,
       },
       OrderNo: {
         type: DataType.INTEGER,
         allowNull: false,
       },
        TotalAmount: {
          type: DataType.STRING,
          allowNull: false,
        },
        OrderStatus: {
          type: DataType.ENUM({
            values: [
              "Pending",
              "Finished"
            ],
          }),
          defaultValue: "Pending",
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
    return FoodOrder;
  };
  