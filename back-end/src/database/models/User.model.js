// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
'users', 
{
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
    },
{
      timestamps: false,
      tableName: 'users',
      underscored: true,
    },
);
  
    users.associate = (models) => {
      users.hasMany(
models.sales,
        { foreignKey: 'userId', as: 'customer_sale' },
        );
      users.hasMany(
models.sales,
        { foreignKey: 'sellerId', as: 'seller_sale' },
        );
    };
  
    return users;
  };