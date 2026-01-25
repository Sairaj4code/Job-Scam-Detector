import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { motion } from "framer-motion";

export default function ScamDetectorUI() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeOffer = () => {
    setResult({
      score: "High Risk",
      risk: 86,
      reasons: [
        "Requests upfront payment",
        "Unverified email domain",
        "Uses urgency-based language",
      ],
      explanation:
        "Real companies never charge money for hiring. Scammers create urgency and false promises to trap victims.",
    });
  };

  const iconMap = {
    Safe: <ShieldCheck className="icon-safe" />,
    Suspicious: <ShieldAlert className="icon-warning" />,
    "High Risk": <ShieldX className="icon-danger" />,
  };

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <h1>AI Scam Detector</h1>
        <p>Analyze job and internship offers using AI</p>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Input Card */}
        <Card className="card-elevated">
          <CardContent className="space-y-4">
            <h2 className="section-title">Paste Offer Details</h2>
            <Textarea
              rows={6}
              placeholder="Paste job description, email, or offer message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button className="btn-primary" onClick={analyzeOffer}>
              Analyze Offer
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`result-card danger`}>
              <CardContent className="space-y-4">
                <div className="result-header">
                  {iconMap[result.score]}
                  <div>
                    <h3>{result.score}</h3>
                    <p>Risk Score: {result.risk}%</p>
                  </div>
                </div>

                <div className="risk-bar">
                  <div
                    className="risk-fill"
                    style={{ width: `${result.risk}%` }}
                  />
                </div>

                <ul className="reason-list">
                  {result.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <div className="explanation">
                  <strong>AI Explanation:</strong> {result.explanation}
                </div>

                <div className="action-row">
                  <Button variant="outline">Correct</Button>
                  <Button variant="outline">Incorrect</Button>
                  <Button variant="destructive">Report Scam</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
