import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const careerData = {
  "Software Engineer": {
    India: { demand: 85, salary: "₹6–18 LPA" },
    USA: { demand: 92, salary: "$80K–$150K" },
    Canada: { demand: 88, salary: "$70K–$120K" },
    Germany: { demand: 86, salary: "€60K–€100K" },
  },
  Doctor: {
    India: { demand: 75, salary: "₹8–25 LPA" },
    USA: { demand: 84, salary: "$120K–$250K" },
    Canada: { demand: 82, salary: "$110K–$200K" },
    Germany: { demand: 90, salary: "€70K–€160K" },
  },
  Designer: {
    India: { demand: 60, salary: "₹4–12 LPA" },
    USA: { demand: 78, salary: "$60K–$110K" },
    Canada: { demand: 65, salary: "$55K–$95K" },
    Germany: { demand: 67, salary: "€45K–€80K" },
  },
};

const streamSuggestion = {
  Coding: "PCM (Physics, Chemistry, Maths)",
  Biology: "PCB (Physics, Chemistry, Biology)",
  Business: "Commerce",
  Designing: "Any Stream (Prefer Arts)",
};

const aiFutureScope = (demand) => {
  if (demand > 90) return "Extremely Secure Career till 2040";
  if (demand > 80) return "High Growth Career";
  if (demand > 65) return "Moderate Growth";
  return "Future Risk due to Automation";
};

const findMatchingKey = (value, options) => {
  const normalized = value.trim().toLowerCase();
  return options.find((option) => option.toLowerCase() === normalized);
};

export default function CareerFuturePredictor() {
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const [result, setResult] = useState(null);

  const professionList = useMemo(() => Object.keys(careerData), []);

  const handleCheck = () => {
    const selectedProfession = findMatchingKey(profession, professionList);

    if (!selectedProfession) {
      setResult(null);
      return;
    }

    const countryList = Object.keys(careerData[selectedProfession]);
    const selectedCountry = findMatchingKey(country, countryList);

    if (!selectedCountry) {
      setResult(null);
      return;
    }

    const selectedInterest = findMatchingKey(interest, Object.keys(streamSuggestion));

    const { demand, salary } = careerData[selectedProfession][selectedCountry];
    const aiScope = aiFutureScope(demand);
    const stream = selectedInterest
      ? streamSuggestion[selectedInterest]
      : "Explore General Studies";

    setResult({ demand, salary, aiScope, stream });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl rounded-2xl border border-blue-900/70 bg-slate-950/90 text-blue-100 shadow-2xl shadow-blue-900/30 backdrop-blur">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center text-blue-100">
            AI Career Future Predictor for Students
          </h1>

          <Input
            className="border-blue-900 bg-black/40 text-blue-50 placeholder:text-blue-300/70"
            placeholder="Enter Profession (e.g. Software Engineer)"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />

          <Input
            className="border-blue-900 bg-black/40 text-blue-50 placeholder:text-blue-300/70"
            placeholder="Enter Country (e.g. India, USA)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Input
            className="border-blue-900 bg-black/40 text-blue-50 placeholder:text-blue-300/70"
            placeholder="Interest (Coding / Biology / Business / Designing)"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />

          <Button
            className="w-full bg-blue-800 text-blue-50 hover:bg-blue-700"
            onClick={handleCheck}
          >
            Check AI Career Prediction
          </Button>

          {result && (
            <div className="mt-4 p-4 rounded-xl border border-blue-900 bg-black/40 shadow-lg shadow-blue-900/30 space-y-2">
              <p className="text-lg font-semibold text-center text-blue-100">
                Future Demand: {result.demand}%
              </p>
              <p className="text-lg font-semibold text-center text-blue-100">
                Predicted Salary: {result.salary}
              </p>
              <p className="text-lg font-semibold text-center text-blue-100">
                AI Scope: {result.aiScope}
              </p>
              <p className="text-lg font-semibold text-center text-blue-100">
                Suggested Stream after Class 10: {result.stream}
              </p>
            </div>
          )}

          <div className="text-sm text-blue-300/80 pt-4">
            To connect with Real Job Market API (like Adzuna), replace handleCheck logic with:
            <br />
            <code className="break-all text-blue-200">
              {"fetch(`https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=YOUR_ID&app_key=YOUR_KEY&what=${profession}`)"}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
