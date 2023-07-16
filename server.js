const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errHandler = require('./middleware/errorHandler');

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use(errHandler.invalidPathHandler);
app.use(errHandler.errorResponseHandler);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is up and listening on port " + PORT);
});
