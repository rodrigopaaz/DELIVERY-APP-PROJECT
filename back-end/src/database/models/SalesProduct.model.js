/* eslint-disable camelcase */
// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
    const sales_products = sequelize.define(
'sales_products', 
{
      saleId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
      productId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
      quantity: DataTypes.INTEGER,
    },
{
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    },
);
  
    sales_products.associate = (models) => {
        models.sales.belongsToMany(models.products, {
          foreignKey: 'saleId',
          otherKey: 'productId',
          through: sales_products,
          as: 'products',
        });
        models.products.belongsToMany(models.sales, {
          foreignKey: 'productId',
          otherKey: 'saleId',
          through: sales_products,
          as: 'sales',
        });
      };
  
    return sales_products;
  };