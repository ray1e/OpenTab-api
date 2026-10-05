import express from "express";
import ENV from "./config/env.js";
import { setServers } from "node:dns/promises";
import connectDB from "./config/db.js";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(express.json);

//api health check
app.use("/api/v1/health", (req, res) => {
  res.status(200).json({
    message: "API is running",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: "OK",
  });
});

const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn.readyState === 1) {
      console.log("Database connection succesfully");
      app.listen(ENV.PORT, () => {
        console.log(
          `Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`
        );
      });
    }
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
