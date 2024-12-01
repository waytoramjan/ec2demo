const Joi = require("joi");

const SignUpValidation = Joi.object({
  name: Joi.string().required().max(50).label("Full Name"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
  mobileNumber: Joi.string().required().label("Mobile number"),
  country: Joi.string().optional().label("country"),
  licenseNo: Joi.string().optional().allow(null).label("licenseNo"),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports = {
  loginValidation,
  SignUpValidation,
};
