import { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  AlertOctagon,
  Lock,
  TrendingUp,
  TrendingDown,
  Linkedin,
  Globe,
  MessageCircle,
  Users,
  ExternalLink
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import StatCard from "./dashboard/StatCard";

// Mock data for the line chart
const analyticsData = [
  { name: "Mon", legitimate: 45, scam: 12, highRisk: 8, underReview: 15 },
  { name: "Tue", legitimate: 52, scam: 18, highRisk: 10, underReview: 12 },
  { name: "Wed", legitimate: 48, scam: 15, highRisk: 12, underReview: 18 },
  { name: "Thu", legitimate: 61, scam: 22, highRisk: 9, underReview: 14 },
  { name: "Fri", legitimate: 55, scam: 19, highRisk: 11, underReview: 16 },
  { name: "Sat", legitimate: 38, scam: 14, highRisk: 7, underReview: 10 },
  { name: "Sun", legitimate: 42, scam: 16, highRisk: 8, underReview: 11 },
];

// Mock data for scam indicators pie chart
const scamIndicatorsData = [
  { name: "Fake Company Info", value: 28, color: "#EF4444" },
  { name: "Unrealistic Salary", value: 22, color: "#F97316" },
  { name: "No Online Presence", value: 18, color: "#EAB308" },
  { name: "Phishing Links", value: 15, color: "#8B5CF6" },
  { name: "Urgent Hiring", value: 10, color: "#3B82F6" },
  { name: "Upfront Payment", value: 7, color: "#EC4899" },
];

// Job sources data
const jobSourcesData = [
  { name: "LinkedIn", count: 1245, percentage: 35, icon: Linkedin },
  { name: "Indeed", count: 892, percentage: 25, icon: Globe },
  { name: "Company Sites", count: 678, percentage: 19, icon: ExternalLink },
  { name: "Telegram", count: 423, percentage: 12, icon: MessageCircle },
  { name: "WhatsApp", count: 198, percentage: 6, icon: MessageCircle },
  { name: "User Reports", count: 112, percentage: 3, icon: Users },
];

// Custom Tooltip for Line Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);

  // Preserve existing data fetching logic
  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem("reports") || "[]"));
    setHistory(JSON.parse(localStorage.getItem("scanHistory") || "[]"));
  }, []);

  // Calculate dynamic stats from stored data
  const legitimateCount = history.filter(h => h.risk === "Low").length + 156;
  const scamCount = history.filter(h => h.risk === "High").length + 47;
  const highRiskCount = history.filter(h => h.risk === "Medium").length + 23;
  const underReviewCount = Math.floor(history.length * 0.3) + 12;
  const blockedCount = reports.length + 8;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* KPI Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <StatCard
              icon={CheckCircle}
              label="Legitimate Jobs"
              value={legitimateCount.toLocaleString()}
              trend="+12%"
              color="green"
            />
            <StatCard
              icon={AlertTriangle}
              label="Scam Jobs Detected"
              value={scamCount.toLocaleString()}
              trend="+8%"
              color="red"
            />
            <StatCard
              icon={Clock}
              label="Under Review"
              value={underReviewCount.toLocaleString()}
              color="blue"
            />
            <StatCard
              icon={AlertOctagon}
              label="High Risk Jobs"
              value={highRiskCount.toLocaleString()}
              trend="-5%"
              color="orange"
            />
            <StatCard
              icon={Lock}
              label="Blocked Employers"
              value={blockedCount.toLocaleString()}
              color="gray"
            />
          </div>

          {/* Main Analytics Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6 hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Job Postings Analysis</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weekly trend of job posting classifications</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  +15.3%
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                  />
                  <Line
                    type="monotone"
                    dataKey="legitimate"
                    name="Legitimate"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={{ fill: "#22C55E", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="scam"
                    name="Scam"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ fill: "#EF4444", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="highRisk"
                    name="High Risk"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={{ fill: "#F97316", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="underReview"
                    name="Under Review"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Section - Two Column Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Job Sources Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Job Sources</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Distribution of analyzed job postings by platform</p>
              </div>
              <div className="space-y-4">
                {jobSourcesData.map((source, index) => {
                  const Icon = source.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{source.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{source.count.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-10 text-right">
                        {source.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scam Indicators Pie Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Scam Indicators</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Common characteristics found in detected scams</p>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-48 h-48 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scamIndicatorsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {scamIndicatorsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #374151",
                          backgroundColor: "#1F2937",
                          color: "#F9FAFB"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {scamIndicatorsData.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: indicator.color }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{indicator.name}</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-white ml-auto">{indicator.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Recent Scans */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Scans</h2>
                <span className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer">View all</span>
              </div>
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No scans yet. Start analyzing job postings!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.slice(-5).reverse().map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        item.risk === "High" ? "bg-red-500" :
                        item.risk === "Medium" ? "bg-orange-500" : "bg-green-500"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 dark:text-gray-200 truncate">{item.input?.substring(0, 50)}...</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                          })}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.risk === "High" ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
                        item.risk === "Medium" ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      }`}>
                        {item.risk}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Reports */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                <span className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer">View all</span>
              </div>
              {reports.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No scam reports filed yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {reports.slice(-5).reverse().map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {report.companyName || "Unknown Company"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{report.details?.substring(0, 40)}...</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(report.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
