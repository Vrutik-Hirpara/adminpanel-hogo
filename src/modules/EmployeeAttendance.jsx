
// "use client";

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityViewCard from "../components/view/EntityViewCard";
// import EntityForm from "../components/form/EntityForm";
// import EntityTableRow from "../components/table/EntityTableRow";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { EmployeeAttendanceAPI, EmployeeAPI } from "../services";

// // Helper function to get date range for last 1 week
// // Helper function to get date range for last 1 week
// const getLastWeekRange = () => {
//   const endDate = new Date();
//   const startDate = new Date();
//   startDate.setDate(endDate.getDate() - 6);

//   // Use local date formatting
//   const formatLocalDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   return {
//     start: formatLocalDate(startDate),
//     end: formatLocalDate(endDate)
//   };
// };

// // Helper function to get current month
// const getCurrentMonth = () => {
//   return new Date().getMonth() + 1;
// };

// export default function EmployeeAttendance() {

//   const [attendance, setAttendance] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Filter states
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDateObj, setSelectedDateObj] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [roleName, setRoleName] = useState("hr");
//   const [loggedInEmployeeId, setLoggedInEmployeeId] = useState(21);

//   // Loading state
//   const [loading, setLoading] = useState(false);

//   // ================= GET ROLE FROM BACKEND =================
// // ================= GET ROLE FROM BACKEND =================
// useEffect(() => {
//   const fetchUserRole = async () => {
//     try {
//       // Get user data from localStorage
//       const extra = JSON.parse(localStorage.getItem("user"));
//       const role = extra?.role_name?.toLowerCase();
//       const userId = extra?.id; // This is the logged-in employee's ID

//       console.log("Logged-in User:", extra);
//       console.log("User ID:", userId);
//       console.log("Role:", role);

//       if (role === "hr") {
//         setRoleName("hr");
//         setLoggedInEmployeeId(userId); // Still set it, but HR can see all
//       } else {
//         setRoleName("employee");
//         setLoggedInEmployeeId(userId); // This ID will filter their own data
//       }

//     } catch (error) {
//       console.error("Error fetching user role:", error);
//       setRoleName("hr");
//       setLoggedInEmployeeId(21);
//     }
//   };
//   fetchUserRole();
// }, []);

//   // ================= FETCH DATA WITH FILTERS =================
// const fetchAttendance = async (date = null, month = null) => {
//   setLoading(true);
//   try {
//     let response;

//     if (roleName === "hr") {
//       if (date) {
//         response = await EmployeeAttendanceAPI.getByDate(date);
//       } else if (month) {
//         response = await EmployeeAttendanceAPI.getByMonth(month);
//       } else {
//         const weekRange = getLastWeekRange();
//         response = await EmployeeAttendanceAPI.getByDateRange(weekRange.start, weekRange.end);
//       }
//     } else {
//       const currentMonth = getCurrentMonth();
//       console.log("Fetching for employee ID:", loggedInEmployeeId, "Month:", currentMonth);
//       response = await EmployeeAttendanceAPI.getByEmployeeAndMonth(loggedInEmployeeId, currentMonth);
//     }

//     console.log("API Response:", response);

//     // Extract data correctly
//     let attendanceData = [];

//     // For employee filter: response.data.data is an array
//     if (response?.data?.data && Array.isArray(response.data.data)) {
//       attendanceData = response.data.data;
//     } 
//     // For single record: response.data.data is an object
//     else if (response?.data?.data && !Array.isArray(response.data.data)) {
//       attendanceData = [response.data.data];
//     }
//     // If response.data is the array directly
//     else if (response?.data && Array.isArray(response.data)) {
//       attendanceData = response.data;
//     }

//     console.log("Extracted attendance data:", attendanceData);
//     setAttendance(attendanceData);

//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     setAttendance([]);
//   } finally {
//     setLoading(false);
//   }
// };
//   const fetchEmployees = async () => {
//     try {
//       const res = await EmployeeAPI.getAll();
//       let employeesData = [];
//       if (res?.data?.data) {
//         employeesData = Array.isArray(res.data.data) ? res.data.data : [];
//       } else if (res?.data) {
//         employeesData = Array.isArray(res.data) ? res.data : [];
//       } else if (Array.isArray(res)) {
//         employeesData = res;
//       }
//       setEmployees(employeesData);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       setEmployees([]);
//     }
//   };

//   useEffect(() => {
//     if (roleName) {
//       fetchAttendance();
//     }
//     fetchEmployees();
//   }, [roleName]);

//   // ================= HANDLE DATE FILTER CHANGE =================
// // ================= HANDLE DATE FILTER CHANGE =================
// const handleDateChange = (date) => {
//   console.log("Date selected:", date);

//   if (date) {
//     // Fix: Use local date formatting instead of toISOString()
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const formattedDate = `${year}-${month}-${day}`;

//     console.log("Formatted date:", formattedDate);

//     // Update states
//     setSelectedDateObj(date);
//     setSelectedDate(formattedDate);
//     setSelectedMonth(""); // Clear month filter

//     // Clear attendance and fetch new data
//     setAttendance([]);
//     fetchAttendance(formattedDate, null);
//   } else {
//     // Clear all filters
//     setSelectedDateObj(null);
//     setSelectedDate("");
//     setSelectedMonth("");
//     setAttendance([]);
//     fetchAttendance();
//   }
// };

//   // ================= HANDLE MONTH FILTER CHANGE =================
// // ================= HANDLE MONTH FILTER CHANGE =================
// const handleMonthChange = (e) => {
//   const monthValue = e.target.value; // Format: "2026-03"
//   console.log("Raw month value:", monthValue);

//   if (monthValue) {
//     // Extract just the month number (e.g., "03" -> 3)
//     const monthNumber = parseInt(monthValue.split('-')[1], 10);
//     console.log("Extracted month number:", monthNumber);

//     // Update states
//     setSelectedMonth(monthValue); // Store the full value for display
//     setSelectedDate("");
//     setSelectedDateObj(null);

//     // Clear attendance and fetch new data
//     setAttendance([]);
//     fetchAttendance(null, monthNumber); // Send just the month number
//   } else {
//     // Clear all filters
//     setSelectedMonth("");
//     setSelectedDate("");
//     setSelectedDateObj(null);
//     setAttendance([]);
//     fetchAttendance();
//   }
// };

//   // ================= RESET FILTERS =================
// // ================= RESET FILTERS =================
// const resetFilters = () => {
//   console.log("Resetting filters");

//   // Clear all filter states
//   setSelectedDate("");
//   setSelectedDateObj(null);
//   setSelectedMonth(""); // This will clear the month picker

//   // Clear attendance and fetch default data
//   setAttendance([]);
//   fetchAttendance();
// };

//   // ================= FORMAT TIME =================
//   const formatTime = (value) => {
//     if (!value) return "-";

//     let timePart = value;

//     if (value.includes("T")) {
//       timePart = value.split("T")[1];
//     }

//     timePart = timePart.slice(0,5);

//     let [hours, minutes] = timePart.split(":").map(Number);

//     const ampm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12;
//     if (hours === 0) hours = 12;

//     return `${hours}:${minutes.toString().padStart(2,"0")} ${ampm}`;
//   };

//   // ================= SUBMIT FORM =================
//   const onSubmit = async (data) => {
//     const payload = { ...data };

//     if (payload.start_time && !payload.start_time.includes("T")) {
//       payload.start_time = `${payload.date}T${payload.start_time}`;
//       payload.status = true;
//     }

//     if (payload.end_time && !payload.end_time.includes("T")) {
//       payload.end_time = `${payload.date}T${payload.end_time}`;
//     }

//     selectedItem
//       ? await EmployeeAttendanceAPI.update(selectedItem.id, payload)
//       : await EmployeeAttendanceAPI.create(payload);

//     setMode("list");
//     fetchAttendance();
//   };

//   // ================= TABLE COLUMNS =================
// const attendanceColumns = [
//   // Always show employee column for both HR and employees
//   {
//     key: "employee",
//     render: (row) => {
//       if (roleName !== "hr") {
//         // For employees, show their own name (but since they only see their data, it's always them)
//         return row.employee_name || "-";
//       }
//       const emp = employees.find((e) => e.id === row.employee);
//       return emp ? `${emp.first_name} ${emp.last_name}` : row.employee_name || "-";
//     }
//   },
//   { 
//     key: "date",
//     render: (row) => row.date || "-"
//   },
//   {
//     key: "start_time",
//     render: (row) => formatTime(row.start_time)
//   },
//   {
//     key: "end_time",
//     render: (row) => formatTime(row.end_time)
//   },
//   {
//     key: "total_hours",
//     render: (row) => row.total_hours || "-"
//   },
//   {
//     key: "status",
//     render: (row) => (
//       <span
//         className={`px-2 py-1 rounded text-xs font-semibold ${
//           row.status
//             ? "bg-green-100 text-green-700"
//             : "bg-red-100 text-red-700"
//         }`}
//       >
//         {row.status ? "Present" : "Absent"}
//       </span>
//     )
//   }
// ];

//   // ================= VIEW FIELDS =================
//   const attendanceFields = [
//     { key: "employee", label: "Employee" },
//     { key: "date", label: "Date" },
//     { key: "start_time", label: "Start Time" },
//     { key: "end_time", label: "End Time" },
//     { key: "status", label: "Status" },
//     { key: "full_leave", label: "Full Leave" },
//     { key: "half_leave", label: "Half Leave" },
//     { key: "total_hours", label: "Total Hours" },
//   ];

//   // ================= FILTER COMPONENT =================
// // ================= FILTER COMPONENT =================
// const FilterBar = () => {
//   if (roleName !== "hr") return null;

//   return (
//     <div className="flex gap-4 items-end mb-6 flex-wrap">
//       <div>
//         <label className="block text-sm font-medium mb-1">Filter by Date</label>
//         <DatePicker
//           selected={selectedDateObj}
//           onChange={handleDateChange}
//           dateFormat="yyyy-MM-dd"
//           className="border rounded px-3 py-2 w-48"
//           placeholderText="Select date"
//           isClearable
//           showYearDropdown
//           scrollableYearDropdown
//           yearDropdownItemNumber={15}
//           showMonthDropdown
//           dropdownMode="select"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Filter by Month</label>
//         <input
//           type="month"
//           value={selectedMonth} // This should be in "YYYY-MM" format
//           onChange={handleMonthChange}
//           className="border rounded px-3 py-2 w-48"
//         />
//       </div>

//       {(selectedDate || selectedMonth) && (
//         <button
//           onClick={resetFilters}
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition h-[42px]"
//         >
//           Reset Filters
//         </button>
//       )}
//     </div>
//   );
// };

//   // ================= LIST PAGE =================
// if (mode === "list") {
//   return (
//     <PageContainer>
//       <div className="flex justify-between items-center mb-4">
//         <SectionTitle 
//           title={
//             roleName === "hr" 
//               ? "Employee Attendance" 
//               : "My Attendance"
//           } 
//         />

//         {roleName === "hr" && (
//           <ActionButtons
//             showAdd
//             addText="+ Add"
//             onAdd={() => {
//               setSelectedItem(null);
//               setMode("form");
//             }}
//           />
//         )}
//       </div>

//       <FilterBar />

//       {loading ? (
//         <div className="text-center py-8">Loading...</div>
//       ) : attendance && attendance.length > 0 ? (
//         <Table
//           key={`${selectedDate}-${selectedMonth}`}
//           header={
//             <TableHeader
//               columns={
//                 roleName === "hr"
//                   ? ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "Action"]
//                   : ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "View"]
//               }
//             />
//           }
//         >
//           {attendance.map((row, index) => (
//             <EntityTableRow
//               key={row.id || index}
//               row={row}
//               index={index}
//               columns={attendanceColumns}
//               onView={(item) => {
//                 setSelectedItem(item);
//                 setMode("view");
//               }}
//               onEdit={roleName === "hr" ? (item) => {
//                 setSelectedItem(item);
//                 setMode("form");
//               } : undefined}
//               onDelete={roleName === "hr" ? (id) => {
//                 EmployeeAttendanceAPI.delete(id).then(() => fetchAttendance());
//               } : undefined}
//               hideActions={roleName !== "hr"}
//               showActions={roleName === "hr"}
//             />
//           ))}
//         </Table>
//       ) : (
//         <div className="text-center py-8 text-gray-500">
//           No attendance records found for {
//             selectedDate 
//               ? selectedDate 
//               : selectedMonth 
//                 ? `month ${selectedMonth.split('-')[1]}`
//                 : "this period"
//           }
//         </div>
//       )}
//     </PageContainer>
//   );
// }

//   // ================= VIEW PAGE =================
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout
//         title="Attendance Details"
//         showBack
//         onBack={() => setMode("list")}
//       >
//         <EntityViewCard
//           title="Attendance"
//           data={selectedItem}
//           fields={attendanceFields}
//           api={EmployeeAttendanceAPI}
//           onUpdated={fetchAttendance}
//           onDeleted={fetchAttendance}
//           headerKeys={["employee"]}
//         />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM PAGE =================
//   const formattedSelected =
//     selectedItem && {
//       ...selectedItem,
//       start_time: selectedItem.start_time
//         ? selectedItem.start_time.split("T")[1]?.substring(0,5)
//         : "",
//       end_time: selectedItem.end_time
//         ? selectedItem.end_time.split("T")[1]?.substring(0,5)
//         : ""
//     };

//   return (
//     <EntityPageLayout
//       title="Attendance Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityForm
//         title={selectedItem ? "Edit Attendance" : "Create Attendance"}
//         selectedItem={formattedSelected}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Employee",
//             name: "employee",
//             type: "select",
//             options: employees.map((emp) => ({
//               label: `${emp.first_name} ${emp.last_name}`,
//               value: emp.id
//             })),
//             required: true
//           },
//           {
//             label: "Date",
//             name: "date",
//             type: "date",
//             required: true
//           },
//           {
//             label: "Start Time",
//             name: "start_time",
//             type: "time"
//           },
//           {
//             label: "End Time",
//             name: "end_time",
//             type: "time"
//           },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//               { label: "Present", value: true },
//               { label: "Absent", value: false }
//             ]
//           },
//           {
//             label: "Full Leave",
//             name: "full_leave",
//             type: "select",
//             options: [
//               { label: "Yes", value: true },
//               { label: "No", value: false }
//             ]
//           },
//           {
//             label: "Half Leave",
//             name: "half_leave",
//             type: "select",
//             options: [
//               { label: "Yes", value: true },
//               { label: "No", value: false }
//             ]
//           }
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityViewCard from "../components/view/EntityViewCard";
// import EntityForm from "../components/form/EntityForm";
// import EntityTableRow from "../components/table/EntityTableRow";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { EmployeeAttendanceAPI, EmployeeAPI } from "../services";
// import { useOutletContext } from "react-router-dom";
// import { parseBackendErrors } from "../utils/parseBackendErrors";

// // Helper function to get date range for last 1 week
// const getLastWeekRange = () => {
//   const endDate = new Date();
//   const startDate = new Date();
//   startDate.setDate(endDate.getDate() - 6);

//   const formatLocalDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   return {
//     start: formatLocalDate(startDate),
//     end: formatLocalDate(endDate)
//   };
// };

// // Helper function to get current month
// const getCurrentMonth = () => {
//   return new Date().getMonth() + 1;
// };

// export default function EmployeeAttendance() {

//   const { setError, setSuccess } = useOutletContext();
//   const [attendance, setAttendance] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Filter states
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDateObj, setSelectedDateObj] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [roleName, setRoleName] = useState(null); // Start with null
//   const [loggedInEmployeeId, setLoggedInEmployeeId] = useState(null);
//   const [isRoleLoading, setIsRoleLoading] = useState(true); // Add role loading state

//   // Loading state
//   const [loading, setLoading] = useState(false);

//   // ================= GET ROLE FROM BACKEND =================
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         setIsRoleLoading(true);
//         // Get user data from localStorage
//         const extra = JSON.parse(localStorage.getItem("user"));
//         const role = extra?.role_name?.toLowerCase();
//         const userId = extra?.id;

//         console.log("Logged-in User:", extra);
//         console.log("User ID:", userId);
//         console.log("Role:", role);

//         if (role === "hr") {
//           setRoleName("hr");
//           setLoggedInEmployeeId(userId);
//         } else {
//           setRoleName("employee");
//           setLoggedInEmployeeId(userId);
//         }

//       } catch (error) {
//         console.error("Error fetching user role:", error);
//         setRoleName("hr");
//         setLoggedInEmployeeId(21);
//       } finally {
//         setIsRoleLoading(false);
//       }
//     };
//     fetchUserRole();
//   }, []);

//   // ================= FETCH DATA WITH FILTERS =================
//   const fetchAttendance = async (date = null, month = null) => {
//     // Don't fetch if role is still loading
//     if (isRoleLoading || !roleName) return;

//     setLoading(true);
//     try {
//       let response;

//       if (roleName === "hr") {
//         if (date) {
//           response = await EmployeeAttendanceAPI.getByDate(date);
//         } else if (month) {
//           response = await EmployeeAttendanceAPI.getByMonth(month);
//         } else {
//           const weekRange = getLastWeekRange();
//           response = await EmployeeAttendanceAPI.getByDateRange(weekRange.start, weekRange.end);
//         }
//       } else {
//         const currentMonth = getCurrentMonth();
//         console.log("Fetching for employee ID:", loggedInEmployeeId, "Month:", currentMonth);
//         response = await EmployeeAttendanceAPI.getByEmployeeAndMonth(loggedInEmployeeId, currentMonth);
//       }

//       console.log("API Response:", response);

//       // Extract data correctly
//       let attendanceData = [];

//       if (response?.data?.data && Array.isArray(response.data.data)) {
//         attendanceData = response.data.data;
//       } else if (response?.data?.data && !Array.isArray(response.data.data)) {
//         attendanceData = [response.data.data];
//       } else if (response?.data && Array.isArray(response.data)) {
//         attendanceData = response.data;
//       }

//       console.log("Extracted attendance data:", attendanceData);
//       setAttendance(attendanceData);

//     } catch (error) {
//       setError(parseBackendErrors(error));
//       console.error("Error fetching attendance:", error);
//       setAttendance([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const res = await EmployeeAPI.getAll();
//       let employeesData = [];
//       if (res?.data?.data) {
//         employeesData = Array.isArray(res.data.data) ? res.data.data : [];
//       } else if (res?.data) {
//         employeesData = Array.isArray(res.data) ? res.data : [];
//       } else if (Array.isArray(res)) {
//         employeesData = res;
//       }
//       setEmployees(employeesData);
//     } catch (error) {
//       setError(parseBackendErrors(error));
//       console.error("Error fetching employees:", error);
//       setEmployees([]);
//     }
//   };

//   // Only fetch when role is determined
//   useEffect(() => {
//     if (!isRoleLoading && roleName) {
//       fetchAttendance();
//       fetchEmployees();
//     }
//   }, [roleName, isRoleLoading]);

//   // ================= HANDLE DATE FILTER CHANGE =================
//   const handleDateChange = (date) => {
//     console.log("Date selected:", date);

//     if (date) {
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const formattedDate = `${year}-${month}-${day}`;

//       console.log("Formatted date:", formattedDate);

//       setSelectedDateObj(date);
//       setSelectedDate(formattedDate);
//       setSelectedMonth("");
//       setAttendance([]);
//       fetchAttendance(formattedDate, null);
//     } else {
//       setSelectedDateObj(null);
//       setSelectedDate("");
//       setSelectedMonth("");
//       setAttendance([]);
//       fetchAttendance();
//     }
//   };

//   // ================= HANDLE MONTH FILTER CHANGE =================
//   const handleMonthChange = (e) => {
//     const monthValue = e.target.value;
//     console.log("Raw month value:", monthValue);

//     if (monthValue) {
//       const monthNumber = parseInt(monthValue.split('-')[1], 10);
//       console.log("Extracted month number:", monthNumber);

//       setSelectedMonth(monthValue);
//       setSelectedDate("");
//       setSelectedDateObj(null);
//       setAttendance([]);
//       fetchAttendance(null, monthNumber);
//     } else {
//       setSelectedMonth("");
//       setSelectedDate("");
//       setSelectedDateObj(null);
//       setAttendance([]);
//       fetchAttendance();
//     }
//   };

//   // ================= RESET FILTERS =================
//   const resetFilters = () => {
//     console.log("Resetting filters");

//     setSelectedDate("");
//     setSelectedDateObj(null);
//     setSelectedMonth("");
//     setAttendance([]);
//     fetchAttendance();
//   };

//   // ================= FORMAT TIME =================
//   const formatTime = (value) => {
//     if (!value) return "-";

//     let timePart = value;

//     if (value.includes("T")) {
//       timePart = value.split("T")[1];
//     }

//     timePart = timePart.slice(0,5);

//     let [hours, minutes] = timePart.split(":").map(Number);

//     const ampm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12;
//     if (hours === 0) hours = 12;

//     return `${hours}:${minutes.toString().padStart(2,"0")} ${ampm}`;
//   };

//   // ================= SUBMIT FORM =================
// // ================= SUBMIT FORM =================
// const onSubmit = async (data) => {
//   const payload = { ...data };

//   console.log("Original data:", data);

//   // Format time correctly
//   if (payload.start_time && typeof payload.start_time === 'string' && !payload.start_time.includes('T')) {
//     payload.start_time = `${payload.date}T${payload.start_time}:00`;
//   }

//   if (payload.end_time && typeof payload.end_time === 'string' && !payload.end_time.includes('T')) {
//     payload.end_time = `${payload.date}T${payload.end_time}:00`;
//   }

//   // Remove fields that shouldn't be sent
//   delete payload.id;
//   delete payload.employee_name;
//   delete payload.total_hours;

//   // ✅ Don't send status, full_leave, half_leave - backend calculates them
//   delete payload.status;
//   delete payload.full_leave;
//   delete payload.half_leave;

//   console.log("Formatted payload:", payload);

//   try {
//     if (selectedItem) {
//       const res = await EmployeeAttendanceAPI.update(selectedItem.id, payload);
//       setSuccess(res.data?.message || "Saved successfully");
//     } else {
//       const res = await EmployeeAttendanceAPI.create(payload);
//       setSuccess(res.data?.message || "Saved successfully");
//     }

//     setMode("list");
//     fetchAttendance();
//   } catch (error) {
//     setError(parseBackendErrors(error));
//     console.error("Error saving attendance:", error);
//   }
// };

//   // ================= TABLE COLUMNS =================
//   const attendanceColumns = [
//     // {
//     //   key: "employee",
//     //   render: (row) => {
//     //     if (roleName !== "hr") {
//     //       return row.employee_name || "-";
//     //     }
//     //     const emp = employees.find((e) => e.id === row.employee);
//     //     return emp ? `${emp.first_name} ${emp.last_name}` : row.employee_name || "-";
//     //   }
//     // },
//     {
//   key: "employee",
//   render: (row) => {
//     const emp = employees.find((e) => e.id === row.employee);

//     if (emp) {
//       return `${emp.first_name} ${emp.last_name}`;
//     }

//     return row.employee_name || "-";
//   }
// },
//     { 
//       key: "date",
//       render: (row) => row.date || "-"
//     },
//     {
//       key: "start_time",
//       render: (row) => formatTime(row.start_time)
//     },
//     {
//       key: "end_time",
//       render: (row) => formatTime(row.end_time)
//     },
//     {
//       key: "total_hours",
//       render: (row) => row.total_hours || "-"
//     },
//     {
//       key: "status",
//       render: (row) => (
//         <span
//           className={`px-2 py-1 rounded text-xs font-semibold ${
//             row.status
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {row.status ? "Present" : "Absent"}
//         </span>
//       )
//     }
//   ];

//   // ================= VIEW FIELDS =================
//   // const attendanceFields = [
//   //   { key: "employee", label: "Employee" },
//   //   { key: "date", label: "Date" },
//   //   { key: "start_time", label: "Start Time" },
//   //   { key: "end_time", label: "End Time" },
//   //   { key: "status", label: "Status" },
//   //   { key: "full_leave", label: "Full Leave" },
//   //   { key: "half_leave", label: "Half Leave" },
//   //   { key: "total_hours", label: "Total Hours" },
//   // ];

// // ================= VIEW FIELDS =================
// const attendanceFields = [
//   { 
//     key: "employee", 
//     label: "Employee",
//     format: (value, row) => {
//       if (roleName !== "hr") {
//         return row?.employee_name || "-";
//       }
//       const emp = employees.find((e) => e.id === value);
//       return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//     }
//   },
//   { key: "date", label: "Date" },
//   { 
//     key: "start_time", 
//     label: "Start Time",
//     format: (value) => value ? formatTime(value) : "-"
//   },
//   { 
//     key: "end_time", 
//     label: "End Time",
//     format: (value) => value ? formatTime(value) : "-"
//   },
//   { 
//     key: "status", 
//     label: "Status",
//     format: (value) => {
//       // Convert to boolean first
//       const isActive = value === true || value === "true" || value === 1 || value === "1";
//       return isActive ? "Active" : "Inactive";
//     }
//   },
//   { 
//     key: "full_leave", 
//     label: "Full Leave",
//     format: (value) => {
//       const isYes = value === true || value === "true" || value === 1 || value === "1";
//       return isYes ? "Yes" : "No";
//     }
//   },
//   { 
//     key: "half_leave", 
//     label: "Half Leave",
//     format: (value) => {
//       const isYes = value === true || value === "true" || value === 1 || value === "1";
//       return isYes ? "Yes" : "No";
//     }
//   },
//   { 
//     key: "total_hours", 
//     label: "Total Hours",
//     format: (value) => {
//       if (!value && value !== 0) return "0.00";
//       if (typeof value === 'number') return value.toFixed(2);
//       if (typeof value === 'string') return parseFloat(value).toFixed(2);
//       return "0.00";
//     }
//   },
// ];
//   // ================= FILTER COMPONENT =================
//   const FilterBar = () => {
//     if (roleName !== "hr") return null;

//     return (
//       <div className="flex gap-4 items-end mb-6 flex-wrap">
//         <div>
//           <label className="block text-sm font-medium mb-1">Filter by Date</label>
//           <DatePicker
//             selected={selectedDateObj}
//             onChange={handleDateChange}
//             dateFormat="yyyy-MM-dd"
//             className="border rounded px-3 py-2 w-48"
//             placeholderText="Select date"
//             isClearable
//             showYearDropdown
//             scrollableYearDropdown
//             yearDropdownItemNumber={15}
//             showMonthDropdown
//             dropdownMode="select"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Filter by Month</label>
//           <input
//             type="month"
//             value={selectedMonth}
//             onChange={handleMonthChange}
//             className="border rounded px-3 py-2 w-48"
//           />
//         </div>

//         {(selectedDate || selectedMonth) && (
//           <button
//             onClick={resetFilters}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition h-[42px]"
//           >
//             Reset Filters
//           </button>
//         )}
//       </div>
//     );
//   };

//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     // Show loading while role is being determined
//     if (isRoleLoading) {
//       return (
//         <PageContainer>
//           <div className="text-center py-8">Loading user information...</div>
//         </PageContainer>
//       );
//     }

//     return (
//       <PageContainer>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle 
//             title={
//               roleName === "hr" 
//                 ? "Employee Attendance" 
//                 : "My Attendance"
//             } 
//           />

//           {roleName === "hr" && (
//             <ActionButtons
//               showAdd
//               addText="+ Add"
//               onAdd={() => {
//                 setSelectedItem(null);
//                 setMode("form");
//               }}
//             />
//           )}
//         </div>

//         <FilterBar />

//         {loading ? (
//           <div className="text-center py-8">Loading...</div>
//         ) : attendance && attendance.length > 0 ? (
//           <Table
//             key={`${selectedDate}-${selectedMonth}`}
//             header={
//               <TableHeader
//                 columns={
//                   roleName === "hr"
//                     ? ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "Action"]
//                     : ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "View"]
//                 }
//               />
//             }
//           >
//             {attendance.map((row, index) => (
//               <EntityTableRow
//                 key={row.id || index}
//                 row={row}
//                 index={index}
//                 columns={attendanceColumns}
//                 onView={(item) => {
//                   setSelectedItem(item);
//                   setMode("view");
//                 }}
//                 onEdit={roleName === "hr" ? (item) => {
//                   setSelectedItem(item);
//                   setMode("form");
//                 } : undefined}
//                 onDelete={roleName === "hr" ? async (id) => {
//                   try {
//                     const res = await EmployeeAttendanceAPI.delete(id);
//                     setSuccess(res.data?.message || "Deleted successfully");
//                     fetchAttendance();
//                   } catch (err) {
//                     setError(parseBackendErrors(err));
//                   }
//                 } : undefined}
//                 hideActions={roleName !== "hr"}
//                 showActions={roleName === "hr"}
//               />
//             ))}
//           </Table>
//         ) : (
//           <div className="text-center py-8 text-gray-500">
//             No attendance records found for {
//               selectedDate 
//                 ? selectedDate 
//                 : selectedMonth 
//                   ? `month ${selectedMonth.split('-')[1]}`
//                   : "this period"
//             }
//           </div>
//         )}
//       </PageContainer>
//     );
//   }

//   // ================= VIEW PAGE =================
//   // if (mode === "view" && selectedItem) {
//   //   return (
//   //     <EntityPageLayout
//   //       title="Attendance Details"
//   //       showBack
//   //       onBack={() => setMode("list")}
//   //     >
//   //       <EntityViewCard
//   //         title="Attendance"
//   //         data={selectedItem}
//   //         fields={attendanceFields}
//   //         api={EmployeeAttendanceAPI}
//   //         onUpdated={fetchAttendance}
//   //         onDeleted={fetchAttendance}
//   //         headerKeys={["employee"]}
//   //       />
//   //     </EntityPageLayout>
//   //   );
//   // }
// // ================= VIEW PAGE =================
// if (mode === "view" && selectedItem) {
//   // Format all data before passing to EntityViewCard
//   const formattedData = {
//     ...selectedItem,
//     employee: (() => {
//       if (roleName !== "hr") return selectedItem.employee_name || "-";
//       const emp = employees.find((e) => e.id === selectedItem.employee);
//       return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//     })(),
//     start_time: selectedItem.start_time ? formatTime(selectedItem.start_time) : "-",
//     end_time: selectedItem.end_time ? formatTime(selectedItem.end_time) : "-",
//     status: selectedItem.status ? "Active" : "Inactive",
//     full_leave: selectedItem.full_leave ? "Yes" : "No",
//     half_leave: selectedItem.half_leave ? "Yes" : "No",
//     total_hours: selectedItem.total_hours ? 
//       (typeof selectedItem.total_hours === 'number' ? 
//         selectedItem.total_hours.toFixed(2) : 
//         parseFloat(selectedItem.total_hours).toFixed(2)) 
//       : "0.00"
//   };

//   return (
//     <EntityPageLayout
//       title="Attendance Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityViewCard
//         title="Attendance"
//         data={formattedData}
//         fields={[
//           { key: "employee", label: "Employee" },
//           { key: "date", label: "Date" },
//           { key: "start_time", label: "Start Time" },
//           { key: "end_time", label: "End Time" },
//           { key: "status", label: "Status" },
//           { key: "full_leave", label: "Full Leave" },
//           { key: "half_leave", label: "Half Leave" },
//           { key: "total_hours", label: "Total Hours" },
//         ]}
//         api={EmployeeAttendanceAPI}
//         onUpdated={fetchAttendance}
//         onDeleted={fetchAttendance}
//         headerKeys={["employee"]}
//       />
//     </EntityPageLayout>
//   );
// }
//   // ================= FORM PAGE =================
//   const formattedSelected =
//     selectedItem && {
//       ...selectedItem,
//       start_time: selectedItem.start_time
//         ? selectedItem.start_time.split("T")[1]?.substring(0,5)
//         : "",
//       end_time: selectedItem.end_time
//         ? selectedItem.end_time.split("T")[1]?.substring(0,5)
//         : ""
//     };

//   return (
//     <EntityPageLayout
//       title="Attendance Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityForm
//         title={selectedItem ? "Edit Attendance" : "Create Attendance"}
//         selectedItem={formattedSelected}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Employee",
//             name: "employee",
//             type: "select",
//             options: employees.map((emp) => ({
//               label: `${emp.first_name} ${emp.last_name}`,
//               value: emp.id
//             })),
//             required: true
//           },
//           {
//             label: "Date",
//             name: "date",
//             type: "date",
//             required: true
//           },
//           {
//             label: "Start Time",
//             name: "start_time",
//             type: "time"
//           },
//           {
//             label: "End Time",
//             name: "end_time",
//             type: "time"
//           },
//           // {
//           //   label: "Status",
//           //   name: "status",
//           //   type: "select",
//           //   options: [
//           //     { label: "Present", value: true },
//           //     { label: "Absent", value: false }
//           //   ]
//           // },
//           // {
//           //   label: "Full Leave",
//           //   name: "full_leave",
//           //   type: "select",
//           //   options: [
//           //     { label: "Yes", value: true },
//           //     { label: "No", value: false }
//           //   ]
//           // },
//           // {
//           //   label: "Half Leave",
//           //   name: "half_leave",
//           //   type: "select",
//           //   options: [
//           //     { label: "Yes", value: true },
//           //     { label: "No", value: false }
//           //   ]
//           // }
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityViewCard from "../components/view/EntityViewCard";
import EntityForm from "../components/form/EntityForm";
import EntityTableRow from "../components/table/EntityTableRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { EmployeeAttendanceAPI, EmployeeAPI } from "../services";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

// Helper function to get date range for last 1 week
const getLastWeekRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    start: formatLocalDate(startDate),
    end: formatLocalDate(endDate)
  };
};

// Helper function to get current month
const getCurrentMonth = () => {
  return new Date().getMonth() + 1;
};

export default function EmployeeAttendance() {

  const { setError, setSuccess } = useOutletContext();
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateObj, setSelectedDateObj] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [roleName, setRoleName] = useState(null);
  const [loggedInEmployeeId, setLoggedInEmployeeId] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Employee form states
  const [employeeFormLoading, setEmployeeFormLoading] = useState(false);

  // ================= GET ROLE FROM BACKEND =================
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setIsRoleLoading(true);
        const extra = JSON.parse(localStorage.getItem("user"));
        const role = extra?.role_name?.toLowerCase();
        const userId = extra?.id;

        console.log("Logged-in User:", extra);
        console.log("User ID:", userId);
        console.log("Role:", role);

        if (role === "hr") {
          setRoleName("hr");
          setLoggedInEmployeeId(userId);
        } else {
          setRoleName("employee");
          setLoggedInEmployeeId(userId);
        }

      } catch (error) {
        console.error("Error fetching user role:", error);
        setRoleName("hr");
        setLoggedInEmployeeId(21);
      } finally {
        setIsRoleLoading(false);
      }
    };
    fetchUserRole();
  }, []);

  // ================= FETCH DATA WITH FILTERS =================
  const fetchAttendance = async (date = null, month = null, year = null) => {
    if (isRoleLoading || !roleName) return;

    setLoading(true);
    try {
      let response;

      if (roleName === "hr") {
        if (date) {
          response = await EmployeeAttendanceAPI.getByDate(date);
        } else if (month && year) {
          response = await EmployeeAttendanceAPI.getByMonth(month, year);
        } else {
          const weekRange = getLastWeekRange();
          response = await EmployeeAttendanceAPI.getByDateRange(
            weekRange.start,
            weekRange.end
          );
        }
      } else {
        const currentMonth = getCurrentMonth();
        console.log("Fetching for employee ID:", loggedInEmployeeId, "Month:", currentMonth);
        response = await EmployeeAttendanceAPI.getByEmployeeAndMonth(loggedInEmployeeId, currentMonth);
      }

      console.log("API Response:", response);

      let attendanceData = [];

      if (response?.data?.data && Array.isArray(response.data.data)) {
        attendanceData = response.data.data;
      } else if (response?.data?.data && !Array.isArray(response.data.data)) {
        attendanceData = [response.data.data];
      } else if (response?.data && Array.isArray(response.data)) {
        attendanceData = response.data;
      }

      console.log("Extracted attendance data:", attendanceData);
      setAttendance(attendanceData);

    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error fetching attendance:", error);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await EmployeeAPI.getAll();
      let employeesData = [];
      if (res?.data?.data) {
        employeesData = Array.isArray(res.data.data) ? res.data.data : [];
      } else if (res?.data) {
        employeesData = Array.isArray(res.data) ? res.data : [];
      } else if (Array.isArray(res)) {
        employeesData = res;
      }
      setEmployees(employeesData);
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    if (!isRoleLoading && roleName) {
      fetchAttendance();
      fetchEmployees();
    }
  }, [roleName, isRoleLoading]);

  // ================= HANDLE DATE FILTER CHANGE =================
  const handleDateChange = (date) => {
    console.log("Date selected:", date);

    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      console.log("Formatted date:", formattedDate);

      setSelectedDateObj(date);
      setSelectedDate(formattedDate);
      setSelectedMonth("");
      setAttendance([]);
      fetchAttendance(formattedDate, null);
    } else {
      setSelectedDateObj(null);
      setSelectedDate("");
      setSelectedMonth("");
      setAttendance([]);
      fetchAttendance();
    }
  };

  const handleMonthChange = (e) => {
    const monthValue = e.target.value;
    console.log("Raw month value:", monthValue);

    if (monthValue) {
      const parts = monthValue.split("-");
      const year = parts[0];
      const monthNumber = parseInt(parts[1], 10);

      console.log("Year:", year);
      console.log("Month:", monthNumber);

      setSelectedMonth(monthValue);
      setSelectedDate("");
      setSelectedDateObj(null);
      setAttendance([]);

      fetchAttendance(null, monthNumber, year);
    } else {
      resetFilters();
    }
  };

  const resetFilters = () => {
    console.log("Resetting filters");

    setSelectedDate("");
    setSelectedDateObj(null);
    setSelectedMonth("");
    setAttendance([]);
    fetchAttendance();
  };

  // ================= FORMAT TIME =================
  // ================= FORMAT TIME =================
  // const formatTime = (value) => {
  //   if (!value) return "-";

  //   try {
  //     // Parse the datetime string (which is in local format)
  //     let date;

  //     if (value.includes('T')) {
  //       // Replace T with space and parse
  //       const dateTimeStr = value.replace('T', ' ');
  //       date = new Date(dateTimeStr);
  //     } else {
  //       date = new Date(value);
  //     }

  //     // Check if date is valid
  //     if (isNaN(date.getTime())) {
  //       return value;
  //     }

  //     // Get hours and minutes in local time
  //     let hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     const ampm = hours >= 12 ? 'PM' : 'AM';

  //     hours = hours % 12;
  //     if (hours === 0) hours = 12;

  //     return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  //   } catch (error) {
  //     console.error("Error formatting time:", error);
  //     return value;
  //   }
  // };

  // ================= HR SUBMIT FORM =================
  const onSubmit = async (data) => {
    const payload = { ...data };

    console.log("Original data:", data);

    if (payload.start_time && typeof payload.start_time === 'string' && !payload.start_time.includes('T')) {
      payload.start_time = `${payload.date}T${payload.start_time}:00`;
    }

    if (payload.end_time && typeof payload.end_time === 'string' && !payload.end_time.includes('T')) {
      payload.end_time = `${payload.date}T${payload.end_time}:00`;
    }

    delete payload.id;
    delete payload.employee_name;
    delete payload.total_hours;
    delete payload.status;
    delete payload.full_leave;
    delete payload.half_leave;

    console.log("Formatted payload:", payload);

    try {
      if (selectedItem) {
        const res = await EmployeeAttendanceAPI.update(selectedItem.id, payload);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await EmployeeAttendanceAPI.create(payload);
        setSuccess(res.data?.message || "Saved successfully");
      }

      setMode("list");
      fetchAttendance();
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Error saving attendance:", error);
    }
  };

  // // ================= EMPLOYEE START TIME HANDLER =================
  // const handleEmployeeStartTime = async () => {
  //   setEmployeeFormLoading(true);
  //   try {
  //     // Get current local time
  //     const now = new Date();

  //     // Format for API without timezone conversion - use local datetime
  //     const year = now.getFullYear();
  //     const month = String(now.getMonth() + 1).padStart(2, '0');
  //     const day = String(now.getDate()).padStart(2, '0');
  //     const hours = String(now.getHours()).padStart(2, '0');
  //     const minutes = String(now.getMinutes()).padStart(2, '0');
  //     const seconds = String(now.getSeconds()).padStart(2, '0');

  //     // Format as YYYY-MM-DDTHH:MM:SS (without Z - treat as local time)
  //     const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  //     const displayTime = now.toLocaleTimeString('en-US', { 
  //       hour12: true, 
  //       hour: '2-digit', 
  //       minute: '2-digit',
  //       second: '2-digit'
  //     });

  //     console.log("Current local time:", displayTime);
  //     console.log("Formatted for API (local):", formattedDateTime);

  //     let payload;
  //     if (selectedItem) {
  //       // Update existing record
  //       payload = {
  //         ...selectedItem,
  //         start_time: formattedDateTime,
  //         end_time: selectedItem?.end_time || null,
  //         status: true
  //       };

  //       delete payload.id;
  //       delete payload.employee_name;
  //       delete payload.total_hours;
  //       delete payload.full_leave;
  //       delete payload.half_leave;

  //       await EmployeeAttendanceAPI.update(selectedItem.id, payload);
  //       setSuccess(`Start time recorded successfully at ${displayTime}!`);
  //     } else {
  //       // Create new record
  //       const today = `${year}-${month}-${day}`;
  //       payload = {
  //         employee: loggedInEmployeeId,
  //         date: today,
  //         start_time: formattedDateTime,
  //         end_time: null,
  //         status: true
  //       };

  //       await EmployeeAttendanceAPI.create(payload);
  //       setSuccess(`Attendance started successfully at ${displayTime}!`);
  //     }

  //     setMode("list");
  //     fetchAttendance();
  //   } catch (error) {
  //     setError(parseBackendErrors(error));
  //   } finally {
  //     setEmployeeFormLoading(false);
  //   }
  // };

  // // ================= EMPLOYEE END TIME HANDLER =================
  // const handleEmployeeEndTime = async () => {
  //   if (!selectedItem?.start_time) {
  //     setError("Please mark start time first!");
  //     return;
  //   }

  //   setEmployeeFormLoading(true);
  //   try {
  //     // Get current local time
  //     const now = new Date();

  //     // Format for API without timezone conversion - use local datetime
  //     const year = now.getFullYear();
  //     const month = String(now.getMonth() + 1).padStart(2, '0');
  //     const day = String(now.getDate()).padStart(2, '0');
  //     const hours = String(now.getHours()).padStart(2, '0');
  //     const minutes = String(now.getMinutes()).padStart(2, '0');
  //     const seconds = String(now.getSeconds()).padStart(2, '0');

  //     // Format as YYYY-MM-DDTHH:MM:SS (without Z - treat as local time)
  //     const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  //     const displayTime = now.toLocaleTimeString('en-US', { 
  //       hour12: true, 
  //       hour: '2-digit', 
  //       minute: '2-digit',
  //       second: '2-digit'
  //     });

  //     console.log("Current local time:", displayTime);
  //     console.log("Formatted for API (local):", formattedDateTime);

  //     const payload = {
  //       ...selectedItem,
  //       end_time: formattedDateTime,
  //       status: true
  //     };

  //     delete payload.id;
  //     delete payload.employee_name;
  //     delete payload.total_hours;
  //     delete payload.full_leave;
  //     delete payload.half_leave;

  //     await EmployeeAttendanceAPI.update(selectedItem.id, payload);
  //     setSuccess(`End time recorded successfully at ${displayTime}!`);
  //     setMode("list");
  //     fetchAttendance();
  //   } catch (error) {
  //     setError(parseBackendErrors(error));
  //   } finally {
  //     setEmployeeFormLoading(false);
  //   }
  // };
  // ================= EMPLOYEE START TIME HANDLER =================
  // Using your working format for start time
  const handleEmployeeStartTime = async () => {
    setEmployeeFormLoading(true);
    try {
      // Get current local time
      const now = new Date();

      // Format as YYYY-MM-DDTHH:MM:SS (with T - your working format)
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      const displayTime = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      console.log("Current local time:", displayTime);
      console.log("Formatted for API (with T):", formattedDateTime);

      let payload;
      if (selectedItem) {
        payload = {
          ...selectedItem,
          start_time: formattedDateTime,
          end_time: selectedItem?.end_time || null,
          status: true
        };

        delete payload.id;
        delete payload.employee_name;
        delete payload.total_hours;
        delete payload.full_leave;
        delete payload.half_leave;

        await EmployeeAttendanceAPI.update(selectedItem.id, payload);
        setSuccess(`Start time recorded successfully at ${displayTime}!`);
      } else {
        const today = `${year}-${month}-${day}`;
        payload = {
          employee: loggedInEmployeeId,
          date: today,
          start_time: formattedDateTime,
          end_time: null,
          status: true
        };

        await EmployeeAttendanceAPI.create(payload);
        setSuccess(`Attendance started successfully at ${displayTime}!`);
      }

      setMode("list");
      fetchAttendance();
    } catch (error) {
      setError(parseBackendErrors(error));
    } finally {
      setEmployeeFormLoading(false);
    }
  };

  // ================= EMPLOYEE END TIME HANDLER =================
  // Using space format for end time (which works)
  const handleEmployeeEndTime = async () => {
    if (!selectedItem?.start_time) {
      setError("Please mark start time first!");
      return;
    }

    setEmployeeFormLoading(true);
    try {
      // Get current local time
      const now = new Date();

      // Format as YYYY-MM-DD HH:MM:SS (with space - working format for end time)
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const displayTime = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      console.log("Current local time:", displayTime);
      console.log("Formatted for API (with space):", formattedDateTime);

      const payload = {
        ...selectedItem,
        end_time: formattedDateTime,
        status: true
      };

      delete payload.id;
      delete payload.employee_name;
      delete payload.total_hours;
      delete payload.full_leave;
      delete payload.half_leave;

      console.log("Sending payload with end_time:", payload);

      await EmployeeAttendanceAPI.update(selectedItem.id, payload);
      setSuccess(`End time recorded successfully at ${displayTime}!`);
      setMode("list");
      fetchAttendance();
    } catch (error) {
      setError(parseBackendErrors(error));
    } finally {
      setEmployeeFormLoading(false);
    }
  };

  // ================= FORMAT TIME =================
  // Updated formatTime to handle both formats
  const formatTime = (value) => {
    if (!value) return "-";

    try {
      let hours, minutes;

      // Handle format with T (2026-03-31T17:38:52)
      if (value.includes('T')) {
        const timePart = value.split('T')[1];
        [hours, minutes] = timePart.split(':');
      }
      // Handle format with space (2026-03-31 17:38:52)
      else if (value.includes(' ')) {
        const timePart = value.split(' ')[1];
        [hours, minutes] = timePart.split(':');
      }
      // Handle direct time format
      else {
        [hours, minutes] = value.split(':');
      }

      // Convert to 12-hour format
      const hourNum = parseInt(hours);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;

      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return value;
    }
  };
  // ================= TABLE COLUMNS =================
  const attendanceColumns = [
    {
      key: "employee",
      render: (row) => {
        const emp = employees.find((e) => e.id === row.employee);
        if (emp) {
          return `${emp.first_name} ${emp.last_name}`;
        }
        return row.employee_name || "-";
      }
    },
    {
      key: "date",
      render: (row) => row.date || "-"
    },
    {
      key: "start_time",
      render: (row) => formatTime(row.start_time)
    },
    {
      key: "end_time",
      render: (row) => formatTime(row.end_time)
    },
    {
      key: "total_hours",
      render: (row) => row.total_hours ? Number(row.total_hours).toFixed(2) : "-"
    },
    {
      key: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${row.status === true || row.status === "true" || row.status === 1
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {row.status === true || row.status === "true" || row.status === 1 ? "Present" : "Absent"}
        </span>
      )
    }
  ];

  // ================= VIEW FIELDS =================
  const attendanceFields = [
    { key: "employee", label: "Employee" },
    { key: "date", label: "Date" },
    { key: "start_time", label: "Start Time" },
    { key: "end_time", label: "End Time" },
    { key: "status", label: "Status" },
    { key: "full_leave", label: "Full Leave" },
    { key: "half_leave", label: "Half Leave" },
    { key: "total_hours", label: "Total Hours" },
  ];

  // ================= FILTER COMPONENT =================
  const FilterBar = () => {
    if (roleName !== "hr") return null;

    return (
      <div className="flex gap-4 items-end mb-6 flex-wrap">
        <div>
          <label className="block text-sm font-medium mb-1">Filter by Date</label>
          <DatePicker
            selected={selectedDateObj}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="border rounded px-3 py-2 w-48"
            placeholderText="Select date"
            isClearable
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            showMonthDropdown
            dropdownMode="select"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Filter by Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded px-3 py-2 w-48"
          />
        </div>

        {(selectedDate || selectedMonth) && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition h-[42px]"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  };

  // ================= EMPLOYEE ATTENDANCE FORM COMPONENT =================
  // ================= EMPLOYEE ATTENDANCE FORM COMPONENT =================
  const EmployeeAttendanceForm = () => {
    const isEditing = !!selectedItem;
    const isCompleted = selectedItem?.start_time && selectedItem?.end_time;
    const isStarted = selectedItem?.start_time && !selectedItem?.end_time;
    const today = new Date().toISOString().split('T')[0];

    // State for live time display
    const [currentLiveTime, setCurrentLiveTime] = useState(new Date());

    // Update live time every second
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentLiveTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formattedLiveTime = currentLiveTime.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return (
      <EntityPageLayout
        title={isEditing ? "Mark Attendance" : "Add Attendance"}
        showBack
        onBack={() => setMode("list")}
      >
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {isEditing
              ? `Attendance for ${selectedItem?.date}`
              : `Mark Attendance for ${today}`}
          </h3>

          {/* Live Time Display */}
          <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Current Live Time</p>
            <p className="text-2xl font-bold text-blue-600 font-mono">
              {formattedLiveTime}
            </p>
          </div>

          <div className="space-y-6">
            {/* Show current status if editing */}

            {isEditing && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                {isCompleted ? (
                  <div className="text-green-600 font-semibold">
                    ✅ Attendance Completed
                    <div className="text-sm text-gray-500 mt-1">
                      Start: {formatTime(selectedItem.start_time)}<br />
                      End: {formatTime(selectedItem.end_time)}
                    </div>
                  </div>
                ) : isStarted ? (
                  <div className="text-blue-600 font-semibold">
                    ⏰ Checked In
                    <div className="text-sm text-gray-500 mt-1">
                      Started at: {formatTime(selectedItem.start_time)}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600">⚪ Not Started Yet</div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isEditing ? (
                // New record - Show Start button directly
                <button
                  onClick={handleEmployeeStartTime}
                  disabled={employeeFormLoading}
                  className="w-full py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  {employeeFormLoading ? "Processing..." : `🟢 Start Time (${formattedLiveTime})`}
                </button>
              ) : (
                // Editing existing record
                !isCompleted && (
                  <>
                    {!isStarted ? (
                      <button
                        onClick={handleEmployeeStartTime}
                        disabled={employeeFormLoading}
                        className="w-full py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        {employeeFormLoading ? "Processing..." : `🟢 Mark Start Time (${formattedLiveTime})`}
                      </button>
                    ) : (
                      <button
                        onClick={handleEmployeeEndTime}
                        disabled={employeeFormLoading}
                        className="w-full py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        {employeeFormLoading ? "Processing..." : `🔴 Mark End Time (${formattedLiveTime})`}
                      </button>
                    )}
                  </>
                )
              )}

              {isEditing && isCompleted && (
                <div className="text-center text-green-600 bg-green-50 p-3 rounded-lg">
                  ✓ Attendance already completed for this day
                </div>
              )}
            </div>

            {/* Info Message */}
            <div className="text-sm text-gray-500 text-center border-t pt-4">
              {!isEditing ? (
                <p>💡 Click "Start Time" to record your check-in with current live time</p>
              ) : isCompleted ? (
                <p>✅ Your attendance for this day is complete</p>
              ) : isStarted ? (
                <p>💡 Click "End Time" to record your check-out with current live time</p>
              ) : (
                <p>💡 Click "Start Time" to begin your attendance</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setMode("list")}
              className="w-full py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </EntityPageLayout>
    );
  };

  // ================= LIST PAGE =================
  if (mode === "list") {
    if (isRoleLoading) {
      return (
        <PageContainer>
          <div className="text-center py-8">Loading user information...</div>
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 w-full">
          <SectionTitle
            title={roleName === "hr" ? "Employee Attendance" : "My Attendance"}
          />

          {/* Add button for both HR and Employee */}
          <ActionButtons
            showAdd
            addText="+ Add"
            onAdd={() => {
              setSelectedItem(null);
              setMode("form");
            }}
          />
        </div>

        <FilterBar />

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : attendance && attendance.length > 0 ? (
          <Table
            key={`${selectedDate}-${selectedMonth}`}
            header={
              <TableHeader
                columns={
                  roleName === "hr"
                    ? ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "Action"]
                    : ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "Action"]
                }
              />
            }
          >
            {attendance.map((row, index) => (
              <EntityTableRow
                key={row.id || index}
                row={row}
                index={index}
                columns={attendanceColumns}
                onView={(item) => {
                  setSelectedItem(item);
                  setMode("view");
                }}
                onEdit={(item) => {
                  setSelectedItem(item);
                  setMode("form");
                }}
                onDelete={roleName === "hr" ? async (id) => {
                  try {
                    const res = await EmployeeAttendanceAPI.delete(id);
                    setSuccess(res.data?.message || "Deleted successfully");
                    fetchAttendance();
                  } catch (err) {
                    setError(parseBackendErrors(err));
                  }
                } : undefined}
                hideActions={false}
                showActions={true}
              />
            ))}
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No attendance records found
          </div>
        )}
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedItem) {
    const formattedData = {
      ...selectedItem,
      employee: (() => {
        const emp = employees.find((e) => e.id === selectedItem.employee);
        if (emp) {
          return `${emp.first_name} ${emp.last_name}`;
        }
        return selectedItem.employee_name || "-";
      })(),
      start_time: selectedItem.start_time ? formatTime(selectedItem.start_time) : "-",
      end_time: selectedItem.end_time ? formatTime(selectedItem.end_time) : "-",
      status: selectedItem.status ? "Active" : "Inactive",
      full_leave: selectedItem.full_leave ? "Yes" : "No",
      half_leave: selectedItem.half_leave ? "Yes" : "No",
      total_hours: selectedItem.total_hours ?
        (typeof selectedItem.total_hours === 'number' ?
          selectedItem.total_hours.toFixed(2) :
          parseFloat(selectedItem.total_hours).toFixed(2))
        : "0.00"
    };

    return (
      <EntityPageLayout
        title="Attendance Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Attendance"
          data={formattedData}
          fields={attendanceFields}
          api={EmployeeAttendanceAPI}
          onUpdated={fetchAttendance}
          onDeleted={fetchAttendance}
          headerKeys={["employee"]}
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM PAGE =================
  // Employee Form
  if (mode === "form" && roleName === "employee") {
    return <EmployeeAttendanceForm />;
  }

  // HR Form Page
  if (mode === "form") {
    const formattedSelected = selectedItem && {
      ...selectedItem,
      start_time: selectedItem.start_time
        ? selectedItem.start_time.split("T")[1]?.substring(0, 5)
        : "",
      end_time: selectedItem.end_time
        ? selectedItem.end_time.split("T")[1]?.substring(0, 5)
        : ""
    };

    return (
      <EntityPageLayout
        title="Attendance Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityForm
          title={selectedItem ? "Edit Attendance" : "Create Attendance"}
          selectedItem={formattedSelected}
          onSubmit={onSubmit}
          setMode={setMode}
          fields={[
            {
              label: "Employee",
              name: "employee",
              type: "select",
              options: employees.map((emp) => ({
                label: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
              })),
              required: true
            },
            {
              label: "Date",
              name: "date",
              type: "date",
              required: true
            },
            {
              label: "Start Time",
              name: "start_time",
              type: "time"
            },
            {
              label: "End Time",
              name: "end_time",
              type: "time"
            },
            {
              label: "Status",
              name: "status",
              type: "select",
              options: [
                { label: "Present", value: true },
                { label: "Absent", value: false }
              ]
            },
            {
              label: "Full Leave",
              name: "full_leave",
              type: "select",
              options: [
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]
            },
            {
              label: "Half Leave",
              name: "half_leave",
              type: "select",
              options: [
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]
            }
          ]}
        />
      </EntityPageLayout>
    );
  }

  return null;
}