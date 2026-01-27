import { useState } from "react";
import {
  Briefcase,
  DollarSign,
  Wifi,
  Image,
  GraduationCap,
  Clock,
  Search,
  Loader2,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Sparkles,
  FileText,
  HelpCircle
} from "lucide-react";
import { analyzeJob } from "../services/api";

export default function JobPrediction() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    telecommuting: "",
    hasCompanyLogo: "",
    hasQuestions: "",
    salaryMissing: "",
    educationMissing: "",
    experienceMissing: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== "");
  };



const handlePrediction = async () => {
  if (!isFormValid()) return;

  setIsAnalyzing(true);
  setResult(null);

  try {
    const data = await analyzeJob({
      title: formData.jobTitle,
      description: formData.description,
      telecommuting: formData.telecommuting === "yes" ? 1 : 0,
      has_company_logo: formData.hasCompanyLogo === "yes" ? 1 : 0,
      has_questions: formData.hasQuestions === "yes" ? 1 : 0,
      salary_missing: formData.salaryMissing === "yes" ? 1 : 0,
      education_missing: formData.educationMissing === "yes" ? 1 : 0,
      experience_missing: formData.experienceMissing === "yes" ? 1 : 0
    });

    setResult({
      verdict: data.verdict,
      finalScore: Number(data.final_score),
      mlScore: Number(data.ml_probability),
      reasons: data.reasons || [],
      isScam: data.verdict === "HIGH RISK"
    });

  } catch (err) {
    console.error("Prediction error:", err);
  } finally {
    setIsAnalyzing(false);
  }
};


  const resetForm = () => {
    setFormData({
      jobTitle: "",
      description: "",
      telecommuting: "",
      hasCompanyLogo: "",
      hasQuestions: "",
      salaryMissing: "",
      educationMissing: "",
      experienceMissing: ""
    });
    setResult(null);
  };

  const SelectField = ({ label, icon: Icon, value, onChange, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer"
        >
          <option value="">Select</option>
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
    </div>
  );

  const yesNoOptions = [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> AI Detection 2026
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Scam Verifier</h1>
        </div>

        {result ? (
          <div className={`p-8 rounded-3xl border-2 ${result.isScam ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800" : "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800"}`}>
            <div className="flex flex-col items-center text-center gap-4">
              {result.isScam ? <ShieldX className="w-16 h-16 text-red-600" /> : <ShieldCheck className="w-16 h-16 text-green-600" />}
                <div className={`p-8 rounded-3xl ${
                  result.verdict === "HIGH RISK"
                    ? "bg-red-50 dark:bg-red-900/10"
                    : "bg-green-50 dark:bg-green-900/10"
                }`}>
                  <div className="flex flex-col items-center text-center gap-4">

                    <h2 className="text-2xl font-bold">
                      {result.verdict}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400">
                      Final Risk Score: {Math.round(result.finalScore * 100)}%
                    </p>

                    <p className="text-sm text-gray-500">
                      ML Confidence: {Math.round(result.mlScore * 100)}%
                    </p>

                    {/* 🔥 REASONS */}
                    {result.reasons && result.reasons.length > 0 && (
                      <div className="mt-4 w-full text-left">
                        <h3 className="font-semibold mb-2">
                          Why this job is risky:
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                          {result.reasons.map((reason, index) => (
                            <li key={index} className="text-sm">
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={resetForm}
                      className="mt-4 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border"
                    >
                      Scan Another
                    </button>
                  </div>
                </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
            {/* 1. Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Senior Developer"
                />
              </div>
            </div>

            {/* 2. Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Description</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Paste the job description here..."
                />
              </div>
            </div>

            {/* 3-8. Grid of selects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField label="Telecommuting?" icon={Wifi} value={formData.telecommuting} onChange={v => handleChange("telecommuting", v)} options={yesNoOptions} />
              <SelectField label="Has Company Logo?" icon={Image} value={formData.hasCompanyLogo} onChange={v => handleChange("hasCompanyLogo", v)} options={yesNoOptions} />
              <SelectField label="Has Screening Questions?" icon={HelpCircle} value={formData.hasQuestions} onChange={v => handleChange("hasQuestions", v)} options={yesNoOptions} />
              <SelectField label="Salary Info Missing?" icon={DollarSign} value={formData.salaryMissing} onChange={v => handleChange("salaryMissing", v)} options={yesNoOptions} />
              <SelectField label="Education Info Missing?" icon={GraduationCap} value={formData.educationMissing} onChange={v => handleChange("educationMissing", v)} options={yesNoOptions} />
              <SelectField label="Experience Info Missing?" icon={Clock} value={formData.experienceMissing} onChange={v => handleChange("experienceMissing", v)} options={yesNoOptions} />
            </div>

            <button
              onClick={handlePrediction}
              disabled={!isFormValid() || isAnalyzing}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${!isFormValid() || isAnalyzing ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {isAnalyzing ? "Analyzing Patterns..." : "Check Risk Level"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
