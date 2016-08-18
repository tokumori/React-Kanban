'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.belongsToMany(models.task, {
          through: models.user_task,
          foreignKey: 'task_id'
        });
      }
    }
  });
  return user;
};