// import api from "../services/api";
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import { TravelPlanAPI, DailyPlanAPI } from "../services";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityTableRow from "../components/table/EntityTableRow";
// import EntityForm from "../components/form/EntityForm";

// export default function TravelPlan() {
//   const [travelPlans, setTravelPlans] = useState([]);
//   const [filteredPlans, setFilteredPlans] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [dailyPlans, setDailyPlans] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [calendarMonth, setCalendarMonth] = useState("");
//   const [calendarYear, setCalendarYear] = useState(2026);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [editDailyPlan, setEditDailyPlan] = useState(null);
//   const [formData, setFormData] = useState({ place: "", notes: "" });
//   const [availableMonths, setAvailableMonths] = useState([]);

//   // Month index mapping
//   const monthIndexMap = {
//     January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
//     July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
//   };

//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   // Fetch travel plans
//   const fetchTravelPlans = async () => {
//     try {
//       const res = await TravelPlanAPI.getAll();
//       const data = res.data?.data || [];
//       setTravelPlans(data);

//       const months = [...new Set(data.map(plan => plan.month))];
//       setAvailableMonths(months);

//       if (months.length > 0 && !selectedMonth) {
//         setSelectedMonth(months[0]);
//         setCalendarMonth(months[0]);
//         filterPlansByMonth(months[0], data);
//       }
//     } catch (error) {
//       console.error("Error fetching travel plans:", error);
//     }
//   };

//   const filterPlansByMonth = (month, plans = travelPlans) => {
//     const filtered = plans.filter(plan => plan.month === month);
//     setFilteredPlans(filtered);

//     if (filtered.length > 0) {
//       setSelectedPlan(filtered[0]);
//       fetchDailyPlans(filtered[0].id);
//     } else {
//       setSelectedPlan(null);
//       setDailyPlans([]);
//     }
//   };

// // Replace the fetchDailyPlans function with this:
// const fetchDailyPlans = async (travelPlanId) => {
//   try {
//     // Fetch all daily plans and filter by travel_plan ID
//     const res = await DailyPlanAPI.getAll();
//     const allDailyPlans = res.data?.data || [];
//     const filtered = allDailyPlans.filter(plan => plan.travel_plan === travelPlanId);
//     setDailyPlans(filtered);
//   } catch (error) {
//     console.error("Error fetching daily plans:", error);
//   }
// };

//   useEffect(() => {
//     fetchTravelPlans();
//   }, []);

//   useEffect(() => {
//     if (selectedMonth) {
//       filterPlansByMonth(selectedMonth);
//     }
//   }, [selectedMonth]);

//   const onSubmit = async (data) => {
//     try {
//       if (selectedPlan) {
//         await TravelPlanAPI.update(selectedPlan.id, data);
//       } else {
//         await TravelPlanAPI.create(data);
//       }
//       setMode("list");
//       fetchTravelPlans();
//     } catch (error) {
//       console.error("Error saving travel plan:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await TravelPlanAPI.delete(id);
//       fetchTravelPlans();
//     } catch (error) {
//       console.error("Error deleting travel plan:", error);
//     }
//   };

//   // Calendar navigation functions
//   const goToPreviousMonth = () => {
//     let newMonthIndex = monthIndexMap[calendarMonth] - 1;
//     let newYear = calendarYear;

//     if (newMonthIndex < 0) {
//       newMonthIndex = 11;
//       newYear--;
//     }

//     setCalendarMonth(monthNames[newMonthIndex]);
//     setCalendarYear(newYear);
//   };

//   const goToNextMonth = () => {
//     let newMonthIndex = monthIndexMap[calendarMonth] + 1;
//     let newYear = calendarYear;

//     if (newMonthIndex > 11) {
//       newMonthIndex = 0;
//       newYear++;
//     }

//     setCalendarMonth(monthNames[newMonthIndex]);
//     setCalendarYear(newYear);
//   };

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, monthIndexMap[month] + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (month, year) => {
//     return new Date(year, monthIndexMap[month], 1).getDay();
//   };

//   const getDailyPlanForDate = (date) => {
//     const dateStr = `${calendarYear}-${String(monthIndexMap[calendarMonth] + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
//     return dailyPlans.find(plan => plan.date === dateStr);
//   };

// const handleAddDailyPlan = async () => {
//   try {
//     const dateStr = `${calendarYear}-${String(monthIndexMap[calendarMonth] + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;

//     const payload = {
//       travel_plan: selectedPlan?.id,
//       date: dateStr,
//       place: formData.place,
//       notes: formData.notes
//     };

//     console.log("Sending payload:", payload);

//     // Use api for direct POST
//     const response = await api.post("/daily-plan/", payload);

//     if (response.data) {
//       await fetchDailyPlans(selectedPlan?.id);
//       setShowAddModal(false);
//       setFormData({ place: "", notes: "" });
//       setSelectedDate(null);
//     }
//   } catch (error) {
//     console.error("Error adding daily plan:", error.response?.data || error);
//     alert(error.response?.data?.message || "Failed to add daily plan");
//   }
// };

// const handleUpdateDailyPlan = async () => {
//   try {
//     const response = await api.patch(`/daily-plan/${editDailyPlan.id}/`, {
//       place: formData.place,
//       notes: formData.notes
//     });

//     if (response.data) {
//       await fetchDailyPlans(selectedPlan?.id);
//       setEditDailyPlan(null);
//       setFormData({ place: "", notes: "" });
//     }
//   } catch (error) {
//     console.error("Error updating daily plan:", error.response?.data || error);
//     alert(error.response?.data?.message || "Failed to update daily plan");
//   }
// };

// const handleDeleteDailyPlan = async () => {
//   try {
//     await api.delete(`/daily-plan/${editDailyPlan.id}/`);
//     await fetchDailyPlans(selectedPlan?.id);
//     setEditDailyPlan(null);
//     setFormData({ place: "", notes: "" });
//   } catch (error) {
//     console.error("Error deleting daily plan:", error.response?.data || error);
//     alert(error.response?.data?.message || "Failed to delete daily plan");
//   }
// };



//   const handleDateClick = (date) => {
//     if (!selectedPlan) {
//       alert("Please select a travel plan first");
//       return;
//     }

//     const existingPlan = getDailyPlanForDate(date);
//     if (existingPlan) {
//       setEditDailyPlan(existingPlan);
//       setFormData({ place: existingPlan.place, notes: existingPlan.notes || "" });
//     } else {
//       setSelectedDate(date);
//       setFormData({ place: "", notes: "" });
//       setShowAddModal(true);
//     }
//   };

//   const renderCalendar = () => {
//     if (!calendarMonth) return null;

//     const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
//     const firstDay = getFirstDayOfMonth(calendarMonth, calendarYear);
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     const calendarDays = [];
//     for (let i = 0; i < firstDay; i++) {
//       calendarDays.push(null);
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       calendarDays.push(i);
//     }

//     return (
//       <div>
//         <div className="grid grid-cols-7 gap-2 mb-3">
//           {days.map(day => (
//             <div key={day} className="text-center font-semibold text-sm py-2 text-gray-600">
//               {day.slice(0, 3)}
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-7 gap-2">
//           {calendarDays.map((day, index) => {
//             const dailyPlan = day ? getDailyPlanForDate(day) : null;
//             return (
//               <div
//                 key={index}
//                 onClick={() => day && handleDateClick(day)}
//                 className={`min-h-[100px] border rounded-lg p-2 cursor-pointer transition-all ${
//                   dailyPlan 
//                     ? 'bg-blue-100 border-blue-400 hover:bg-blue-200' 
//                     : 'bg-white border-[var(--border-black-200)] hover:bg-[var(--surfaceLight)]'
//                 }`}
//               >
//                 {day && (
//                   <>
//                     <div className={`text-sm font-medium ${dailyPlan ? 'text-blue-700' : 'text-gray-700'}`}>
//                       {day}
//                     </div>
//                     {dailyPlan && (
//                       <div className="mt-1">
//                         <div className="text-xs font-semibold text-blue-800">{dailyPlan.place}</div>
//                         {dailyPlan.notes && (
//                           <div className="text-xs text-gray-600 truncate mt-0.5">{dailyPlan.notes}</div>
//                         )}
//                       </div>
//                     )}
//                     {!dailyPlan && selectedPlan && (
//                       <div className="mt-1">
//                         <div className="text-xs text-gray-400">+ Add</div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const travelPlanColumns = [
//     { key: "month" },
//     { key: "start_date" },
//     { key: "end_date" },
//     { key: "region" },
//     { key: "states" },
//     { key: "rm" },
//     { key: "tsm" },
//   ];

//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         {/* Add Daily Plan Modal */}
//       {/* Add Daily Plan Modal - With blur background */}
// {/* Add Daily Plan Modal - With blur background */}
// {showAddModal && (
//   <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
//     <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
//         <h3 className="text-lg font-semibold text-white">Add Plan — {selectedDate}</h3>
//       </div>
//       <div className="p-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">PLACE / CITY</label>
//             <input
//               type="text"
//               value={formData.place}
//               onChange={(e) => setFormData({ ...formData, place: e.target.value })}
//               placeholder="e.g. Surat"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">NOTES</label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               placeholder="Meeting details, activities..."
//               rows="3"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               onClick={() => {
//                 setShowAddModal(false);
//                 setFormData({ place: "", notes: "" });
//                 setSelectedDate(null);
//               }}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[var(--surfaceLight)] transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddDailyPlan}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

// {/* Edit Daily Plan Modal - With blur background */}
// {editDailyPlan && (
//   <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2px] bg-black/20">
//     <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
//         <h3 className="text-lg font-semibold text-white">Edit — {editDailyPlan.date}</h3>
//       </div>
//       <div className="p-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">PLACE / CITY</label>
//             <input
//               type="text"
//               value={formData.place}
//               onChange={(e) => setFormData({ ...formData, place: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">NOTES</label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               rows="3"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               onClick={handleDeleteDailyPlan}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => {
//                 setEditDailyPlan(null);
//                 setFormData({ place: "", notes: "" });
//               }}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[var(--surfaceLight)] transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleUpdateDailyPlan}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}



//         <div className="flex justify-between items-center mb-6">
//           <SectionTitle title="Travel Plan Manager" />
//           <ActionButtons 
//             showAdd 
//             addText="+ New Travel Plan" 
//             onAdd={() => {
//               setSelectedPlan(null);
//               setMode("form");
//             }} 
//           />
//         </div>

//         {/* Month Navigation - Changes both table AND calendar */}
//         {availableMonths.length > 0 && (
//           <div className="flex gap-2 mb-6">
//             {availableMonths.map((month) => (
//               <button
//                 key={month}
//                 onClick={() => {
//                   setSelectedMonth(month);
//                   setCalendarMonth(month);
//                   setCalendarYear(2026);
//                 }}
//                 className={`px-5 py-2 rounded-lg transition-all font-medium ${
//                   selectedMonth === month
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {month} — {2026}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Travel Plans Table - Filtered by selected month */}
//         <div className="mb-8">
//           <Table 
//             header={
//               <TableHeader 
//                 columns={["Month", "Start Date", "End Date", "Region", "State", "RM", "TSM", "Action"]} 
//               />
//             }
//           >
//             {filteredPlans.map((plan, index) => (
//               <EntityTableRow
//                 key={plan.id}
//                 row={plan}
//                 index={index}
//                 columns={travelPlanColumns}
//                 onView={(r) => {
//                   setSelectedPlan(r);
//                   fetchDailyPlans(r.id);
//                   setMode("view");
//                 }}
//                 onEdit={(r) => {
//                   setSelectedPlan(r);
//                   setMode("form");
//                 }}
//                 onDelete={(id) => handleDelete(id)}
//               />
//             ))}
//           </Table>
//         </div>

//         {/* Calendar View with Navigation Arrows */}
//        {calendarMonth && (
//   <div className="bg-white rounded-xl shadow-lg border border-[var(--border-black-200)] overflow-hidden">
//     <div className="bg-[var(--surfaceLight)] px-6 py-4 border-b border-[var(--border-black-200)] flex justify-center items-center gap-4">
//       <button
//         onClick={goToPreviousMonth}
//         className="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-gray-600"
//       >
//         ←
//       </button>
//       <h3 className="text-xl font-semibold text-gray-800">
//         {calendarMonth} - {calendarYear}
//       </h3>
//       <button
//         onClick={goToNextMonth}
//         className="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-gray-600"
//       >
//         →
//       </button>
//     </div>
//     <div className="p-6">
//       {renderCalendar()}
//     </div>
//   </div>
// )}
//       </PageContainer>
//     );
//   }

//   // ================= VIEW PAGE =================
//   if (mode === "view" && selectedPlan) {
//     return (
//       <EntityPageLayout
//         title="Travel Plan Details"
//         showBack
//         onBack={() => {
//           setSelectedPlan(null);
//           setDailyPlans([]);
//           setMode("list");
//         }}
//       >
//         <div className="bg-white rounded-xl shadow-lg">
//           <div className="p-6 border-b border-[var(--border-black-200)]">
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <label className="text-sm text-gray-500 uppercase tracking-wide">MONTH</label>
//                 <p className="font-medium text-gray-900 mt-1">{selectedPlan.month}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500 uppercase tracking-wide">DATE</label>
//                 <p className="font-medium text-gray-900 mt-1">
//                   {selectedPlan.start_date} to {selectedPlan.end_date}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500 uppercase tracking-wide">REGION</label>
//                 <p className="font-medium text-gray-900 mt-1">{selectedPlan.region}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500 uppercase tracking-wide">STATE</label>
//                 <p className="font-medium text-gray-900 mt-1">{selectedPlan.states}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500 uppercase tracking-wide">RM</label>
//                 <p className="font-medium text-gray-900 mt-1">{selectedPlan.rm}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500 uppercase tracking-wide">TSM</label>
//                 <p className="font-medium text-gray-900 mt-1">{selectedPlan.tsm}</p>
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
//               <button
//                 onClick={() => setMode("form")}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => {
//                   handleDelete(selectedPlan.id);
//                   setMode("list");
//                 }}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">Daily Itinerary</h3>
//             {dailyPlans.length > 0 ? (
//               <div className="space-y-3">
//                 {dailyPlans.map((daily) => (
//                   <div key={daily.id} className="border border-[var(--border-black-200)] rounded-lg p-4 hover:shadow-md">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <p className="font-semibold text-gray-900">{daily.date}</p>
//                         <p className="text-gray-700 mt-2">{daily.place}</p>
//                         {daily.notes && (
//                           <p className="text-gray-500 text-sm mt-2">{daily.notes}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-8 bg-[var(--surfaceLight)] rounded-lg">
//                 No daily plans created yet
//               </p>
//             )}
//           </div>
//         </div>
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM PAGE =================
//   return (
//     <EntityPageLayout 
//       title="Travel Plan Details" 
//       showBack 
//       onBack={() => setMode("list")}
//     >
//       <EntityForm
//         title={selectedPlan ? "Edit Travel Plan" : "Create Travel Plan"}
//         selectedItem={selectedPlan}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { 
//             label: "Month", 
//             name: "month", 
//             type: "select",
//             required: true,
//             options: [
//               { label: "January", value: "January" },
//               { label: "February", value: "February" },
//               { label: "March", value: "March" },
//               { label: "April", value: "April" },
//               { label: "May", value: "May" },
//               { label: "June", value: "June" },
//               { label: "July", value: "July" },
//               { label: "August", value: "August" },
//               { label: "September", value: "September" },
//               { label: "October", value: "October" },
//               { label: "November", value: "November" },
//               { label: "December", value: "December" }
//             ]
//           },
//           { label: "Start Date", name: "start_date", type: "date", required: true },
//           { label: "End Date", name: "end_date", type: "date", required: true },
//           { label: "Region", name: "region", required: true },
//           { label: "State", name: "states", required: true },
//           { label: "RM", name: "rm", required: true },
//           { label: "TSM", name: "tsm", required: true },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }



import api from "../services/api";
import { themes } from "../config/theme.config";
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import { TravelPlanAPI, DailyPlanAPI, EmployeeAPI, RegionsAPI } from "../services";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityTableRow from "../components/table/EntityTableRow";
import EntityForm from "../components/form/EntityForm";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors, parseBackendResponse } from "../utils/parseBackendErrors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useUser } from "../hooks/useUser";


export default function TravelPlan({ asSubcomponent }) {
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);

  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();

  const [travelPlans, setTravelPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [dailyPlans, setDailyPlans] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [calendarMonth, setCalendarMonth] = useState("");
  const [calendarYear, setCalendarYear] = useState(2026);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editDailyPlan, setEditDailyPlan] = useState(null);
  const [formData, setFormData] = useState({ place: "", notes: "" });
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  // Employee filtering states
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  // Month index mapping
  const monthIndexMap = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Initialize selectedEmployeeId and fetch regions
  useEffect(() => {
    if (!isHR && employeeId) {
      setSelectedEmployeeId(employeeId);
    }
    if (isHR) {
      fetchEmployees();
    }
    fetchRegions();
  }, [employeeId, isHR]);


  const convertToInputMonthFormat = (monthStr) => {
    if (!monthStr) return "";

    const [monthName, year] = monthStr.split(" - ");

    const monthIndex = monthIndexMap[monthName] + 1;

    return `${year}-${String(monthIndex).padStart(2, "0")}`;
  };
  // Add this helper function
  const extractMonthName = (monthStr) => {
    if (!monthStr) return "";
    // Handle "May - 2026", "may-2026", "May" formats
    const parts = monthStr.split(/[ -]+/);
    const name = parts[0];
    // Return Proper case (e.g. "January") to match monthIndexMap
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  const extractYear = (monthStr) => {
    if (!monthStr) return "";
    const parts = monthStr.split(/[ -]+/);
    return parts.length > 1 ? parts[parts.length - 1] : "";
  };

  // Fetch all employees for HR dropdown
  const fetchEmployees = async () => {
    try {
      const res = await EmployeeAPI.getAll();
      const data = res.data?.data || [];
      setEmployees(data);
      if (data.length > 0) {
        setSelectedEmployeeId(data[0].id);
      }
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error fetching employees:", error);
    }
  };
  // Fetch travel plans based on selected employee
  const fetchTravelPlans = async () => {
    if (!selectedEmployeeId) return;

    setLoading(true);
    try {
      const res = await TravelPlanAPI.getByEmployee(selectedEmployeeId);
      let data = res.data?.data || [];

      console.log(`Travel plans for employee ${selectedEmployeeId}:`, data);
      setTravelPlans(data);

      const rawMonths = [...new Set(data.map(plan => plan.month))];
      // 🔥 Chronological Sort: Year ASC, then Month Index ASC
      const sortedMonths = rawMonths.sort((a, b) => {
        const yearA = parseInt(extractYear(a)) || 0;
        const yearB = parseInt(extractYear(b)) || 0;
        if (yearA !== yearB) return yearA - yearB;

        const mIndexA = monthIndexMap[extractMonthName(a)] ?? -1;
        const mIndexB = monthIndexMap[extractMonthName(b)] ?? -1;
        return mIndexA - mIndexB;
      });

      console.log("Sorted months for UI:", sortedMonths);
      setAvailableMonths(sortedMonths);
      const months = sortedMonths; // Use sorted array for follow-up logic

      // In fetchTravelPlans function, where you set selectedMonth and calendarMonth
      if (months.length > 0) {
        // If selectedMonth exist kare ane list ma hoy → same rakho
        if (selectedMonth && months.includes(selectedMonth)) {
          filterPlansByMonth(selectedMonth, data);
        } else {
          // fallback
          setSelectedMonth(months[0]);
          const monthName = extractMonthName(months[0]);
          setCalendarMonth(monthName);
          filterPlansByMonth(months[0], data);
        }
      } else if (months.length === 0) {
        setFilteredPlans([]);
        setSelectedPlan(null);
        setDailyPlans([]);
        setAvailableMonths([]);
      } else if (selectedMonth && data.length > 0) {
        filterPlansByMonth(selectedMonth, data);
      }
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error fetching travel plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegions = async () => {
    try {
      const res = await RegionsAPI.getAll();
      const data = res.data?.data || [];
      setRegions(data);
    } catch (err) {
      console.error("Error fetching regions:", err);
    }
  };

  // Fetch travel plans when employee changes
  useEffect(() => {
    if (selectedEmployeeId) {
      fetchTravelPlans();
    }
  }, [selectedEmployeeId]);

  const filterPlansByMonth = (month, plans = travelPlans) => {
    const filtered = plans.filter(plan => plan.month === month);
    setFilteredPlans(filtered);

    if (filtered.length > 0) {
      setSelectedPlan(filtered[0]);
      fetchDailyPlans(filtered[0].id);
      const monthName = extractMonthName(month);
      setCalendarMonth(monthName);  // "May" store karo
    } else {
      setSelectedPlan(null);
      setDailyPlans([]);
    }
  };

  const fetchDailyPlans = async (travelPlanId) => {
    try {
      const res = await DailyPlanAPI.getAll();
      const allDailyPlans = res.data?.data || [];
      const filtered = allDailyPlans.filter(plan => plan.travel_plan === travelPlanId);
      setDailyPlans(filtered);
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error fetching daily plans:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth && travelPlans.length > 0) {
      filterPlansByMonth(selectedMonth);
    }
  }, [selectedMonth, travelPlans]);
  // const onSubmit = async (data) => {
  //   try {
  //     // Check if employee_id is available
  //     if (!selectedEmployeeId) {
  //       setError("Please select an employee first");
  //       return;
  //     }

  //     // Add employee_id to the payload
  //     const payload = {
  //       ...data,
  //       employee_id: selectedEmployeeId
  //     };

  //     console.log("Submitting payload:", payload);

  //     let response;
  //     if (selectedPlan) {
  //       response = await TravelPlanAPI.update(selectedPlan.id, payload);
  //       setSuccess(response.data?.message || "Saved successfully");
  //     } else {
  //       response = await TravelPlanAPI.create(payload);
  //       setSuccess(response.data?.message || "Saved successfully");
  //     }

  //     setMode("list");
  //     await fetchTravelPlans();

  //   } catch (error) {
  //     console.error("Full error object:", error);
  //     console.error("Error response:", error.response);

  //     // 🔥 Display backend error message
  //     let errorMessage = "";

  //     if (error.response?.data) {
  //       const errorData = error.response.data;

  //       // Check different error formats
  //       if (typeof errorData === 'string') {
  //         errorMessage = errorData;
  //       } else if (errorData.message) {
  //         errorMessage = errorData.message;
  //       } else if (errorData.error) {
  //         errorMessage = errorData.error;
  //       } else if (errorData.detail) {
  //         errorMessage = errorData.detail;
  //       } else if (errorData.non_field_errors) {
  //         errorMessage = errorData.non_field_errors.join(", ");
  //       } else if (typeof errorData === 'object') {
  //         // Handle field-specific errors
  //         const fieldErrors = [];
  //         Object.keys(errorData).forEach(field => {
  //           if (Array.isArray(errorData[field])) {
  //             fieldErrors.push(`${field}: ${errorData[field].join(", ")}`);
  //           } else if (typeof errorData[field] === 'string') {
  //             fieldErrors.push(`${field}: ${errorData[field]}`);
  //           }
  //         });
  //         if (fieldErrors.length > 0) {
  //           errorMessage = fieldErrors.join("\n");
  //         } else {
  //           errorMessage = JSON.stringify(errorData);
  //         }
  //       }
  //     } else if (error.message) {
  //       errorMessage = error.message;
  //     } else {
  //       errorMessage = "Failed to save travel plan. Please try again.";
  //     }

  //     // Display error
  //     setError(errorMessage);
  //     console.error("Final error message:", errorMessage);
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      // Check if employee_id is available
      if (!selectedEmployeeId) {
        setError("Please select an employee first");
        return;
      }

      // 🔥 Convert "2026-01" to "January - 2026"
      let formattedMonth = data.month;

      if (data.month && data.month.includes("-")) {
        const [year, monthNum] = data.month.split('-');
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[parseInt(monthNum) - 1];
        formattedMonth = `${monthName}-${year}`;
      }

      // Add employee_id to the payload
      const payload = {
        month: formattedMonth,  // ✅ "January - 2026" (not "2026-01")
        region: data.region,
        states: data.states,
        rm: data.rm,
        tsm: data.tsm,
        employee_id: selectedEmployeeId
      };

      console.log("Submitting payload:", payload); // Check: { month: "January - 2026", ... }

      let response;
      if (selectedPlan) {
        response = await TravelPlanAPI.update(selectedPlan.id, payload);
        setSuccess(response.data?.message || "Saved successfully");
      } else {
        response = await TravelPlanAPI.create(payload);
        setSuccess(response.data?.message || "Saved successfully");
      }

      setMode("list");
      // 👇 NEW CODE ADD
      if (payload.month) {
        setSelectedMonth(payload.month);

        const monthName = extractMonthName(payload.month);
        const year = extractYear(payload.month);

        setCalendarMonth(monthName);
        setCalendarYear(Number(year));
      }
      await fetchTravelPlans();

    } catch (error) {
      // Your existing error handling (same rakhjo)
      console.error("Full error object:", error);
      console.error("Error response:", error.response);

      let errorMessage = "";

      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.non_field_errors) {
          errorMessage = errorData.non_field_errors.join(", ");
        } else if (typeof errorData === 'object') {
          const fieldErrors = [];
          Object.keys(errorData).forEach(field => {
            if (Array.isArray(errorData[field])) {
              fieldErrors.push(`${field}: ${errorData[field].join(", ")}`);
            } else if (typeof errorData[field] === 'string') {
              fieldErrors.push(`${field}: ${errorData[field]}`);
            }
          });
          if (fieldErrors.length > 0) {
            errorMessage = fieldErrors.join("\n");
          } else {
            errorMessage = JSON.stringify(errorData);
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Failed to save travel plan. Please try again.";
      }

      setError(errorMessage);
      console.error("Final error message:", errorMessage);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await TravelPlanAPI.delete(id);
      setSuccess(res.data?.message || "Deleted successfully");
      fetchTravelPlans();
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error deleting travel plan:", error);
    }
  };

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    let newMonthIndex = monthIndexMap[calendarMonth] - 1;
    let newYear = calendarYear;

    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      newYear--;
    }

    setCalendarMonth(monthNames[newMonthIndex]);
    setCalendarYear(newYear);
  };

  const goToNextMonth = () => {
    let newMonthIndex = monthIndexMap[calendarMonth] + 1;
    let newYear = calendarYear;

    if (newMonthIndex > 11) {
      newMonthIndex = 0;
      newYear++;
    }

    setCalendarMonth(monthNames[newMonthIndex]);
    setCalendarYear(newYear);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, monthIndexMap[month] + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, monthIndexMap[month], 1).getDay();
  };

  const getDailyPlanForDate = (date) => {
    const dateStr = `${calendarYear}-${String(monthIndexMap[calendarMonth] + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return dailyPlans.find(plan => plan.date === dateStr);
  };

  const handleAddDailyPlan = async () => {
    try {
      const dateStr = `${calendarYear}-${String(monthIndexMap[calendarMonth] + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;

      const payload = {
        travel_plan: selectedPlan?.id,
        date: dateStr,
        place: formData.place,
        notes: formData.notes
      };

      const response = await api.post("/daily-plan/", payload);

      if (response.data) {
        await fetchDailyPlans(selectedPlan?.id);
        setShowAddModal(false);
        setFormData({ place: "", notes: "" });
        setSelectedDate(null);
        setSuccess("Daily plan added successfully");
      }
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error adding daily plan:", error.response?.data || error);
    }
  };

  const handleUpdateDailyPlan = async () => {
    try {
      const response = await api.patch(`/daily-plan/${editDailyPlan.id}/`, {
        place: formData.place,
        notes: formData.notes
      });

      if (response.data) {
        await fetchDailyPlans(selectedPlan?.id);
        setEditDailyPlan(null);
        setFormData({ place: "", notes: "" });
        setSuccess("Daily plan updated successfully");
      }
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error updating daily plan:", error.response?.data || error);
    }
  };

  const handleDeleteDailyPlan = async () => {
    try {
      await api.delete(`/daily-plan/${editDailyPlan.id}/`);
      await fetchDailyPlans(selectedPlan?.id);
      setEditDailyPlan(null);
      setFormData({ place: "", notes: "" });
      setSuccess("Daily plan deleted successfully");
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error deleting daily plan:", error.response?.data || error);
    }
  };

  const handleDateClick = (date) => {
    if (!selectedPlan) {
      alert("Please select a travel plan first");
      return;
    }

    const existingPlan = getDailyPlanForDate(date);
    if (existingPlan) {
      setEditDailyPlan(existingPlan);
      setFormData({ place: existingPlan.place, notes: existingPlan.notes || "" });
    } else {
      setSelectedDate(date);
      setFormData({ place: "", notes: "" });
      setShowAddModal(true);
    }
  };

  const renderCalendar = () => {
    if (!calendarMonth) return null;

    const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
    const firstDay = getFirstDayOfMonth(calendarMonth, calendarYear);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-2 mb-3">
          {days.map(day => (
            <div key={day} className="text-center font-semibold text-sm py-2 text-[var(--textSecondary)]">
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dailyPlan = day ? getDailyPlanForDate(day) : null;
            return (
              <div
                key={index}
                onClick={() => day && handleDateClick(day)}
                className={`min-h-[100px] border rounded-lg p-2 cursor-pointer transition-all ${dailyPlan
                  ? 'hover:bg-opacity-80'
                  : 'bg-white border-[var(--border-black-200)] hover:bg-[var(--surfaceLight)]'
                  }`}
                style={dailyPlan ? { backgroundColor: `${themes.primary}20`, borderColor: themes.primary } : {}}
              >
                {day && (
                  <>
                    <div
                      className={`text-sm font-medium ${dailyPlan ? '' : 'text-gray-700'}`}
                      style={dailyPlan ? { color: themes.primary } : {}}
                    >{day}
                    </div>
                    {dailyPlan && (
                      <div className="mt-1">
                        <div className="text-xs font-semibold" style={{ color: themes.primary }}>
                          {dailyPlan.place}
                        </div>
                        {dailyPlan.notes && (
                          <div className="text-xs text-gray-600 truncate mt-0.5">{dailyPlan.notes}</div>
                        )}
                      </div>
                    )}
                    {!dailyPlan && selectedPlan && (
                      <div className="mt-1">
                        <div className="text-xs text-gray-400">+ Add</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const travelPlanColumns = [
    // { key: "month" },
    // { key: "start_date" },
    { key: "end_date" },
    { key: "region" },
    { key: "states" },
    { key: "rm" },
    { key: "tsm" },
  ];

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        {/* Add Daily Plan Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
            <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
              <div
                className="px-6 py-4"
                style={{ backgroundColor: themes.primary }}
              >                <h3 className="text-lg font-semibold text-white">Add Plan — {selectedDate}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PLACE / CITY</label>
                    <input
                      type="text"
                      value={formData.place}
                      onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                      placeholder="e.g. Surat"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': themes.primary }}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NOTES</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Meeting details, activities..."
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2" style={{ '--tw-ring-color': themes.primary }}

                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setFormData({ place: "", notes: "" });
                        setSelectedDate(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[var(--surfaceLight)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddDailyPlan}
                      className={`px-4 py-2 text-white rounded-lg hover:bg-[${themes.hover}] transition-colors`}
                      style={{ backgroundColor: themes.primary }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Daily Plan Modal */}
        {editDailyPlan && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2px] bg-black/20">
            <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
              <div
                className="px-6 py-4"
                style={{ backgroundColor: themes.primary }}
              >                <h3 className="text-lg font-semibold text-white">Edit — {editDailyPlan.date}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PLACE / CITY</label>
                    <input
                      type="text"
                      value={formData.place}
                      onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 " style={{ '--tw-ring-color': themes.primary }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NOTES</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 " style={{ '--tw-ring-color': themes.primary }}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={handleDeleteDailyPlan}
                      className={`px-4 py-2 text-white rounded-lg hover:bg-[${themes.danger}] transition-colors`}
                      style={{ backgroundColor: themes.danger }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditDailyPlan(null);
                        setFormData({ place: "", notes: "" });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[var(--surfaceLight)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateDailyPlan}
                      className={`px-4 py-2 text-white rounded-lg hover:bg-[${themes.hover}] transition-colors`}
                      style={{ backgroundColor: themes.primary }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 w-full">
          {!asSubcomponent && <SectionTitle title="Travel Plan Manager" />}
          {/* <ActionButtons
            showAdd
            addText="+ New Travel Plan"
            buttonClassName={`bg-[${themes.primary}] hover:bg-[${themes.hover}]`}
            onAdd={() => {
              setSelectedPlan(null);
              setMode("form");
            }}
          /> */}
          <ActionButtons
            showAdd
            addText="+ New Travel Plan"
            buttonClassName="text-white"
            style={{
              backgroundColor: themes.primary,
            }}
            onAdd={() => {
              setSelectedPlan(null);
              setMode("form");
            }}
          />
        </div>

        {/* Employee Selector - Only show for HR/Admin */}
        {isHR && employees.length > 0 && (
          <>
            <div className="mb-6 flex justify-between items-center gap-4 ">
              <div>
                <label className="text-sm font-medium text-gray-700 ">Select Employee:</label>
                <select
                  value={selectedEmployeeId || ""}
                  onChange={(e) => {
                    const newEmployeeId = Number(e.target.value);
                    setSelectedEmployeeId(newEmployeeId);
                    // Reset months and selected plan when employee changes
                    setSelectedMonth("");
                    setCalendarMonth("");
                    setFilteredPlans([]);
                    setSelectedPlan(null);
                    setDailyPlans([]);
                  }}
                  className="border border-[var(--bg-black)] rounded-lg px-4 py-2 ml-2 focus:outline-none "
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name || emp.first_name || emp.username || `Employee ${emp.id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
              </div>
            </div>

          </>
        )}

        {loading && <LoadingSpinner text="Loading travel plans..." />}



        {/* Month Navigation - Changes both table AND calendar */}
        {!loading && availableMonths.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {availableMonths.map((month) => {
              const displayMonth = extractMonthName(month);  // "May" for display
              return (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);  // Store full "May - 2026"
                    const monthName = extractMonthName(month);
                    const year = extractYear(month);
                    setCalendarMonth(monthName);  // Set "May" for calendar
                    setCalendarYear(year);
                  }}
                  // className={`px-5 py-2 rounded-lg transition-all font-medium ${selectedMonth === month
                  //   ? `bg-[${themes.primary}] text-white shadow-md`
                  //   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  //   }`}
                  className={`px-5 py-2 rounded-lg transition-all font-medium ${selectedMonth === month
                    ? "text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  style={
                    selectedMonth === month
                      ? { backgroundColor: themes.primary }
                      : {}
                  }
                >
                  {month}
                </button>
              );
            })}
          </div>
        )}

        {/* Show message if no travel plans */}
        {!loading && travelPlans.length === 0 && (
          <div className="text-center py-8 bg-[var(--surfaceLight)] rounded-lg mb-8">
            <p className="text-gray-500">No travel plans found for this employee</p>
          </div>
        )}

        {/* Travel Plans Table - Vertical/Report Format */}
        {!loading && filteredPlans.length > 0 && (
          <div className="mb-8 space-y-6">
            {filteredPlans.map((plan, index) => (
              <div key={plan.id} className="rounded-lg border border-[var(--border-black-200)] overflow-hidden" style={{ backgroundColor: themes.textWhite }}>
                <table className="w-full">
                  <tbody>
                    {[
                      { label: "REGION", value: plan.region },
                      { label: "STATE", value: plan.states },
                      // { label: "MONTH", value: plan.month },
                      // { label: "START DATE", value: plan.start_date || "-" },
                      // { label: "END DATE", value: plan.end_date || "-" },
                      { label: "RM", value: plan.rm },
                      { label: "TSM", value: plan.tsm }
                    ].map((field, idx) => (
                      <tr key={idx} className="border-b border-[var(--border-black-200)]">
                        <td className="px-3 py-2 font-small w-32" style={{ color: themes.textWhite, backgroundColor: themes.primary }}>
                          {field.label}
                        </td>
                        <td className="px-3 py-2" style={{ color: themes.textPrimary, backgroundColor: themes.surfaceLight }} colSpan="2">
                          {field.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Buttons below the table */}
                <div className="px-6 py-4 flex gap-3 justify-start border-t border-[var(--border-black-200)]" style={{ backgroundColor: themes.surfaceLight }}>
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setMode("form");
                    }}
                    className="px-4 py-2 rounded text-sm font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: themes.primary, color: themes.textWhite }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-4 py-2 rounded text-sm font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: themes.danger, color: themes.textWhite }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View with Navigation Arrows */}
        {!loading && calendarMonth && filteredPlans.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-[var(--border-black-200)] overflow-hidden">
            <div className="bg-[var(--surfaceLight)] px-6 py-4 border-b border-[var(--border-black-200)] flex justify-center items-center gap-4">
              <button
                onClick={goToPreviousMonth}
                className="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-[var(--text-secondary)]"
              >
                ←
              </button>
              <h3 className="text-xl font-semibold text-gray-800">
                {calendarMonth} - {calendarYear}
              </h3>
              <button
                onClick={goToNextMonth}
                className="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-[var(--textSecondary)]"
              >
                →
              </button>
            </div>
            <div className="p-6">
              {renderCalendar()}
            </div>
          </div>
        )}
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedPlan) {
    return (
      <EntityPageLayout
        title="Travel Plan Details"
        showBack
        onBack={() => {
          setSelectedPlan(null);
          setDailyPlans([]);
          setMode("list");
        }}
      >
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-[var(--border-black-200)]">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide">MONTH</label>
                <p className="font-medium text-gray-900 mt-1">{selectedPlan.month}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide">DATE</label>
                <p className="font-medium text-gray-900 mt-1">
                  {selectedPlan.start_date} to {selectedPlan.end_date}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide">REGION</label>
                <p className="font-medium text-gray-900 mt-1">{selectedPlan.region}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide">STATE</label>
                <p className="font-medium text-gray-900 mt-1">{selectedPlan.states}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide">RM</label>
                <p className="font-medium text-gray-900 mt-1">{selectedPlan.rm}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide">TSM</label>
                <p className="font-medium text-gray-900 mt-1">{selectedPlan.tsm}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setMode("form")}
                className="px-4 py-2 text-white rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: themes.primary }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedPlan.id);
                  setMode("list");
                }}
                className="px-4 py-2 text-white rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: themes.danger }}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Daily Itinerary</h3>
            {dailyPlans.length > 0 ? (
              <div className="space-y-3">
                {dailyPlans.map((daily) => (
                  <div key={daily.id} className="border border-[var(--border-black-200)] rounded-lg p-4 hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{daily.date}</p>
                        <p className="text-gray-700 mt-2">{daily.place}</p>
                        {daily.notes && (
                          <p className="text-gray-500 text-sm mt-2">{daily.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 bg-[var(--surfaceLight)] rounded-lg">
                No daily plans created yet
              </p>
            )}
          </div>
        </div>
      </EntityPageLayout>
    );
  }

  // ================= FORM PAGE =================
  return (
    <EntityPageLayout
      title="Travel Plan Details"
      showBack
      onBack={() => setMode("list")}
    >
      <EntityForm

        title={selectedPlan ? "Edit Travel Plan" : "Create Travel Plan"}
        selectedItem={
          selectedPlan
            ? {
              ...selectedPlan,
              month: convertToInputMonthFormat(selectedPlan.month),
            }
            : null
        }
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Month",
            name: "month",
            type: "month",
            required: true,
          },
          // { label: "Start Date", name: "start_date", type: "date", required: true },
          // { label: "End Date", name: "end_date", type: "date", required: true },
          {
            label: "Region",
            name: "region",
            type: "select",
            required: true,
            options: regions.map(r => ({ label: r.name, value: r.name })),
          },
          { label: "State", name: "states", required: true },
          { label: "RM", name: "rm", required: true },
          { label: "TSM", name: "tsm", required: true },
        ]}
      />
    </EntityPageLayout>
  );
}