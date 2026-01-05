import { parseSitemap } from "../sitemap/parseSitemap.js";
import { crawlPage } from "./crawlPage.js";
import { savePage } from "../storage/savePage.js";

export const crawlSitemap = async () => {
  const urls = await parseSitemap();

  console.log(`Starting crawl for ${urls.length} pages...`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    try {
      const pageData = await crawlPage(url);
      if (!pageData) {
        failed++;
        continue;
      }

      await savePage(pageData);
      success++;

      if (success % 5 === 0) {
        console.log(`Crawled ${success}/${urls.length}...`);
      }
    } catch (err) {
      failed++;
      console.error(`Error crawling ${url}:`, err.message);
    }
  }

  console.log("Crawl finished !");
  console.log("Successfull crawls:", success);
  console.log("Failed crawls:", failed);
};
