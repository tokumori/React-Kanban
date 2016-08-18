'use strict';
module.exports = function(sequelize, DataTypes) {
  var task = sequelize.define('task', {
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.task.belongsToMany(models.user, {
          through: models.user_task,
          foreignKey: 'user_id'
        });
      }
    }
  });
  return task;
};