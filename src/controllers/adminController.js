import Page from "../models/Page.model.js";

export const deleteCrawledData = async (req, res) => {
  try {
    await Page.deleteMany({});
    res.json({ message: "Crawled data cleared successfully" });
    
  } catch (error) {
    console.error("Failed to delete crawled data:", error.message);
    res.status(500).json({ error: "Failed to clear crawled data" });
  }
};
// NOTE: Admin/testing endpoint —should not be exposed in production
