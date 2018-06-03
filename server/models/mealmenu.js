module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('MealMenu', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  MealMenu.associate = (models) => {
    // associations can be defined here
  };
  return MealMenu;
};
