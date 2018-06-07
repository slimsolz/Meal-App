import Model from '../models';

const { Menu, Meal } = Model;

export default class MenuController {
  static setMenu(req, res) {
    const { ids } = req.body;

    Menu.create({
      available: true
    }).then(menu => menu.addMeals(ids))
      .then(() => res.status(201).json({
        status: 'success',
        message: 'Menu set for the day'
      })).catch(err => res.status(500).json({
        message: 'Something went wrong'
      }));
  }

  static getMenu(req, res) {
    Menu.findAll({
      where: { available: true },
      attributes: ['available'],
      include: [{
        model: Meal,
        attributes: ['name', 'price', 'imgPath']
      }]
    })
      .then((menu) => {
        res.status(200).json({
          status: 'success',
          message: 'Menu for the day',
          menu
        });
      });
  }
}
