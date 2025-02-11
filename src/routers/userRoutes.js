const express = require("express");
const userController = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.get("/", (request, response) =>{
    response.send("Welcome Home!")
})

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.patch("/change-password", userController.changePassword);

module.exports = userRouter