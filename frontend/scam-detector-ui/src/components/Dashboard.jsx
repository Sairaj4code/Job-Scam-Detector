import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Dummy data mirroring the notebook's output
const realVsFakeData = [
  { name: "Real", value: 17880, fill: "#22C55E" },
  { name: "Fake", value: 17880, fill: "#EF4444" },
];

const telecommutingVsFraudData = [
  { name: "Telecommuting", real: 34, fake: 866 },
  { name: "No Telecommuting", real: 17846, fake: 17014 },
];

const companyLogoVsLegitimacyData = [
  { name: "Logo", real: 14352, fake: 7654 },
  { name: "No Logo", real: 3528, fake: 10226 },
];

const screeningQuestionsVsJobTypeData = [
  { name: "Questions", real: 8940, fake: 2432 },
  { name: "No Questions", real: 8940, fake: 15448 },
];

const employmentTypeVsFraudData = [
  { name: "Full-time", real: 11438, fake: 7084 },
  { name: "Contract", real: 1432, fake: 643 },
  { name: "Part-time", real: 743, fake: 532 },
  { name: "Temporary", real: 243, fake: 132 },
  { name: "Other", real: 211, fake: 101 },
];

const experienceVsJobTypeData = [
  { name: "Entry level", real: 5193, fake: 2000 },
  { name: "Mid-Senior level", real: 3809, fake: 3000 },
  { name: "Associate", real: 2297, fake: 1500 },
  { name: "Executive", real: 141, fake: 100 },
  { name: "Director", real: 38, fake: 20 },
];

const educationVsJobTypeData = [
  { name: "High School or equivalent", real: 2180, fake: 1500 },
  { name: "Bachelor's Degree", real: 5145, fake: 4000 },
  { name: "Master's Degree", real: 416, fake: 300 },
  { name: "Doctorate", real: 137, fake: 100 },
  { name: "Some College Coursework Completed", real: 102, fake: 80 },
];

const fraudIndicatorComparisonData = [
  { name: "Unrealistic Salary", value: 30, fill: "#EF4444" },
  { name: "Vague Job Description", value: 25, fill: "#F97316" },
  { name: "No Company Website", value: 20, fill: "#EAB308" },
  { name: "Mismatched Domain", value: 15, fill: "#8B5CF6" },
  { name: "Requests Personal Info Early", value: 10, fill: "#3B82F6" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real vs Fake job distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Real vs Fake Job Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={realVsFakeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {realVsFakeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                An equal distribution of real and fake jobs in the dataset.
              </p>
            </CardContent>
          </Card>

          {/* Telecommuting vs job fraud */}
          <Card>
            <CardHeader>
              <CardTitle>Telecommuting vs Job Fraud</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={telecommutingVsFraudData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="real" stackId="a" fill="#22C55E" />
                  <Bar dataKey="fake" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Jobs that offer telecommuting are more likely to be fraudulent.
              </p>
            </CardContent>
          </Card>

          {/* Company logo presence vs legitimacy */}
          <Card>
            <CardHeader>
              <CardTitle>Company Logo vs Legitimacy</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={companyLogoVsLegitimacyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="real" fill="#22C55E" />
                  <Bar dataKey="fake" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Jobs with company logos are more likely to be legitimate.
              </p>
            </CardContent>
          </Card>

          {/* Screening questions vs job type */}
          <Card>
            <CardHeader>
              <CardTitle>Screening Questions vs Job Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={screeningQuestionsVsJobTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="real" fill="#22C55E" />
                  <Bar dataKey="fake" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Jobs with screening questions are less likely to be fraudulent.
              </p>
            </CardContent>
          </Card>

          {/* Employment type vs fraud likelihood */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Type vs Fraud Likelihood</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employmentTypeVsFraudData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="real" stackId="a" fill="#22C55E" />
                  <Bar dataKey="fake" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Full-time positions have a higher number of both real and fake
                postings.
              </p>
            </CardContent>
          </Card>

          {/* Experience required vs job type */}
          <Card>
            <CardHeader>
              <CardTitle>Experience Required vs Job Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={experienceVsJobTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="real" stackId="a" fill="#22C55E" />
                  <Bar dataKey="fake" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Entry-level and mid-senior level jobs have the most postings.
              </p>
            </CardContent>
          </Card>

          {/* Education required vs job type */}
          <Card>
            <CardHeader>
              <CardTitle>Education Required vs Job Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={educationVsJobTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="real" stackId="a" fill="#22C55E" />
                  <Bar dataKey="fake" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                A Bachelor's degree is the most common educational requirement.
              </p>
            </CardContent>
          </Card>

          {/* Overall fraud indicator comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Fraud Indicator Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fraudIndicatorComparisonData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {fraudIndicatorComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Unrealistic salary is the top indicator of a fraudulent job
                posting.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

