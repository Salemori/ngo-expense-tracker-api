const mongoose = require("mongoose");


const connectToDb = async () =>{
    try {
        const connectionString = "mongodb+srv://aduragbemioduntan:admin@cluster0.vx8ik.mongodb.net/ngo_expense_tracker?retryWrites=true&w=majority&appName=Cluster0";
        console.log("Connecting to database...")
        await mongoose.connect(connectionString);
        console.log("Database connection is successful")

    } catch (error) {
        console.log(`An error occured, details:\n${error}`);
    }
}

module.exports = connectToDb;