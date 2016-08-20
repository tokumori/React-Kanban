'use strict';

var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var tasks = [];
    for (var i = 0; i < 5; i++) {
      var taskData = {
        title: faker.lorem.words(),
        priority: faker.random.number(5),
        status_id: faker.random.number(3),
        created_by: faker.random.number(5),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tasks.push(taskData);
    }
    return queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks');
  }
};
