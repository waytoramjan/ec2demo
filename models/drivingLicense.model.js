module.exports = (sequelize, DataTypes) => {
  const DrivingLicense = sequelize.define("DrivingLicense", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    permissible: DataTypes.STRING,
    licenseValidateFrom: DataTypes.DATEONLY,
    licenseValidateUpto: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    country: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });
  DrivingLicense.associate = (models) => {
    DrivingLicense.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return DrivingLicense;
};
