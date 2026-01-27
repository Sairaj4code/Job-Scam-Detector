import { useState } from "react";
import { AlertTriangle, Send, CheckCircle, Building, Mail, FileText } from "lucide-react";
import { reportScam } from "../services/api";

export default function ReportScam() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    details: "",
    category: "job-offer"
  });
  const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await reportScam(formData);

        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            companyName: "",
            contactEmail: "",
            details: "",
            category: "job-offer"
          });
        }, 3000);

      } catch (err) {
        console.error("Report failed:", err);
      }
    };

  const categories = [
    { value: "job-offer", label: "Fake Job Offer" },
    { value: "payment-scam", label: "Payment/Fee Scam" },
    { value: "phishing", label: "Phishing Attempt" },
    { value: "identity-theft", label: "Identity Theft" },
    { value: "other", label: "Other" }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Report Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400">Thank you for helping protect others from job scams.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Report a Scam
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Help protect others by reporting suspicious job postings or scam attempts
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          {/* Category */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Scam Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Company Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Company/Sender Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter the company or sender name"
              required
            />
          </div>

          {/* Contact Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Contact Email (if available)
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              placeholder="scammer@example.com"
            />
          </div>

          {/* Details */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Scam Details
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe the scam in detail. Include any suspicious elements, requests for payment, personal information requests, etc."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
          >
            <Send className="w-5 h-5" />
            Submit Report
          </button>
        </form>

        {/* Info Note */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Your report helps us improve our AI detection and protect job seekers worldwide.
        </p>
      </div>
    </div>
  );
}
