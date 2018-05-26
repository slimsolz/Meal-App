import Model from '../models';

const { Menu } = Model;

export default class MenuController {
  static setMenu(req, res) {
    const { ids } = req.body;
    const idsArray = ids.split(',');

    idsArray.forEach((id) => {
      Menu.create({
        available: true
      }).then(menu => menu.setMeals(id))
        .then(() => res.status(201).json({
          status: 'success',
          message: 'Menu set for the day'
        })).catch(err => err.message);
    });
  }
}
