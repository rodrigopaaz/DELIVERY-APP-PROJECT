module.exports = (sequelize, DataTypes) => {
    const sales_products = sequelize.define('sales_products', {
      saleId: {type: DataTypes.INTEGER, foreignKey:true, primaryKey:true},
      productId: {type: DataTypes.INTEGER, foreignKey:true,  primaryKey:true},
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });
  
    sales_products.associate = (models) => {
        models.Sales.belongsToMany(models.products, {
          foreignKey: 'saleId',
          otherKey: 'productId',
          through: sales_products,
          as: 'sales',
        });
        models.Products.belongsToMany(models.sales, {
          foreignKey: 'productId',
          otherKey: 'saleId',
          through: sales_products,
          as: 'products',
        });
      };
  
    return sales_products;
  };