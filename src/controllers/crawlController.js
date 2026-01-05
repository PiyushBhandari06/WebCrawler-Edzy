import { crawlState } from "../state/crawlState.js";
import { crawlSitemap } from "../crawler/crawlSitemap.js";
import { buildIncomingLinks } from "../graph/buildIncomingLinks.js";

export const startCrawl = async (req, res) => {
  // 1. Prevent double execution
  if (crawlState.isCrawling) {
    return res.status(409).json({
      message: "Crawl already in progress",
    });
  }

  // 2. Mark crawl as started
  crawlState.isCrawling = true;

  // 3. Respond immediately
  res.json({
    message: "Crawl started successfully",
  });

  // 4. Run crawl asynchronously (in background)
  (async () => {
    try {
      console.log("🚀 Crawl started");
      await crawlSitemap();

      console.log("🔁 Starting incoming link computation");
      await buildIncomingLinks();

      console.log("Incoming link computation completed 🎉");

      console.log("Crawl pipeline completed !🎉");

    } catch (error) {
      console.error("❌ Crawl failed:", error.message);

    } finally {
      crawlState.isCrawling = false;
      console.log("Crawl state has been reset");
      
    }
  })();
};
