const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    email: 'mainadmin@gmail.com',
    username: 'mainadmin',
    password: bcrypt.hashSync('password', 10),
    role: 'caterer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    email: 'mainuser@gmail.com',
    username: 'mainuser',
    password: bcrypt.hashSync('password111', 10),
    role: 'customer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users')
};
