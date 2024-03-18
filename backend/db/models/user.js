"use strict"; // Koristi strogi režim JavaScript-a

// Uvoz potrebnih modula
const { Model } = require("sequelize"); // Sequelize Model klasa
const bcrypt = require("bcryptjs"); // Modul za hashiranje lozinki

// Izvoz funkcije koja definiše User model
module.exports = (sequelize, DataTypes) => {
  // Definicija User klase koja nasljeđuje Model
  class User extends Model {
    // Metoda za definisanje asocijacija
    static associate(models) {
      // User ima mnogo TaskList-a, Task-ova, WorkHour-a i Comment-a
      User.hasMany(models.TaskList, {
        foreignKey: "owner_id",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Task, {
        foreignKey: "assignee_id",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.WorkHour, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      // User pripada mnogo Team-ova i Project-a
      User.belongsToMany(models.Team, {
        foreignKey: "user_id",
        through: "UserTeam",
        otherKey: "team_id",
      });
      User.belongsToMany(models.Project, {
        foreignKey: "user_id",
        through: "UserProject",
        otherKey: "project_id",
      });
    }
  }

  // Inicijalizacija User modela sa atributima i validacijama
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide your full name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a value for email.",
          },
          isEmail: {
            args: true,
            msg: "Email addresss is not a valid email.",
          },
        },
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide a value for password.",
          },
          len: {
            args: [8, 255],
            msg: "Length needs to be between 8 - 255 characters.",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      roles: {
        type: DataTypes.STRING,
        defaultValue: "Worker",
      },
      
    },
    {
      sequelize, // Sequelize instanca
      modelName: "User", // Ime modela
    }
  );

  // Metoda za validaciju lozinke
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashed_password.toString());
  };

  return User; // Izvoz User klase
};
