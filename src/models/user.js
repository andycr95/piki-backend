'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Company);
    }
  };
  User.init({
    identification: {
      type: DataTypes.STRING,
    },
    name: {
       type: DataTypes.STRING
    },
    login: {
       type: DataTypes.STRING
    },
    password: {
       type: DataTypes.STRING
    },
    email: {
       type: DataTypes.STRING
    },
    companyId: {
       type: DataTypes.INTEGER,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    type: {
        type: DataTypes.INTEGER
    },
    phone: {
        type: DataTypes.STRING
     },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};