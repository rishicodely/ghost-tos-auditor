import { useState } from "react";
import axios from "axios";
import { supabase } from "./supabaseClient";
import { useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://ghost-tos-auditor.onrender.com/analyze",
        { url },
      );
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

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
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

        {/* 🔐 AUTH SECTION */}
        {!user ? (
          <div className="space-y-4">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded-lg"
            />

            <div className="flex gap-2">
              <button
                onClick={() => login(email, password)}
                className="flex-1 bg-white text-black py-2 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => signUp(email, password)}
                className="flex-1 border border-gray-600 text-white py-2 rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 👤 USER BAR */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{user.email}</span>
              <button onClick={logout} className="text-red-400">
                Logout
              </button>
            </div>

            {/* 🚀 YOUR EXISTING APP STARTS HERE */}

            {/* Input */}
            <div className="flex gap-2">
              <input
                className="flex-1 bg-black border border-gray-700 text-white rounded-lg px-4 py-2"
                placeholder="Paste Terms URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-white text-black px-4 py-2 rounded-lg"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {/* Score */}
            {result && (
              <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
                <p className="text-gray-400 text-sm">Privacy Score</p>
                <div
                  className={`text-7xl font-bold ${getScoreColor(result.score)}`}
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
                  className="bg-black border border-gray-800 rounded-lg p-4"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-400">{c.category}</span>
                    <span className={getRiskColor(c.risk)}>{c.risk}</span>
                  </div>
                  <p className="text-white text-sm">{c.clause}</p>
                  <p className="text-gray-500 text-xs">{c.reason}</p>
                  <p className="text-gray-400 text-xs italic">{c.impact}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
