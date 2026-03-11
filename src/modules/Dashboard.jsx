

// aa perfect chhe aama khali role based card show nathi thata je niche na code ma thay chhe

// "use client";

// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { dashboardModules } from "../config/dashboardModules";
// import { useUser } from "../hooks/useUser";
// import {
//   Calendar,
//   ChevronRight,
//   Activity,
//   Shield,
//   BarChart3,
//   Target,
//   TrendingUp,
//   Bell,
// } from "lucide-react";

// export default function Dashboard() {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     const fetchAllStats = async () => {
//       try {
//         setLoading(true);

//         // ✅ SAFE MULTI API CALL
//         const results = await Promise.allSettled(
//           dashboardModules.map((mod) => mod.api())
//         );

//         // ✅ BUILD FINAL STATS
//         const finalStats = results.map((res, index) => {
//           const module = dashboardModules[index];

//           // ❌ if API fails
//           if (res.status === "rejected") {
//             console.error("❌ API Failed:", module.title, res.reason);
//             return {
//               title: module.title,
//               value: 0,
//               color: module.color,
//               icon: module.icon,
//               path: module.path,
//               gradient: module.gradient,
//               accentColor: module.accentColor,
//             };
//           }

//           // ✅ if API success
//           const apiData = res.value?.data?.data;

//           let count = 0;

//           if (Array.isArray(apiData)) {
//             count = apiData.length;
//           } else if (typeof apiData === "object" && apiData !== null) {
//             count = Object.keys(apiData).length;
//           }

//           return {
//             title: module.title,
//             value: count,
//             color: module.color,
//             icon: module.icon,
//             path: module.path,
//             gradient: module.gradient,
//             accentColor: module.accentColor,
//           };
//         });

//         setStats(finalStats);

//         // 🔥 Static activity (you can replace with API later)
//         setRecentActivity([
//           { id: 1, action: "New employee joined", department: "Engineering", time: "2 hours ago", icon: "👤" },
//           { id: 2, action: "Role updated", department: "HR", time: "4 hours ago", icon: "🎯" },
//           { id: 3, action: "Office branch added", department: "Operations", time: "1 day ago", icon: "🏢" },
//           { id: 4, action: "Department restructured", department: "Management", time: "2 days ago", icon: "📊" },
//         ]);

//       } catch (err) {
//         console.error("🔥 Dashboard Fatal Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br rounded-xl from-gray-50 to-gray-100 p-6 md:p-8">

//       {/* ================= HEADER ================= */}
//       <div className="mb-12">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
//           <div className="mb-6 md:mb-0">
//             <div className="flex items-center mb-3">
//               <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Executive Dashboard
//                 </h1>
//                 <p className="text-gray-600 mt-1">
//                   Real-time insights and analytics
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="relative p-2 hover:bg-white rounded-xl transition-all">
//               <Bell className="w-6 h-6 text-gray-600" />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             <button className="px-6 py-3 bg-gray-900 text-white rounded-xl flex items-center shadow-lg">
//               <Calendar className="w-5 h-5 mr-3" />
//               {new Date().toLocaleDateString("en-GB")}
//             </button>
//           </div>
//         </div>

//         {/* ================= CARDS ================= */}
//         <div className="relative">
//           <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
//             {loading
//               ? Array(6).fill(0).map((_, i) => (
//                   <div key={i} className="h-32 bg-white rounded-2xl shadow animate-pulse" />
//                 ))
//               : stats.map((card, i) => (
//                   <Card
//                     key={i}
//                     title={card.title}
//                     value={card.value}
//                     color={card.color}
//                     icon={card.icon}
//                     path={card.path}
//                     gradient={card.gradient}
//                     accentColor={card.accentColor}
//                   />
//                 ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-8">

//           {/* Performance */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center">
//                 <Target className="w-7 h-7 text-indigo-600 mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Performance Metrics
//                 </h2>
//               </div>
//               <button className="text-sm font-semibold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-lg">
//                 View Report <ChevronRight className="w-4 h-4 inline ml-1" />
//               </button>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { label: "Growth Rate", value: "24.5%", change: "+2.3%", icon: "📈" },
//                 { label: "Efficiency", value: "89.2%", change: "+1.8%", icon: "⚡" },
//                 { label: "Satisfaction", value: "4.8/5", change: "+0.2", icon: "⭐" },
//                 { label: "Retention", value: "96.7%", change: "+0.5%", icon: "🎯" },
//               ].map((metric, idx) => (
//                 <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="text-2xl mb-3">{metric.icon}</div>
//                   <p className="text-sm text-gray-500 mb-2">{metric.label}</p>
//                   <div className="flex items-end justify-between">
//                     <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
//                     <span className="flex items-center text-sm font-semibold text-green-600">
//                       <TrendingUp className="w-4 h-4 mr-1" />
//                       {metric.change}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center mb-8">
//               <Activity className="w-7 h-7 text-blue-600 mr-3" />
//               <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
//             </div>

//             <div className="space-y-6">
//               {recentActivity.map((activity) => (
//                 <div key={activity.id} className="flex items-center p-5 rounded-xl border border-gray-200">
//                   <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mr-5 text-xl">
//                     {activity.icon}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900 mb-1">{activity.action}</p>
//                     <p className="text-sm text-gray-500">{activity.department}</p>
//                   </div>
//                   <span className="text-sm text-gray-500">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//           <div className="flex items-center mb-8">
//             <Shield className="w-7 h-7 text-green-600 mr-3" />
//             <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
//           </div>

//           <div className="space-y-4">
//             {["Database", "API Gateway", "Authentication", "File Storage"].map((service, idx) => (
//               <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <p className="font-medium text-gray-800">{service}</p>
//                 <span className="text-green-600 font-semibold text-sm">Operational</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



//aaperfect chhe pan aama details chhe

// "use client";

// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { dashboardModules } from "../config/dashboardModules";
// import { useUser } from "../hooks/useUser";
// import {
//   Calendar,
//   ChevronRight,
//   Activity,
//   Shield,
//   BarChart3,
//   Target,
//   TrendingUp,
//   Bell,
// } from "lucide-react";

// export default function Dashboard() {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const { employeeId, isHR,leadId } = useUser(); // 🔥 આ લાઇન ઉમેરો




//   useEffect(() => {
//     const fetchAllStats = async () => {
//       try {
//         setLoading(true);
//         // 🔥 FILTER MODULES BASED ON USER ROLE
//         // let modulesToShow = [...dashboardModules];

//         let modulesToShow = dashboardModules.filter((module) => {
//           if (isHR) {
//             return module.title !== "Today's Followups";
//           } else {
//             return ["Visits", "Leads", "Today's Followups"].includes(module.title);
//           }
//         });
//         // ✅ SAFE MULTI API CALL
//        // ✅ SAFE MULTI API CALL
// const results = await Promise.allSettled(
//   modulesToShow.map((mod) => {
//     if (!isHR) {
//       return mod.api(employeeId, leadId); // 👈 aa line add kar
//     } else {
//       return mod.api();
//     }
//   })
// );

//         // ✅ BUILD FINAL STATS
//       const finalStats = results.map((res, index) => {
//   const module = modulesToShow[index];

//   if (res.status === "rejected") {
//     console.error("❌ API Failed:", module.title, res.reason);
//     return {
//       title: module.title,
//       value: 0,
//       color: module.color,
//       icon: module.icon,
//       path: module.path,
//       gradient: module.gradient,
//       accentColor: module.accentColor,
//     };
//   }

//   const response = res.value?.data;

//   let count = 0;

//   // ✅ SPECIAL CASE: TODAY FOLLOWUPS
//   if (module.title === "Today's Followups") {
//     count = response?.count || 0;
//   }

//   // ✅ NORMAL APIs (array)
// else if (Array.isArray(response?.data)) {

//   // 🔥 SPECIAL FILTER FOR LEADS ONLY
//   if (module.title === "Leads") {
//     const filtered = response.data.filter(
//       (item) =>
//         item.lead_status === "Lead" ||
//         item.lead_status === "Prospect"
//     );

//     count = filtered.length;
//   } else {
//     count = response.data.length;
//   }
// }

//   // ✅ object type response
//   else if (typeof response?.data === "object" && response.data !== null) {
//     count = Object.keys(response.data).length;
//   }

//   return {
//     title: module.title,
//     value: count,
//     color: module.color,
//     icon: module.icon,
//     path: module.path,
//     gradient: module.gradient,
//     accentColor: module.accentColor,
//   };
// });

//         setStats(finalStats);

//         // 🔥 Static activity (you can replace with API later)
//         setRecentActivity([
//           { id: 1, action: "New employee joined", department: "Engineering", time: "2 hours ago", icon: "👤" },
//           { id: 2, action: "Role updated", department: "HR", time: "4 hours ago", icon: "🎯" },
//           { id: 3, action: "Office branch added", department: "Operations", time: "1 day ago", icon: "🏢" },
//           { id: 4, action: "Department restructured", department: "Management", time: "2 days ago", icon: "📊" },
//         ]);

//       } catch (err) {
//         console.error("🔥 Dashboard Fatal Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllStats();
//   }, [employeeId, isHR]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br rounded-xl from-gray-50 to-gray-100 p-6 md:p-8">

//       {/* ================= HEADER ================= */}
//       <div className="mb-12">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
//           <div className="mb-6 md:mb-0">
//             <div className="flex items-center mb-3">
//               <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Executive Dashboard
//                 </h1>
//                 <p className="text-gray-600 mt-1">
//                   Real-time insights and analytics
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="relative p-2 hover:bg-white rounded-xl transition-all">
//               <Bell className="w-6 h-6 text-gray-600" />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             <button className="px-6 py-3 bg-gray-900 text-white rounded-xl flex items-center shadow-lg">
//               <Calendar className="w-5 h-5 mr-3" />
//               {new Date().toLocaleDateString("en-GB")}
//             </button>
//           </div>
//         </div>

//         {/* ================= CARDS ================= */}
//         <div className="relative">
//           <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
//             {loading
//               ? Array(6).fill(0).map((_, i) => (
//                 <div key={i} className="h-32 bg-white rounded-2xl shadow animate-pulse" />
//               ))
//               : stats.map((card, i) => (
//                 <Card
//                   key={i}
//                   title={card.title}
//                   value={card.value}
//                   color={card.color}
//                   icon={card.icon}
//                   path={card.path}
//                   gradient={card.gradient}
//                   accentColor={card.accentColor}
//                 />
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-8">

//           {/* Performance */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center">
//                 <Target className="w-7 h-7 text-indigo-600 mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Performance Metrics
//                 </h2>
//               </div>
//               <button className="text-sm font-semibold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-lg">
//                 View Report <ChevronRight className="w-4 h-4 inline ml-1" />
//               </button>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { label: "Growth Rate", value: "24.5%", change: "+2.3%", icon: "📈" },
//                 { label: "Efficiency", value: "89.2%", change: "+1.8%", icon: "⚡" },
//                 { label: "Satisfaction", value: "4.8/5", change: "+0.2", icon: "⭐" },
//                 { label: "Retention", value: "96.7%", change: "+0.5%", icon: "🎯" },
//               ].map((metric, idx) => (
//                 <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="text-2xl mb-3">{metric.icon}</div>
//                   <p className="text-sm text-gray-500 mb-2">{metric.label}</p>
//                   <div className="flex items-end justify-between">
//                     <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
//                     <span className="flex items-center text-sm font-semibold text-green-600">
//                       <TrendingUp className="w-4 h-4 mr-1" />
//                       {metric.change}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center mb-8">
//               <Activity className="w-7 h-7 text-blue-600 mr-3" />
//               <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
//             </div>

//             <div className="space-y-6">
//               {recentActivity.map((activity) => (
//                 <div key={activity.id} className="flex items-center p-5 rounded-xl border border-gray-200">
//                   <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mr-5 text-xl">
//                     {activity.icon}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900 mb-1">{activity.action}</p>
//                     <p className="text-sm text-gray-500">{activity.department}</p>
//                   </div>
//                   <span className="text-sm text-gray-500">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//           <div className="flex items-center mb-8">
//             <Shield className="w-7 h-7 text-green-600 mr-3" />
//             <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
//           </div>

//           <div className="space-y-4">
//             {["Database", "API Gateway", "Authentication", "File Storage"].map((service, idx) => (
//               <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                 <p className="font-medium text-gray-800">{service}</p>
//                 <span className="text-green-600 font-semibold text-sm">Operational</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



// aa perfect chhe details vag
"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { dashboardModules } from "../config/dashboardModules";
import { useUser } from "../hooks/useUser";
import {
  Calendar,
  ChevronRight,
  Activity,
  Shield,
  BarChart3,
  Target,
  TrendingUp,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const { employeeId, isHR,leadId } = useUser(); // 🔥 આ લાઇન ઉમેરો




  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        // 🔥 FILTER MODULES BASED ON USER ROLE
        // let modulesToShow = [...dashboardModules];

        let modulesToShow = dashboardModules.filter((module) => {
          if (isHR) {
            return module.title !== "Today's Followups";
          } else {
            return ["Visits", "Leads", "Today's Followups"].includes(module.title);
          }
        });
        // ✅ SAFE MULTI API CALL
       // ✅ SAFE MULTI API CALL
const results = await Promise.allSettled(
  modulesToShow.map((mod) => {
    if (!isHR) {
      return mod.api(employeeId, leadId); // 👈 aa line add kar
    } else {
      return mod.api();
    }
  })
);

        // ✅ BUILD FINAL STATS
      const finalStats = results.map((res, index) => {
  const module = modulesToShow[index];

  if (res.status === "rejected") {
    console.error("❌ API Failed:", module.title, res.reason);
    return {
      title: module.title,
      value: 0,
      color: module.color,
      icon: module.icon,
      path: module.path,
      gradient: module.gradient,
      accentColor: module.accentColor,
    };
  }

  const response = res.value?.data;

  let count = 0;

  // ✅ SPECIAL CASE: TODAY FOLLOWUPS
  if (module.title === "Today's Followups") {
    count = response?.count || 0;
  }

  // ✅ NORMAL APIs (array)
else if (Array.isArray(response?.data)) {

  // 🔥 SPECIAL FILTER FOR LEADS ONLY
  if (module.title === "Leads") {
    const filtered = response.data.filter(
      (item) =>
        item.lead_status === "Lead" ||
        item.lead_status === "Prospect"
    );

    count = filtered.length;
  } else {
    count = response.data.length;
  }
}

  // ✅ object type response
  else if (typeof response?.data === "object" && response.data !== null) {
    count = Object.keys(response.data).length;
  }

  return {
    title: module.title,
    value: count,
    color: module.color,
    icon: module.icon,
    path: module.path,
    gradient: module.gradient,
    accentColor: module.accentColor,
  };
});

        setStats(finalStats);

        // 🔥 Static activity (you can replace with API later)
        setRecentActivity([
          { id: 1, action: "New employee joined", department: "Engineering", time: "2 hours ago", icon: "👤" },
          { id: 2, action: "Role updated", department: "HR", time: "4 hours ago", icon: "🎯" },
          { id: 3, action: "Office branch added", department: "Operations", time: "1 day ago", icon: "🏢" },
          { id: 4, action: "Department restructured", department: "Management", time: "2 days ago", icon: "📊" },
        ]);

      } catch (err) {
        console.error("🔥 Dashboard Fatal Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [employeeId, isHR]);

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-xl from-gray-50 to-gray-100 p-6 md:p-8">

      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Executive Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Real-time insights and analytics
                </p>
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
              {new Date().toLocaleDateString("en-GB")}
            </button>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
            {loading
              ? Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-white rounded-2xl shadow animate-pulse" />
              ))
              : stats.map((card, i) => (
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}