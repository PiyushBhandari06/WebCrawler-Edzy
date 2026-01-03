import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { crawlSitemap } from "./crawler/crawlSitemap.js";
import { buildIncomingLinks } from "./graph/buildIncomingLinks.js";

dotenv.config({ path: "./.env" });

const start = async () => {
    await connectDB();
    // await crawlSitemap();
    await buildIncomingLinks(); // now build graph  
  process.exit(0);
};

start();
