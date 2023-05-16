// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
 const sales = sequelize.define(
'sales',
{
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
{
      timestamps: false,
      tableName: 'sales',
      underscored: true,
      },
);

sales.associate = (models) => {
      sales.belongsTo(
models.users,
{ foreignKey: 'userId', as: 'customer' },
);
      sales.belongsTo(
models.users,
{ foreignKey: 'sellerId', as: 'seller' },
);
};

return sales; 
};