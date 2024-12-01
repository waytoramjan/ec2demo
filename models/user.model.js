"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    country: DataTypes.STRING,
    licenseNo: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.hasMany(models.DrivingLicense, {
      foreignKey: "userId",
    });
  };
  return User;
};
