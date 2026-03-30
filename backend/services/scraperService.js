import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeText(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  return $("body").text().replace(/\s+/g, " ").trim();
}
