import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Page from "./models/Page.model.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

const PORT = 3000;

const startServer = async () => {
  await connectDB();

  app.post("/incoming-links", async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const page = await Page.findOne({ url });

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json({
      url: page.url,
      incomingLinks: page.incomingLinks,
      count: page.incomingLinks.length,
    });
  });

  app.post("/outgoing-links", async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const page = await Page.findOne({ url });

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json({
      url: page.url,
      outgoingLinks: page.outgoingLinks,
      count: page.outgoingLinks.length,
    });
  });
  app.post("/top-linked-pages", async (req, res) => {
    const { n } = req.body;

    if (!n || n <= 0) {
      return res.status(400).json({ error: "Valid n is required" });
    }

    const pages = await Page.find({})
      .sort({ "incomingLinks.length": -1 }) // Mongo doesn't allow this directly
      .lean();

    const sorted = pages
      .map((p) => ({
        url: p.url,
        incomingCount: p.incomingLinks.length,
      }))
      .sort((a, b) => b.incomingCount - a.incomingCount)
      .slice(0, n);

    res.json(sorted);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
