import express from "express";
import ENV from "./config/env.js";
import { setServers } from "node:dns/promises";
import connectDB from "./config/db.js";
import debtorsRouter from "./routes/debtors.route.js";
import tabsRouter from "./routes/tabs.route.js";
import reportsRouter from "./routes/reports.route.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(express.json());

const BASE_ROUTE = "/api/v1";

app.use(`${BASE_ROUTE}/debtors`, debtorsRouter);
app.use(`${BASE_ROUTE}/tabs`, tabsRouter);
app.use(`${BASE_ROUTE}/reports`, reportsRouter);

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

app.use(notFound);
app.use(errorHandler);

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
    } else {
      console.error(`Database connection failed ${error.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
