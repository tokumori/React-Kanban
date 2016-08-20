'use strict';

const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    let users = [];
    for (let i = 0; i < 5; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const userData = {
        username: firstName + lastName,
        first_name: firstName,
        last_name: lastName,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users.push(userData);
    }
    return queryInterface
      .bulkInsert('users', users, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users');
  }
};
