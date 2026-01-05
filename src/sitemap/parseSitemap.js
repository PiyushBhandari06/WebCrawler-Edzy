import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import axios from "axios";
import * as cheerio from "cheerio";
import { normalizeUrl } from "../utils/normalizeUrl.js";

const SITEMAP_URL = process.env.SITEMAP_URL;
console.log("Using sitemap URL:", process.env.SITEMAP_URL);

export const parseSitemap = async () => {
  try {
    const response = await axios.get(SITEMAP_URL, {
      timeout: 15000,
    });

    const xml = response.data;

    const $ = cheerio.load(xml, { xmlMode: true });

    const urls = new Set();

    $("url > loc").each((_, el) => {
      const rawUrl = $(el).text().trim();
      const normalized = normalizeUrl(rawUrl);

      if (normalized) {
        urls.add(normalized);
      }
    });

    return Array.from(urls);
  } catch (error) {
    console.error("Failed to parse sitemap:", error.message);
    throw error;
  }
};
