import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/analyze", { url });
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (risk === "CRITICAL") return "text-red-600";
    if (risk === "HIGH") return "text-red-400";
    if (risk === "MEDIUM") return "text-yellow-400";
    return "text-green-400";
  };

  const getScoreColor = (score) => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Ghost 👻
          </h1>
          <p className="text-gray-500 text-sm">
            Understand what you're really agreeing to
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 bg-black border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Paste Terms URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* Score */}
        {result && (
          <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Privacy Score</p>

            <div
              className={`text-7xl font-bold tracking-tight ${getScoreColor(result.score)} drop-shadow-lg`}
            >
              {result.score}
            </div>

            <p className="text-gray-500 text-sm mt-1">
              {result.riskLevel} Risk
            </p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3 max-h-96 overflow-auto">
          {!result && (
            <p className="text-gray-500 text-center">
              Paste a Terms URL to analyze
            </p>
          )}

          {result?.clauses?.map((c, i) => (
            <div
              key={i}
              className="bg-black border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">{c.category}</span>
                <span
                  className={`text-xs font-semibold ${getRiskColor(c.risk)}`}
                >
                  {c.risk}
                </span>
              </div>

              <p className="text-white text-sm mb-2">{c.clause}</p>

              <p className="text-gray-500 text-xs">{c.reason}</p>

              <p className="text-gray-400 text-xs mt-1 italic">{c.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
