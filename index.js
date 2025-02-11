const express = require("express");
const connectDb = require("./src/config/db.js");
const orphanageRouter = require("./src/routers/orphanageRoutes.js");
const userRouter =  require("./src/routers/userRoutes.js");

const app = express();
app.use(express.json());

const port = 8000;

connectDb();

app.use("/api/v1/orphanage", orphanageRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
    console.log(`NGO expense tracker listening at http://localhost:${port}`)
});
