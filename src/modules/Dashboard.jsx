// import Card from "../components/Card";
// import { themes } from "../config/theme.config";

// export default function Dashboard() {
//   return (
//       <div>
//         <h1 className="text-3xl font-bold mb-8">Welcome Employee 👋</h1>

//         {/* Cards */}
//         <div className="grid grid-cols-4 gap-6 mb-10">
//           <Card title="Department" value="5" color={themes.cardDepartment} />
//           <Card title="Events" value="3" color={themes.cardEvent} />
//           <Card title="Contacts" value="4" color={themes.cardContact} />
//           <Card title="Roles" value="2" color={themes.cardDonation} />
//         </div>
//       </div>
//   );
// }

// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { themes } from "../config/theme.config";

// import { getDepartments } from "../services/department.service";
// import { getRoles } from "../services/roles.service";
// import { getOfficeBranches } from "../services/officebranches.service";

// export default function Dashboard() {
//   const [counts, setCounts] = useState({
//     departments: 0,
//     roles: 0,
//     branches: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const [deptRes, roleRes, branchRes] = await Promise.all([
//           getDepartments(),
//           getRoles(),
//           getOfficeBranches(),
//         ]);

//         setCounts({
//           departments: deptRes.data.length,
//           roles: roleRes.data.length,
//           branches: branchRes.data.length,
//         });
//       } catch (err) {
//         console.log("Dashboard fetch error:", err);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">Welcome Employee 👋</h1>

//       {/* SAME DESIGN — just dynamic values */}
//       <div className="grid grid-cols-4 gap-6 mb-10">
//         <Card
//           title="Department"
//           value={counts.departments}
//           color={themes.cardDepartment}
//         />

//         <Card
//           title="Roles"
//           value={counts.roles}
//           color={themes.cardDonation}
//         />

//         <Card
//           title="Office Branches"
//           value={counts.branches}
//           color={themes.cardEvent}
//         />

//         {/* Future ready — if you add more modules, just add here */}
//       </div>
//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { dashboardModules } from "../../src/config/dashboardModules";

// export default function Dashboard() {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     const fetchAllStats = async () => {
//       try {
//         const results = await Promise.all(
//           dashboardModules.map((mod) => mod.api())
//         );

//         const finalStats = results.map((res, index) => ({
//           title: dashboardModules[index].title,
//           value: res.data.data.length,
//           color: dashboardModules[index].color,
//         }));

//         setStats(finalStats);
//       } catch (err) {
//         console.log("Dashboard error:", err);
//       }
//     };

//     fetchAllStats();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">Welcome Employee 👋</h1>

//       {/* DESIGN NOT CHANGED */}
//       <div className="grid grid-cols-4 gap-6 mb-10">
//         {stats.map((card, i) => (
//           <Card key={i} title={card.title} value={card.value} color={card.color} />
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { dashboardModules } from "../../src/config/dashboardModules";
// import { 
//   Calendar,
//   Users,
//   ChevronRight,
//   Activity,
//   Database,
//   Shield,
//   Building2 ,
//   Briefcase,
//   MapPin 
// } from "lucide-react";

// export default function Dashboard() {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     const fetchAllStats = async () => {
//       try {
//         setLoading(true);
//         const results = await Promise.all(
//           dashboardModules.map((mod) => mod.api())
//         );

//         const finalStats = results.map((res, index) => ({
//           title: dashboardModules[index].title,
//           value: res.data.data.length,
//           color: dashboardModules[index].color,
//           icon: dashboardModules[index].icon,
//           path: dashboardModules[index].path,
//         }));

//         setStats(finalStats);

//         // Mock recent activity data
//         setRecentActivity([
//           { id: 1, action: "New employee joined", department: "Engineering", time: "2 hours ago" },
//           { id: 2, action: "Role updated", department: "HR", time: "4 hours ago" },
//           { id: 3, action: "Office branch added", department: "Operations", time: "1 day ago" },
//           { id: 4, action: "Department restructured", department: "Management", time: "2 days ago" },
//         ]);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 md:p-8">
//       {/* Header Section */}
//       <div className="mb-10">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
//             <p className="text-gray-600">Welcome back! Here's what's happening with your organization.</p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
//               <Calendar className="w-5 h-5 mr-2" />
//               {new Date().toLocaleDateString('en-US', { 
//                 weekday: 'long', 
//                 month: 'short', 
//                 day: 'numeric' 
//               })}
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {loading ? (
//             // Loading skeleton
//             Array(4).fill(0).map((_, i) => (
//               <div key={i} className="p-6 rounded-2xl bg-white shadow animate-pulse">
//                 <div className="flex items-start justify-between mb-5">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
//                     <div className="h-5 bg-gray-200 rounded w-24"></div>
//                   </div>
//                 </div>
//                 <div className="h-9 bg-gray-200 rounded w-3/4 mb-3"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             ))
//           ) : (
//             stats.map((card, i) => (
//               <Card 
//                 key={i} 
//                 title={card.title} 
//                 value={card.value} 
//                 color={card.color}
//                 icon={card.icon}
//                 path={card.path}
//               />
//             ))
//           )}
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Quick Actions & Activity */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Quick Actions Section */}
//           <div className="bg-white rounded-2xl shadow p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
//               <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
//                 All Actions <ChevronRight className="w-4 h-4 ml-1" />
//               </button>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {dashboardModules.map((module, index) => (
//                 <a
//                   key={index}
//                   href={module.path}
//                   className="p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all text-center group"
//                 >
//                   <div 
//                     className="w-14 h-14 rounded-lg mx-auto mb-4 flex items-center justify-center"
//                     style={{ backgroundColor: `${module.color}15` }}
//                   >
//                     {(() => {
//                       const IconComponent = {
//                         "Departments": Building2,
//                         "Roles": Briefcase,
//                         "Office Branches": MapPin,
//                         "Employees": Users
//                       }[module.title];
//                       return <IconComponent className="w-7 h-7" style={{ color: module.color }} />;
//                     })()}
//                   </div>
//                   <span className="font-medium text-gray-700 group-hover:text-blue-600 text-sm">
//                     Manage {module.title}
//                   </span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activity Section */}
//           <div className="bg-white rounded-2xl shadow p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <Activity className="w-6 h-6 text-blue-600 mr-3" />
//                 <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
//               </div>
//               <button className="text-sm text-gray-500 hover:text-gray-700">
//                 View All
//               </button>
//             </div>
//             <div className="space-y-4">
//               {recentActivity.map((activity) => (
//                 <div key={activity.id} className="flex items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
//                   <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
//                     <Users className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-900">{activity.action}</p>
//                     <p className="text-sm text-gray-500">{activity.department} Department</p>
//                   </div>
//                   <span className="text-sm text-gray-400 whitespace-nowrap">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Summary & Status */}
//         <div className="space-y-8">
//           {/* Summary Card */}
//           <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
//             <h2 className="text-xl font-bold mb-6">Organization Summary</h2>
//             <div className="space-y-5">
//               {stats.map((stat, index) => (
//                 <div key={index} className="flex items-center justify-between py-2">
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center" 
//                          style={{ backgroundColor: `${stat.color}20` }}>
//                       {(() => {
//                         const IconComponent = {
//                           "Departments": Building2,
//                           "Roles": Briefcase,
//                           "Office Branches": MapPin,
//                           "Employees": Users
//                         }[stat.title];
//                         return <IconComponent className="w-4 h-4" style={{ color: stat.color }} />;
//                       })()}
//                     </div>
//                     <span className="font-medium">{stat.title}</span>
//                   </div>
//                   <span className="text-lg font-bold">{stat.value}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-8 pt-6 border-t border-gray-700">
//               <p className="text-sm opacity-80 mb-1">Total Resources</p>
//               <p className="text-2xl font-bold">
//                 {stats.reduce((acc, stat) => acc + stat.value, 0)}
//               </p>
//             </div>
//           </div>

//           {/* System Status */}
//           <div className="bg-white rounded-2xl shadow p-6">
//             <div className="flex items-center mb-6">
//               <Shield className="w-6 h-6 text-green-600 mr-3" />
//               <h2 className="text-xl font-bold text-gray-900">System Status</h2>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center">
//                   <Database className="w-5 h-5 text-blue-600 mr-3" />
//                   <span className="text-gray-700">Database</span>
//                 </div>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                   Connected
//                 </span>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-700">API Services</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                   Active
//                 </span>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-700">Last Updated</span>
//                 <span className="text-gray-900 font-medium">
//                   {new Date().toLocaleTimeString([], { 
//                     hour: '2-digit', 
//                     minute: '2-digit' 
//                   })}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Note */}
//       <div className="mt-12 pt-8 border-t border-gray-200">
//         <p className="text-sm text-gray-500 text-center">
//           Data updates in real-time • Last refresh: Just now
//         </p>
//       </div>
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { dashboardModules } from "../../src/config/dashboardModules";
// import {
//   Calendar,
//   ChevronRight,
//   Activity,
//   Database,
//   Shield,
//   BarChart3,
//   Target,
//   TrendingUp,
//   Bell,
//   Building2,
//   Briefcase,
//   MapPin,
//   Users
// } from "lucide-react";

// // Define icon components here for Dashboard
// const iconComponents = {
//   Building2: Building2,
//   Briefcase: Briefcase,
//   MapPin: MapPin,
//   Users: Users,
// };

// export default function Dashboard() {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     const fetchAllStats = async () => {
//       try {
//         setLoading(true);
//         const results = await Promise.all(
//           dashboardModules.map((mod) => mod.api())
//         );

//         const finalStats = results.map((res, index) => ({
//           title: dashboardModules[index].title,
//           value: res.data.data.length,
//           color: dashboardModules[index].color,
//           icon: dashboardModules[index].icon,
//           path: dashboardModules[index].path,
//           gradient: dashboardModules[index].gradient,
//           accentColor: dashboardModules[index].accentColor,
//         }));

//         setStats(finalStats);

//         // Mock recent activity data
//         setRecentActivity([
//           { id: 1, action: "New employee joined", department: "Engineering", time: "2 hours ago", icon: "👤", type: "employee" },
//           { id: 2, action: "Role updated", department: "HR", time: "4 hours ago", icon: "🎯", type: "role" },
//           { id: 3, action: "Office branch added", department: "Operations", time: "1 day ago", icon: "🏢", type: "office" },
//           { id: 4, action: "Department restructured", department: "Management", time: "2 days ago", icon: "📊", type: "department" },
//         ]);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
//       {/* Header Section with Premium Design */}
//       <div className="mb-12">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
//           <div className="mb-6 md:mb-0">
//             <div className="flex items-center mb-3">
//               <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg mr-4">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
//                 <p className="text-gray-600 mt-1">Real-time insights and analytics for your organization</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="relative p-2 hover:bg-white rounded-xl transition-all">
//               <Bell className="w-6 h-6 text-gray-600" />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             <button className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl 
//                            hover:shadow-xl transition-all duration-300 flex items-center shadow-lg">
//               <Calendar className="w-5 h-5 mr-3" />
//               <span className="font-semibold">
//                 {new Date().toLocaleDateString('en-US', {
//                   month: 'short',
//                   day: 'numeric',
//                   year: 'numeric'
//                 })}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Premium Stats Cards Grid */}
//         <div className="relative">
//           {/* Background Decorative Element */}
//           <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 
//                        rounded-full opacity-10 blur-3xl"></div>

//           <div className="flex flex-col sm:flex-row flex-wrap gap-8 relative z-10">
//             {loading ? (
//               // Premium Loading Skeletons
//               Array(4).fill(0).map((_, i) => (
//                 <div key={i} className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl animate-pulse">
//                   <div className="flex items-start justify-between mb-6">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
//                       <div>
//                         <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
//                         <div className="h-3 bg-gray-200 rounded w-20"></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
//                   <div className="h-2 bg-gray-200 rounded-full mb-8"></div>
//                   <div className="h-10 bg-gray-200 rounded"></div>
//                 </div>
//               ))
//             ) : (
//               stats.map((card, i) => (
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
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content Grid with Premium Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Analytics & Activity */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* KPI Summary */}
//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center">
//                 <Target className="w-7 h-7 text-indigo-600 mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
//               </div>
//               <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 
//                               px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors">
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
//                 <div key={idx} className="p-5 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 
//                                        hover:shadow-lg transition-all group">
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

//           {/* Recent Activity with Premium Design */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center">
//                 <Activity className="w-7 h-7 text-blue-600 mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
//               </div>
//               <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
//                 Live
//               </span>
//             </div>

//             <div className="space-y-6">
//               {recentActivity.map((activity) => (
//                 <div key={activity.id}
//                   className="flex items-center p-5 rounded-xl border border-gray-200 hover:border-blue-200 
//                               hover:bg-gradient-to-r hover:from-white hover:to-blue-50 transition-all group">
//                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 
//                                 flex items-center justify-center mr-5 text-xl group-hover:scale-110 transition-transform">
//                     {activity.icon}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900 mb-1">{activity.action}</p>
//                     <p className="text-sm text-gray-500">{activity.department} Department</p>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-sm text-gray-500 font-medium">{activity.time}</span>
//                     <div className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${activity.type === 'employee' ? 'bg-green-100 text-green-800' :
//                         activity.type === 'role' ? 'bg-purple-100 text-purple-800' :
//                           activity.type === 'office' ? 'bg-red-100 text-red-800' :
//                             'bg-blue-100 text-blue-800'
//                       }`}>
//                       {activity.type}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Summary & Status */}
//         <div className="space-y-8">
//           {/* Premium Summary Card */}
//           <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl 
//                        shadow-2xl p-8 text-white relative overflow-hidden">
//             {/* Animated Background */}
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>

//             <div className="relative z-10">
//               <div className="flex items-center mb-8">
//                 <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 mr-4">
//                   <Database className="w-6 h-6" />
//                 </div>
//                 <h2 className="text-2xl font-bold">Organization Overview</h2>
//               </div>

//               <div className="space-y-6">
//                 {stats.map((stat, index) => {
//                   const IconComponent = iconComponents[stat.icon];
//                   return (
//                     <div key={index} className="flex items-center justify-between py-3 
//                                              border-b border-gray-700/50 last:border-0">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-lg mr-4 flex items-center justify-center"
//                           style={{ backgroundColor: `${stat.accentColor}20` }}>
//                           {IconComponent && (
//                             <IconComponent className="w-5 h-5" style={{ color: stat.accentColor }} />
//                           )}
//                         </div>
//                         <span className="font-medium">{stat.title}</span>
//                       </div>
//                       <span className="text-xl font-bold">{stat.value}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="mt-10 pt-6 border-t border-gray-700/50">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-sm opacity-80 mb-1">Total Resources</p>
//                     <p className="text-3xl font-bold">
//                       {stats.reduce((acc, stat) => acc + stat.value, 0)}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm opacity-80 mb-1">Growth</p>
//                     <p className="text-xl font-bold text-green-400">+18.2%</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* System Status Card */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex items-center mb-8">
//               <Shield className="w-7 h-7 text-green-600 mr-3" />
//               <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
//             </div>

//             <div className="space-y-4">
//               {[
//                 { service: "Database", status: "operational", latency: "24ms" },
//                 { service: "API Gateway", status: "operational", latency: "42ms" },
//                 { service: "Authentication", status: "operational", latency: "18ms" },
//                 { service: "File Storage", status: "operational", latency: "56ms" },
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                   <div>
//                     <p className="font-medium text-gray-800">{item.service}</p>
//                     <p className="text-sm text-gray-500">{item.latency} latency</p>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                     <span className="text-sm font-semibold text-green-700 capitalize">{item.status}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <p className="text-center text-sm text-gray-500">
//                 All systems operational • Uptime: 99.97%
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-12 pt-8 border-t border-gray-300/30">
//         <p className="text-center text-sm text-gray-500 font-medium">
//           Dashboard updated in real-time • Data refreshes every 30 seconds
//           <span className="mx-4">•</span>
//           <span className="text-green-600">●</span> All systems normal
//         </p>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import Card from "../components/Card";
import { dashboardModules } from "../../src/config/dashboardModules";
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

const iconComponents = {
  Building2,
  Briefcase,
  MapPin,
  Users,
};

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          dashboardModules.map((mod) => mod.api())
        );

        const finalStats = results.map((res, index) => ({
          title: dashboardModules[index].title,
          value: res.data.data.length,
          color: dashboardModules[index].color,
          icon: dashboardModules[index].icon,
          path: dashboardModules[index].path,
          gradient: dashboardModules[index].gradient,
          accentColor: dashboardModules[index].accentColor,
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
