const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.post("/signup", userController.newUserCreate);
userRouter.post('/login', userController.logIn);


module.exports = userRouter;
