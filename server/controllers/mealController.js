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
    });
  }

  static updateMeal(req, res) {
    const {
      name, price, imgPath
    } = req.body;


    Meal.findById(req.params.id)
      .then((meal) => {
        if (!meal) {
          return res.status(400).json({
            status: 'error',
            message: 'Meal not found'
          });
        }

        meal.update({
          name,
          price,
          imgPath
        }).then((updatedMeal) => {
          if (updatedMeal) {
            return res.status(200).json({
              status: 'success',
              message: 'Meal updated Successfully',
              updatedMeal: {
                name: updatedMeal.name,
                price: updatedMeal.price,
                imgPath: updatedMeal.imgPath
              }
            });
          }
        });
      });
  }

  static deleteMeal(req, res) {
    Meal.destroy({ where: { id: req.params.id } })
      .then((deletedStatus) => {
        if (!deletedStatus) {
          return res.status(400).json({
            status: 'error',
            message: 'Meal not found'
          });
        }
        return res.status(200).json({
          status: 'status',
          message: 'Meal Deleted Successfully'
        });
      });
  }
}
