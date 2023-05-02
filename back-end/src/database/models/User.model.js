module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
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
    });
  
    users.associate = (models) => {
      users.hasMany(models.sales,
        { foreignKey: 'userId', as: 'user_id' },
        { foreignKey: 'userId', as: 'seller_id' },
        );
    };
  
    return users;
  };