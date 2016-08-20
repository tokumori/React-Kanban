'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var statuses = [
      {
        status_type: 'Queue',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        status_type: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        status_type: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    return queryInterface.bulkInsert('statuses', statuses, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('statuses');
  }
};
