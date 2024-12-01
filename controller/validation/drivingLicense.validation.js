const Joi = require("joi");

const drivingLicenseValidation = Joi.object({
  name: Joi.string().required().label("name"),
  permissible: Joi.string().required().label("permissible"),
  licenseValidateFrom: Joi.string().required().label("licenseValidateFrom"),
  licenseValidateUpto: Joi.string().required().label("licenseValidateUpto"),
  address: Joi.string().optional().label("address"),
  mobileNumber: Joi.string().required().label("mobileNumber"),
  country: Joi.string().required().label("country"),
  userId: Joi.number().required().label("userId"),
});

module.exports = {
  drivingLicenseValidation,
};
