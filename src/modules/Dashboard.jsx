


import { useEffect, useState } from "react";
import Card from "../components/Card";
import { dashboardModules } from "../config/dashboardModules";
import { themes } from "../config/theme.config";
import { getUserFromToken } from "../utils/auth";

import {
  Calendar,
  ChevronRight,
  Activity,
  Database,
  Shield,
  BarChart3,
  Target,
  TrendingUp,
  Bell,
  Building2,
  Briefcase,
  MapPin,
  Users
} from "lucide-react";



export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
const user = getUserFromToken();
const isEmployee = user?.is_employee === true;

const allowedPaths = isEmployee
  ? [
      "/employee",
      "/users",
      "/employee-personal-details",
      "/employee-salary",
      "/employee-documents",
    ]
  : dashboardModules.map((m) => m.path);

const filteredModules = dashboardModules.filter((mod) =>
  allowedPaths.includes(mod.path)
);

  
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
filteredModules.map((mod) => mod.api())
        );

     const finalStats = results.map((res, index) => ({
  title: filteredModules[index].title,
  value: res.data.data.length,
  color: filteredModules[index].color,
  icon: filteredModules[index].icon,
  path: filteredModules[index].path,
  gradient: filteredModules[index].gradient,
  accentColor: filteredModules[index].accentColor,
}));


        setStats(finalStats);

        setRecentActivity([
          { id: 1, action: "New employee joined", department: "Engineering", time: "2 hours ago", icon: "👤", type: "employee" },
          { id: 2, action: "Role updated", department: "HR", time: "4 hours ago", icon: "🎯", type: "role" },
          { id: 3, action: "Office branch added", department: "Operations", time: "1 day ago", icon: "🏢", type: "office" },
          { id: 4, action: "Department restructured", department: "Management", time: "2 days ago", icon: "📊", type: "department" },
          
        ]);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-xl from-gray-50 to-gray-100 p-6 md:p-8">

      {/* HEADER */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
                <p className="text-gray-600 mt-1">Real-time insights and analytics</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-white rounded-xl transition-all">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="px-6 py-3 bg-gray-900 text-white rounded-xl flex items-center shadow-lg">
              <Calendar className="w-5 h-5 mr-3" />
              {new Date().toLocaleDateString()}
            </button>
          </div>
        </div>

        {/* ===== TOP MODULE CARDS (2×2 GRID) ===== */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

<div className="grid grid-cols-2 gap-8 relative z-10">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-white rounded-2xl shadow animate-pulse" />
              ))
            ) : (
              stats.map((card, i) => (
                <Card
                  key={i}
                  title={card.title}
                  value={card.value}
                  color={card.color}
                  icon={card.icon}
                  path={card.path}
                  gradient={card.gradient}
                  accentColor={card.accentColor}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          {/* Performance Metrics */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Target className="w-7 h-7 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
              </div>
              <button className="text-sm font-semibold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-lg">
                View Report <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Growth Rate", value: "24.5%", change: "+2.3%", icon: "📈" },
                { label: "Efficiency", value: "89.2%", change: "+1.8%", icon: "⚡" },
                { label: "Satisfaction", value: "4.8/5", change: "+0.2", icon: "⭐" },
                { label: "Retention", value: "96.7%", change: "+0.5%", icon: "🎯" },
              ].map((metric, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl mb-3">{metric.icon}</div>
                  <p className="text-sm text-gray-500 mb-2">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <span className="flex items-center text-sm font-semibold text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <Activity className="w-7 h-7 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            </div>

            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-5 rounded-xl border border-gray-200">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mr-5 text-xl">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-1">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.department}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center mb-8">
            <Shield className="w-7 h-7 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
          </div>

          <div className="space-y-4">
            {["Database", "API Gateway", "Authentication", "File Storage"].map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <p className="font-medium text-gray-800">{service}</p>
                <span className="text-green-600 font-semibold text-sm">Operational</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
