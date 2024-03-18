"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkHour extends Model {
    static associate(models) {
      WorkHour.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      WorkHour.belongsTo(models.Project, {
        foreignKey: "project_id",
      });
    }
  }
  WorkHour.init(
    {
      hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "WorkHour",
    }
  );
  return WorkHour;
};
