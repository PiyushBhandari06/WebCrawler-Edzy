import { crawlState } from "../state/crawlState.js";

export const getCrawlStatus = (req, res) => {
  res.json({
    isCrawling: crawlState.isCrawling,
  });
};
