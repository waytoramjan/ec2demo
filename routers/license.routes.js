

module.exports = (app)=>{
    
    const {createDrivingLicense} = require("../controller/drivingLicense.controller")
  
        const  drivingLicenseRouter = require("express").Router();

        drivingLicenseRouter.post("/create",createDrivingLicense)


    
    app.use("/drivingLicense",drivingLicenseRouter)
}

// module.exports = (app)=>{
//     const {createUser} = require("../controller/user.controller")
//         // const userRoutes = app.Router()
//         const userRouter = require("express").Router()
    
//         userRouter.post("/user-create",createUser)
    
    
    
//         app.use("/users", userRouter)
//     }
    