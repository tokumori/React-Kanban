'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_task = sequelize.define('user_task', {
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_task;
};