import express from "express";
import { setServers } from "node:dns/promises";
import debtorsRouter from "./routes/debtors.route.js";
import tabsRouter from "./routes/tabs.route.js";
import reportsRouter from "./routes/reports.route.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import morgan from "morgan";

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(express.json());
app.use(morgan("dev"));
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

export default app;
