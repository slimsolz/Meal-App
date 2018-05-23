module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
