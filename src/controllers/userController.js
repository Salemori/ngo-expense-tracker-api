const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating user using bcrypt to hash password.
exports.signUp = async (request, response) => {
    try {
        const {firstName, lastName, email, password, phoneNumber} = request.body;

        const userExist = await UserModel.findOne({email:email});

        if(userExist){
            return response.status(409).json({
                status: "failed",
                message: "User already exist"
            });
        }

        //Method 1: Generating SALT Manually using bcrypt
       /* let saltRound = 10;
        let passwordSalt = await bcrypt.genSalt(saltRound); //genSalt() takes a parameter called "salt round"
        let hashedPassword = await bcrypt.hash(password, passwordSalt);
        */

        //Method 2: Hashing without generating SALT : Hash directly
        let saltRound = 10;
        let hashedPassword = await bcrypt.hash(password, saltRound);

        const user = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber
        })

        await user.save();

        console.log(user);
        
        response.status(200).json({
            status: "success",
            message: "User registered successfully"
        });

    } catch (error) {
        response.json({
            status: "failed",
            message: error.message
        });
    }

}

exports.signIn = async (request, response) => {
    try {
        const {email, password} = request.body;

        const user = await UserModel.findOne({email:email});
    
        if(!user){
            return response.status(409).json({
                status: "failed",
                message: "User does not exist"
            });
        } 

        const passwordEqual = await bcrypt.compare(password, user.password);
        if(!passwordEqual){
            return response.status(401).json({
                status: "failed",
                message: "User login failed"
            });
        }

        const token = jwt.sign({id: user._id, email: user.email}, "secretkey" );
        response.status(200).json({
            status: "success",
            message: "User signed-in successfully",
            userData: user,
            token
            // message: `User signed-in successfully ${user.firstName} ${user.lastName}`
        });

    } catch (error) {
            response.json({
            status: "failed",
            message: error.message
        });
    }   
}

exports.getUsers = () => {

}

exports.getUserById = () => {

}

exports.changePassword = () => {

}

exports.deactivateUser = () => {

}