import Page from "../models/Page.model.js";

export const buildIncomingLinks = async () => {
  console.log("Building incoming links...");

  // 1. Fetch all pages (only url + outgoingLinks needed)
  const pages = await Page.find({}, { url: 1, outgoingLinks: 1 });

  // 2. Build a lookup set of valid page URLs
  const urlSet = new Set(pages.map((p) => p.url));

  // 3. Clear existing incomingLinks (idempotent)
  await Page.updateMany({}, { $set: { incomingLinks: [] } });

  let processed = 0;

  // 4. Invert the graph
  for (const page of pages) {
    const sourceUrl = page.url;

    for (const link of page.outgoingLinks) {
      if (link.type !== "internal") continue;

      const targetUrl = link.url;

      // Only count links within sitemap
      if (!urlSet.has(targetUrl)) continue;

      await Page.updateOne(
        { url: targetUrl },
        { $addToSet: { incomingLinks: sourceUrl } }
      );
    }

    processed++;
    if (processed % 100 === 0) {
      console.log(`Processed ${processed}/${pages.length}`);
    }
  }

  console.log("Incoming links build complete.");
};
