const { User, DrivingLicense } = require("../models");
const { sequelize } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  loginValidation,
  SignUpValidation,
} = require("./validation/user.validation");

exports.UserSignUp = async (request, response) => {
  try {
    const data = request.body;
    const { error } = SignUpValidation.validate(request.body);
    if (error) {
      return response
        .status(400)
        .send({ status: false, ack: 0, msg: error.details[0].message });
    }
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const createUser = await User.create({
      name: data.name,
      password: hashPassword,
      email: data.email,
      mobileNumber: data.mobileNumber,
      country: data.country,
    });
    delete createUser.dataValues.password;
    response.status(201).json({
      ack: 1,
      status: true,
      msg: " User Signup successfully",
      userData: createUser,
    });
  } catch (error) {
    response.status(500).send({ status: false, message: error.message });
  }
};

// exports.getUsers = async (request, response) => {
//   try {
//     //  const userId = request.params.id;

//     const getUser = await User.findAll({
//       //   where: {
//       //     id: 1,
//       //   },
//       include: { model: DrivingLicense },
//     });

//     response.status(201).json({ status: true, userData: getUser });
//   } catch (error) {
//     response.status(500).send({ status: false, message: error.message });
//   }
// };

exports.UserLogin = async (request, response) => {
  try {
    const body = request.body;
    const { error } = loginValidation.validate(request.body);
    if (error) {
      return response.status(400).send({
        status: false,
        ack: 0,
        msg: error.details[0].message,
      });
    }

    const userCheck = await User.findOne({ where: { email: body.email } });
    if (!userCheck) {
      return response
        .status(400)
        .send({ status: false, ack: 0, msg: "User not found" });
    }

    if (bcrypt.compareSync(body.password, userCheck?.dataValues?.password)) {
      const token = jwt.sign(
        {
          id: userCheck.dataValues.id,
        },
        process.env.SECRET_KEY,
        {
          algorithm: process.env.JWT_ALGORITHM,
          expiresIn: process.env.EXPIRES_IN,
        }
      );
      delete userCheck.dataValues.password;
      return response.status(200).send({
        ack: 1,
        msg: "Login successfully",
        data: { userdata: userCheck, token },
      });
    } else {
      return response
        .status(400)
        .send({ status: false, ack: 0, msg: "Password Invalid" });
    }
  } catch (error) {
    response.status(500).send({ status: false, message: error.message });
  }
};
