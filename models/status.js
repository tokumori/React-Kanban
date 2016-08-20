'use strict';
module.exports = function(sequelize, DataTypes) {
  var status = sequelize.define('status', {
    status_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.status.hasMany(models.task, {
          foreignKey: 'status_id'
        });
      }
    }
  });
  return status;
};