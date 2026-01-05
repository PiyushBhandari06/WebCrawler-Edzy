import Page from "../models/Page.model.js";

export const getIncomingLinks = async (req, res) => {
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
};

export const getOutgoingLinks = async (req, res) => {
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
};

//TopLinkedPages -> refers to pages that have the most incoming links pointing to them from other pages.
export const getTopLinkedPages = async (req, res) => {
  const { n } = req.body; //n -> how many pages the user wants to retrieve based on the number of incoming links.

  if (!n || n <= 0) {
    return res.status(400).json({ error: "Valid n is required" });
  }

  const result = await Page.aggregate([
    {
      $project: {
        url: 1,
        incomingCount: { $size: "$incomingLinks" },
      },
    },
    { $sort: { incomingCount: -1 } },
    { $limit: n },
  ]);

  res.json(result);
};
