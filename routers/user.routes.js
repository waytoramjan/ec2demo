module.exports = (app) => {
  const { UserSignUp, UserLogin } = require("../controller/user.controller");
  // const userRoutes = app.Router()
  const userRouter = require("express").Router();

  userRouter.post("/user-create", UserSignUp);
  userRouter.post("/user-login", UserLogin);

  app.use("/users", userRouter);
};
