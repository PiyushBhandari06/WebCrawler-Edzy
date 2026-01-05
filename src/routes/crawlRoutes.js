import express from "express";
import { startCrawl } from "../controllers/crawlController.js";
import { getCrawlStatus } from "../controllers/crawlStatusController.js";

const router = express.Router();

router.post("/crawl", startCrawl);
router.get("/crawl/status", getCrawlStatus);

export default router;
