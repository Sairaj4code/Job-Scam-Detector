import { useState } from "react";
import { Search, ShieldCheck, ShieldAlert, ShieldX, Loader2, AlertCircle } from "lucide-react";

export default function DetectScam() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeScam = () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis delay
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let risk = "Low";
      let score = 15;
      let indicators = [];

      // Check for common scam indicators
      if (lowerInput.includes("payment") || lowerInput.includes("pay upfront") || lowerInput.includes("fee")) {
        risk = "High";
        score += 35;
        indicators.push("Requests upfront payment or fees");
      }
      if (lowerInput.includes("urgent") || lowerInput.includes("immediately") || lowerInput.includes("act now")) {
        score += 20;
        indicators.push("Uses urgency-based language");
      }
      if (lowerInput.includes("guaranteed") || lowerInput.includes("easy money") || lowerInput.includes("no experience")) {
        score += 25;
        indicators.push("Unrealistic promises or guarantees");
      }
      if (lowerInput.includes("personal info") || lowerInput.includes("ssn") || lowerInput.includes("bank account")) {
        risk = "High";
        score += 30;
        indicators.push("Requests sensitive personal information");
      }
      if (lowerInput.includes("work from home") && lowerInput.includes("$")) {
        score += 15;
        indicators.push("Vague remote work with income promises");
      }

      if (score > 50) risk = "Medium";
      if (score > 70) risk = "High";
      score = Math.min(score, 100);

      if (indicators.length === 0) {
        indicators.push("No obvious red flags detected");
      }

      const explanations = {
        High: "This posting shows multiple characteristics commonly associated with job scams. We strongly recommend verifying the company through official channels before proceeding.",
        Medium: "Some elements of this posting warrant caution. Research the company independently before sharing personal information or accepting the offer.",
        Low: "This posting appears legitimate based on our analysis, but always verify employer details through official company websites and trusted sources."
      };

      setResult({ risk, score, indicators, explanation: explanations[risk] });
      setIsAnalyzing(false);

      // Save to history
      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      history.push({ input: input.substring(0, 100), risk, score, date: new Date().toISOString() });
      localStorage.setItem("scanHistory", JSON.stringify(history));
    }, 1500);
  };

  const getRiskConfig = (risk) => {
    switch (risk) {
      case "High":
        return { icon: ShieldX, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", barColor: "bg-red-500" };
      case "Medium":
        return { icon: ShieldAlert, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", barColor: "bg-yellow-500" };
      default:
        return { icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", barColor: "bg-green-500" };
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Job Scam Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Paste a job posting, email, or message to analyze for potential scam indicators
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Posting Content
          </label>
          <textarea
            className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Paste the job description, email content, or message you want to analyze..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={analyzeScam}
            disabled={!input.trim() || isAnalyzing}
            className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analyze Posting
              </>
            )}
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border ${getRiskConfig(result.risk).border} p-6 animate-fade-in-up`}>
            {/* Risk Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl ${getRiskConfig(result.risk).bg}`}>
                {(() => {
                  const Icon = getRiskConfig(result.risk).icon;
                  return <Icon className={`w-8 h-8 ${getRiskConfig(result.risk).color}`} />;
                })()}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${getRiskConfig(result.risk).color}`}>
                  {result.risk} Risk
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Scam Probability Score</p>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Risk Score</span>
                <span className={`font-semibold ${getRiskConfig(result.risk).color}`}>{result.score}%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getRiskConfig(result.risk).barColor} rounded-full transition-all duration-1000`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Indicators */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Detected Indicators</h3>
              <ul className="space-y-2">
                {result.indicators.map((indicator, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <AlertCircle className={`w-4 h-4 ${getRiskConfig(result.risk).color}`} />
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>

            {/* Explanation */}
            <div className={`p-4 rounded-xl ${getRiskConfig(result.risk).bg}`}>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">AI Analysis: </strong>
                {result.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}