import axios from "axios";
import * as cheerio from "cheerio";
import { normalizeUrl } from "../utils/normalizeUrl.js";

const BASE_DOMAIN = "www.edzy.ai";

export const crawlPage = async (pageUrl) => {
  try {
    const response = await axios.get(pageUrl, {
      timeout: 15000,
      headers: {
        "User-Agent": "EdzyCrawler/1.0",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const outgoingLinks = [];
    const seen = new Set();

    $("a[href]").each((_, el) => {
      const rawHref = $(el).attr("href");
      const normalized = normalizeUrl(rawHref, pageUrl);

      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);

      const hostname = new URL(normalized).hostname;
      const type = hostname === BASE_DOMAIN ? "internal" : "external";

      outgoingLinks.push({ url: normalized, type });
    });

    return {
      url: pageUrl,
      html,
      outgoingLinks,
    };
  } catch (error) {
    console.error(`Failed to crawl ${pageUrl}:`, error.message);
    return null;
  }
};
