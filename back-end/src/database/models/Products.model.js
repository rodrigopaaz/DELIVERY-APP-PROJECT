module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define(
'products', 
{
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING,
    },
{
      timestamps: false,
      tableName: 'products',
      underscored: true,
    },
);

    return products;
  };