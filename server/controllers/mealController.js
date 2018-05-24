import Model from '../models';

const { Meal } = Model;

export default class MealController {
  static addMeal(req, res) {
    const {
      name, price, imgPath
    } = req.body;

    Meal.findOne({ where: { name } }).then((meal) => {
      if (meal) {
        return res.status(409).json({
          status: 'error',
          message: 'Meal already exists'
        });
      }
    });

    Meal.create({
      name, price, imgPath
    }).then((meal) => {
      res.status(201).json({
        status: 'success',
        message: 'Meal added',
        meal: {
          name: meal.name,
          price: meal.price,
          imgPath: meal.imgPath
        }
      });
    }).catch((err) => {
      res.status(500).json({
        status: 'error',
        message: 'Server Error'
      });
    });
  }
}
