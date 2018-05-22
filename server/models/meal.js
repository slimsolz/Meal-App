module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imgPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Meal.associate = (models) => {
    // associations can be defined here
    Meal.hasMany(models.Order, {
      foreignKey: 'mealId',
    });

    Meal.belongsToMany(models.Menu, {
      through: 'MealMenu',
      foreignKey: 'mealId',
      onDelete: 'CASCADE'
    });
  };
  return Meal;
};
