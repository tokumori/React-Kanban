'use strict';

const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    let userTasks = [];
    for (let i = 0; i < 10; i++) {
      const userTasksData = {
        user_id: faker.random.number(5),
        task_id: faker.random.number(5),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      userTasks.push(userTasksData);
    }
    return queryInterface.bulkInsert('user_tasks', userTasks, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user_tasks');
  }
};
