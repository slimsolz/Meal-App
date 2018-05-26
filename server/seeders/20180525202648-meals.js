module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Meals', [{
    name: 'Beans and Bread',
    price: 350,
    imgPath: 'images/bb.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Eba and Efo',
    price: 350,
    imgPath: 'images/ebaefo.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Wheat and Efo',
    price: 350,
    imgPath: 'images/wheatefo.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Jollof and Chicken',
    price: 350,
    imgPath: 'images/jrice.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Emala and ewedu',
    price: 350,
    imgPath: 'images/emelaewedu.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Fufu and Egusi',
    price: 350,
    imgPath: 'images/fufuegusi.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Meals')
};
