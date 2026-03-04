const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// Routes
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/songs.routes")


app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

// Serve static files from the built React frontend
const frontendPath = path.join(__dirname, "../public");
app.use(express.static(frontendPath));

// Catch-all: send back index.html for any non-API route (client-side routing)
app.get("/*splat", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});



module.exports = app;