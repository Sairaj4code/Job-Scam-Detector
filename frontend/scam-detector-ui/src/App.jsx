import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import JobPrediction from "./components/JobPrediction";
import ReportScam from "./components/ReportScam";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<JobPrediction />} />
          <Route path="/report" element={<ReportScam />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
