require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const logger = require("./middleware/logger");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Restaurant Management API"
    });
});

app.use("/", authRoutes);

app.use("/restaurants", restaurantRoutes);

app.use("/menu", menuRoutes);


app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
