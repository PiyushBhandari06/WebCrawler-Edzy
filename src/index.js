import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./config/db.js";
import { crawlSitemap } from "./crawler/crawlSitemap.js";
import { buildIncomingLinks } from "./graph/buildIncomingLinks.js";


const run = async () => {
  const mode = process.argv[2];
  
  if (mode !== "crawl") {
    console.log("No job specified. Use: node src/index.js crawl");
    process.exit(0);
  }

  await connectDB();

  console.log("Starting crawl job...");
  await crawlSitemap();

  console.log("Building incoming links...");
  await buildIncomingLinks();

  console.log("Crawl job completed !");
  process.exit(0);
};

run();

