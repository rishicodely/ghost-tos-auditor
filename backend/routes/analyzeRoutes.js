import express from "express";
import { scrapeText } from "../services/scraperService.js";
import { analyzeText } from "../services/aiService.js";
import { calculateScore } from "../services/scoringService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    const text = await scrapeText(url);

    const parsed = await analyzeText(text);

    const { score, riskLevel } = calculateScore(parsed.clauses);

    res.json({ ...parsed, score, riskLevel });
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
