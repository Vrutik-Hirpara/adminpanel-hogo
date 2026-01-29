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









import { useEffect, useState } from "react";
import Card from "../components/Card";
import { dashboardModules } from "../../src/config/dashboardModules";

export default function Dashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const results = await Promise.all(
          dashboardModules.map((mod) => mod.api())
        );

        const finalStats = results.map((res, index) => ({
          title: dashboardModules[index].title,
          value: res.data.data.length,
          color: dashboardModules[index].color,
        }));

        setStats(finalStats);
      } catch (err) {
        console.log("Dashboard error:", err);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome Employee 👋</h1>

      {/* DESIGN NOT CHANGED */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {stats.map((card, i) => (
          <Card key={i} title={card.title} value={card.value} color={card.color} />
        ))}
      </div>
    </div>
  );
}
