'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.entry.belongsTo(models.user);
    }
  }
  entry.init(
    {
      userId: DataTypes.INTEGER,
      wins: DataTypes.TEXT,
      allies: DataTypes.TEXT,
      growth: DataTypes.TEXT,
      grateful: DataTypes.TEXT,
      threats: DataTypes.TEXT,
      todos: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'entry',
    },
  );
  return entry;
};
