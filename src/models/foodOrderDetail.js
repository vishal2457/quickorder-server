module.exports = (sequelize, DataType) => {
    const FoodOrderDetail = sequelize.define(
      "Food_Order_Detail",
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
       FoID: {
           type: DataType.INTEGER,
           allowNull: false
       },
        ItemPrice: {
          type: DataType.INTEGER,
          allowNull: false,
        }, 
        Quantity: {
          type: DataType.INTEGER,
          allowNull: false
        },
        Amount: {
          type: DataType.INTEGER,
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
    return FoodOrderDetail;
  };
  