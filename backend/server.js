const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const path = require("path");
const hpp = require("hpp");
const xssClean = require("xss-clean");
const morgan = require("morgan");

const connectDB = require("./utils/database");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Security Middleware
app.use(helmet());
app.use(hpp());
app.use(xssClean());

// Logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS config
app.use(
  cors({
    credentials: true,
  })
);
app.options("*", cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Body parsers
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "SE Info Board API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/", require("./routes/index"));


// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
