"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class tbl_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_user.init(
    {
      Username: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 8],
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.Password = hashPassword(user.Password);
        },
      },
      sequelize,
      modelName: "tbl_user",
    }
  );
  return tbl_user;
};
