module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  Menu.associate = (models) => {
    // associations can be defined here
    Menu.belongsToMany(models.Meal, {
      through: 'MealMenu',
      foreignKey: 'menuId'
    });
  };
  return Menu;
};
