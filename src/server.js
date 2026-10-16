import ENV from "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

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
      console.error(`Database connection failed`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
