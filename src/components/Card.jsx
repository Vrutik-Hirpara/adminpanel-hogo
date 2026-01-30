// import { motion } from "framer-motion";

// export default function Card({ title, value, color }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="p-5 rounded-xl text-white shadow-lg h-[110px] flex flex-col justify-center"
//       style={{ backgroundColor: color }}
//     >
//       <h3 className="text-sm opacity-90">{title}</h3>
//       <p className="text-3xl font-bold">{value}</p>
//     </motion.div>
//   );
// }







// import { motion } from "framer-motion";
// import { 
//   Building2, 
//   Briefcase, 
//   MapPin, 
//   Users, 
//   ArrowUpRight,
//   TrendingUp 
// } from "lucide-react";

// const iconComponents = {
//   Building2: Building2,
//   Briefcase: Briefcase,
//   MapPin: MapPin,
//   Users: Users,
// };

// export default function Card({ title, value, color, icon, path }) {
//   const IconComponent = iconComponents[icon] || Building2;

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02, y: -4 }}
//       whileTap={{ scale: 0.98 }}
//       className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
//     >
//       <div className="flex items-start justify-between mb-5">
//         <div className="flex items-center space-x-3">
//           <div 
//             className="p-3 rounded-xl"
//             style={{ backgroundColor: `${color}15` }}
//           >
//             <IconComponent className="w-6 h-6" style={{ color: color }} />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//         </div>
//         <ArrowUpRight className="w-5 h-5 text-gray-400" />
//       </div>
      
//       <div className="flex items-end justify-between">
//         <div>
//           <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
//           <div className="flex items-center space-x-2">
//             <TrendingUp className="w-4 h-4 text-green-500" />
//             <span className="text-sm text-gray-500">Active</span>
//           </div>
//         </div>
//         <a 
//           href={path}
//           className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//           style={{ color: color }}
//         >
//           View All
//         </a>
//       </div>
//     </motion.div>
//   );
// }














// import { motion } from "framer-motion";
// import { 
//   Building2, 
//   Briefcase, 
//   MapPin, 
//   Users, 
//   ArrowUpRight,
//   TrendingUp,
//   MoreVertical,
//   Sparkles
// } from "lucide-react";

// const iconComponents = {
//   Building2: Building2,
//   Briefcase: Briefcase,
//   MapPin: MapPin,
//   Users: Users,
// };

// export default function Card({ title, value, color, icon, path, gradient, accentColor }) {
//   const IconComponent = iconComponents[icon] || Building2;
//   const trendValue = Math.floor(Math.random() * 12) + 5; // Random 5-16% for demo

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03, y: -6 }}
//       whileTap={{ scale: 0.98 }}
//       className="relative overflow-hidden group"
//     >
//       {/* Premium Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
//            style={{ background: `linear-gradient(135deg, ${accentColor}20, ${color}20)` }}>
//       </div>
      
//       <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl 
//                      border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full
//                      group-hover:border-opacity-0">
        
//         {/* Corner Accent */}
//         <div className="absolute top-0 right-0 w-24 h-24 -translate-y-12 translate-x-12 rotate-45 opacity-10 group-hover:opacity-20 transition-opacity"
//              style={{ backgroundColor: accentColor }}>
//         </div>
        
//         {/* Header with Icon */}
//         <div className="flex items-start justify-between mb-6 relative z-10">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               {/* Icon Background Glow */}
//               <div className="absolute inset-0 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"
//                    style={{ backgroundColor: accentColor }}>
//               </div>
              
//               {/* Icon Container */}
//               <div className="relative p-3.5 rounded-xl shadow-lg"
//                    style={{ 
//                      backgroundColor: accentColor,
//                      boxShadow: `0 10px 25px -5px ${accentColor}40`
//                    }}>
//                 <IconComponent className="w-6 h-6 text-white" />
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-bold text-gray-800">{title}</h3>
//               <div className="flex items-center space-x-2 mt-1">
//                 <div className="flex items-center px-2.5 py-0.5 rounded-full bg-green-50">
//                   <TrendingUp className="w-3.5 h-3.5 text-green-600 mr-1" />
//                   <span className="text-xs font-semibold text-green-700">
//                     +{trendValue}%
//                   </span>
//                 </div>
//                 <span className="text-xs text-gray-500 font-medium">this month</span>
//               </div>
//             </div>
//           </div>
          
//           <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <MoreVertical className="w-5 h-5 text-gray-400" />
//           </button>
//         </div>
        
//         {/* Main Value */}
//         <div className="mb-6 relative z-10">
//           <p className="text-4xl font-bold text-gray-900 mb-2">{value}</p>
//           <p className="text-sm text-gray-500 font-medium">Active records</p>
//         </div>
        
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between text-xs text-gray-500 mb-2">
//             <span>Capacity</span>
//             <span>{Math.min(100, Math.floor((value / 50) * 100))}%</span>
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//             <motion.div 
//               initial={{ width: 0 }}
//               animate={{ width: `${Math.min(100, Math.floor((value / 50) * 100))}%` }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               className="h-full rounded-full"
//               style={{ backgroundColor: accentColor }}
//             >
//               <div className="h-full w-1/3 bg-gradient-to-r from-transparent to-white opacity-30 animate-shimmer"></div>
//             </motion.div>
//           </div>
//         </div>
        
//         {/* Footer Actions */}
//         <div className="flex items-center justify-between relative z-10">
//           <a 
//             href={path}
//             className="flex items-center text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-all group/btn"
//             style={{ color: accentColor }}
//           >
//             View Details
//             <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
//           </a>
          
//           <div className="flex items-center">
//             <Sparkles className="w-4 h-4 text-amber-500 mr-1" />
//             <span className="text-xs text-gray-500">Updated just now</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }








// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Card({ title, value, color, path }) {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={() => navigate(path)}
//       className="cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm p-6 
//                  hover:shadow-lg transition-all duration-300 relative overflow-hidden"
//     >
//       <div
//         className="absolute top-0 left-0 w-full h-1"
//         style={{ backgroundColor: color }}
//       />

//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//             {title}
//           </p>
//           <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
//         </div>

//         <div
//           className="w-12 h-12 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: color + "20" }}
//         >
//           <div className="w-5 h-5 rounded-md" style={{ backgroundColor: color }} />
//         </div>
//       </div>
//     </motion.div>
//   );
// }





import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Card({ title, value, color, path, icon: Icon }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => navigate(path)}
      className="cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm p-6 
                 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* 🔵 TOP ACCENT LINE (RESTORED) */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: color }}
      />

      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
        </div>

        {/* ICON BOX */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "20" }}
        >
          {Icon && <Icon className="w-6 h-6" style={{ color }} />}
        </div>
      </div>
    </motion.div>
  );
}
