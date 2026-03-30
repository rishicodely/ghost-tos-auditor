export function calculateScore(clauses) {
  let score = 100;

  clauses.forEach((c) => {
    if (c.risk === "CRITICAL") score -= 25;
    if (c.risk === "HIGH") score -= 15;
    if (c.risk === "MEDIUM") score -= 8;
  });

  if (score < 0) score = 0;

  let riskLevel = "LOW";
  if (score < 70) riskLevel = "MEDIUM";
  if (score < 40) riskLevel = "HIGH";

  return { score, riskLevel };
}
