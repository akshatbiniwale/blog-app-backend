const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is up and listening on port " + PORT);
});
