module.exports = (sequelize, DataType) => {
    const Place = sequelize.define(
      "Place",
      {
        ID: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        PlaceName: {
          type: DataType.STRING,
          allowNull: false,
        },
        PlaceSlug: {
            type: DataType.STRING,
            allowNull: false,
          },
        Password: {
            type: DataType.STRING,
            allowNull: false,
          },
          Logo: {
              type: DataType.STRING,
              allowNull: true,
              defaultValue: null
          },
        IsActive: {
          type: DataType.BOOLEAN,
          defaultValue: 1,
        },
        IsDelete: {
          type: DataType.BOOLEAN,
          defaultValue: 0
        }
      },
      {
        freezeTableName: true,
        
      }
    );
    return Place;
  };
  