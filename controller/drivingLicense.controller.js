const { DrivingLicense, User } = require("../models");
const { sequelize } = require("../models/index");
const {
  drivingLicenseValidation,
} = require("./validation/drivingLicense.validation");

exports.createDrivingLicense = async (request, response) => {
  const t = await sequelize.transaction();
  try {
    const body = request.body;
    const { error } = drivingLicenseValidation.validate(body);
    if (error) {
      return response
        .status(400)
        .send({ ack: 0, msg: error.details[0].message });
    }
    const createLicense = await DrivingLicense.create({ ...body });
    await User.update(
      { licenseNo: createLicense.dataValues.id },
      { where: { id: createLicense?.dataValues.userId } }
    );
    // await t.commit();
    response.status(200).send({ status: true, ack: 1, License: createLicense });
  } catch (error) {
    console.log("error");
    // await t.rollback();
    response.status(500).send({ status: false, error: error.message });
  }
};
