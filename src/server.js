import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import connectDB from "./config/db.js";

import linkRoutes from "./routes/linkRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import crawlRoutes from "./routes/crawlRoutes.js";

const app = express();
app.use(express.json());

const startServer = async () => {
  await connectDB();

  app.use("/api", linkRoutes);
  app.use("/api", adminRoutes);
  app.use("/api", crawlRoutes);
  
  const PORT = process.env.PORT || 3000;  

  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
};

startServer();
