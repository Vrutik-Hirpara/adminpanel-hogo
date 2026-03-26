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

// import { EmployeeAttendanceAPI, EmployeeAPI } from "../services";

// export default function EmployeeAttendance() {

//   const [attendance, setAttendance] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // ================= FETCH DATA =================

//   const fetchAttendance = async () => {
//     const res = await EmployeeAttendanceAPI.getAll();
//     setAttendance(res.data.data || res);
//   };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data.data || res);
//   };

//   useEffect(() => {
//     fetchAttendance();
//     fetchEmployees();
//   }, []);

//   // ================= FORMAT TIME (NO TIMEZONE BUG) =================

// const formatTime = (value) => {
//   if (!value) return "-";

//   let timePart = value;

//   // if datetime string
//   if (value.includes("T")) {
//     timePart = value.split("T")[1];
//   }

//   // remove seconds or timezone
//   timePart = timePart.slice(0,5);

//   let [hours, minutes] = timePart.split(":").map(Number);

//   const ampm = hours >= 12 ? "PM" : "AM";

//   hours = hours % 12;
//   if (hours === 0) hours = 12;

//   return `${hours}:${minutes.toString().padStart(2,"0")} ${ampm}`;
// };

//   // ================= SUBMIT FORM =================

// const onSubmit = async (data) => {
//   console.log("Submitting data:", data); // Debug log

//   const payload = { ...data };

//   // Handle start_time
//   if (payload.start_time) {
//     // If it's already a full datetime string (from API), extract just the time part
//     if (payload.start_time.includes('T')) {
//       payload.start_time = payload.start_time.split('T')[1].slice(0,5);
//     }
//     // Combine with date
//     payload.start_time = `${payload.date}T${payload.start_time}:00`;
//     payload.status = true;
//   } else {
//     payload.start_time = null;
//   }

//   // Handle end_time
//   if (payload.end_time) {
//     // If it's already a full datetime string (from API), extract just the time part
//     if (payload.end_time.includes('T')) {
//       payload.end_time = payload.end_time.split('T')[1].slice(0,5);
//     }
//     // Combine with date
//     payload.end_time = `${payload.date}T${payload.end_time}:00`;
//   } else {
//     payload.end_time = null;
//   }

//   console.log("Final payload:", payload); // Debug log

//   try {
//     if (selectedItem && selectedItem.id) {
//       await EmployeeAttendanceAPI.update(selectedItem.id, payload);
//     } else {
//       await EmployeeAttendanceAPI.create(payload);
//     }
    
//     setMode("list");
//     fetchAttendance();
//   } catch (error) {
//     console.error("Submit error:", error);
//   }
// };

//   // ================= TABLE COLUMNS =================

//   const attendanceColumns = [

//     {
//       key: "employee",
//       render: (row) => {
//         const emp = employees.find((e) => e.id === row.employee);
//         return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//       }
//     },

//     { key: "date" },

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

//   const attendanceFields = [
//     { 
//       key: "employee", 
//       label: "Employee",
//       format: (value) => {
//         const emp = employees.find((e) => e.id === value);
//         return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//       }
//     },
//     { key: "date", label: "Date" },
//     { 
//       key: "start_time", 
//       label: "Start Time",
//       format: formatTime
//     },
//     { 
//       key: "end_time", 
//       label: "End Time",
//       format: formatTime
//     },
//     { 
//       key: "status", 
//       label: "Status",
//       format: (value) => value ? "Present" : "Absent"
//     },
//     { 
//       key: "full_leave", 
//       label: "Full Leave",
//       format: (value) => value ? "Yes" : "No"
//     },
//     { 
//       key: "half_leave", 
//       label: "Half Leave",
//       format: (value) => value ? "Yes" : "No"
//     },
//     { 
//       key: "total_hours", 
//       label: "Total Hours",
//       format: (value) => value ? value.toFixed(2) : "0.00"
//     },
//   ];

//   // Helper function to format item for editing
//   const formatItemForEdit = (item) => {
//     if (!item) return null;
    
//     return {
//       ...item,
//       start_time: item.start_time 
//         ? (item.start_time.includes('T') 
//           ? item.start_time.split('T')[1].slice(0,5)
//           : item.start_time.slice(0,5))
//         : "",
//       end_time: item.end_time
//         ? (item.end_time.includes('T')
//           ? item.end_time.split('T')[1].slice(0,5)
//           : item.end_time.slice(0,5))
//         : ""
//     };
//   };

//   // ================= LIST PAGE =================

//   if (mode === "list") {

//     return (
//       <PageContainer>

//         <div className="flex justify-between items-center mb-4">

//           <SectionTitle title="Employee Attendance" />

//           <ActionButtons
//             showAdd
//             addText="+ Add"
//             onAdd={() => {
//               setSelectedItem(null);
//               setMode("form");
//             }}
//           />

//         </div>

//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Employee",
//                 "Date",
//                 "Start Time",
//                 "End Time",
//                 "Total Hours",
//                 "Status",
//                 "Action"
//               ]}
//             />
//           }
//         >

//           {attendance?.map?.((row, index) => (

//             <EntityTableRow
//               key={row.id}
//               row={row}
//               index={index}
//               columns={attendanceColumns}

//               onView={(item) => {
//                 setSelectedItem(item);
//                 setMode("view");
//               }}

//               onEdit={(item) => {
//                 const formatted = formatItemForEdit(item);
//                 setSelectedItem(formatted);
//                 setMode("form");
//               }}

//               onDelete={(id) =>
//                 EmployeeAttendanceAPI.delete(id).then(fetchAttendance)
//               }

//             />

//           ))}

//         </Table>

//       </PageContainer>
//     );
//   }

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
//           headerKeys={["date"]}
//         />

//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM PAGE =================

//   return (

//     <EntityPageLayout
//       title="Attendance Details"
//       showBack
//       onBack={() => setMode("list")}
//     >

//       <EntityForm
//         title={selectedItem ? "Edit Attendance" : "Create Attendance"}
//         selectedItem={selectedItem}
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

// import { EmployeeAttendanceAPI, EmployeeAPI } from "../services";

// export default function EmployeeAttendance() {

//   const [attendance, setAttendance] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // ================= FETCH DATA =================

//   const fetchAttendance = async () => {
//     const res = await EmployeeAttendanceAPI.getAll();
//     setAttendance(res.data.data || res);
//   };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data.data || res);
//   };

//   useEffect(() => {
//     fetchAttendance();
//     fetchEmployees();
//   }, []);

//   // ================= FORMAT TIME (NO TIMEZONE BUG) =================

// const formatTime = (value) => {
//   if (!value) return "-";

//   let timePart = value;

//   // if datetime string
//   if (value.includes("T")) {
//     timePart = value.split("T")[1];
//   }

//   // remove seconds or timezone
//   timePart = timePart.slice(0,5);

//   let [hours, minutes] = timePart.split(":").map(Number);

//   const ampm = hours >= 12 ? "PM" : "AM";

//   hours = hours % 12;
//   if (hours === 0) hours = 12;

//   return `${hours}:${minutes.toString().padStart(2,"0")} ${ampm}`;
// };

//   // ================= SUBMIT FORM =================

// const onSubmit = async (data) => {

//   const payload = { ...data };

//   if (payload.start_time && !payload.start_time.includes("T")) {
//     payload.start_time = `${payload.date}T${payload.start_time}`;
//     payload.status = true;
//   }

//   if (payload.end_time && !payload.end_time.includes("T")) {
//     payload.end_time = `${payload.date}T${payload.end_time}`;
//   }

//   selectedItem
//     ? await EmployeeAttendanceAPI.update(selectedItem.id, payload)
//     : await EmployeeAttendanceAPI.create(payload);

//   setMode("list");
//   fetchAttendance();
// };

//   // ================= TABLE COLUMNS =================

//   const attendanceColumns = [

//     {
//       key: "employee",
//       render: (row) => {
//         const emp = employees.find((e) => e.id === row.employee);
//         return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//       }
//     },

//     { key: "date" },

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

//   // ================= LIST PAGE =================

//   if (mode === "list") {

//     return (
//       <PageContainer>

//         <div className="flex justify-between items-center mb-4">

//           <SectionTitle title="Employee Attendance" />

//           <ActionButtons
//             showAdd
//             addText="+ Add"
//             onAdd={() => {
//               setSelectedItem(null);
//               setMode("form");
//             }}
//           />

//         </div>

//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Employee",
//                 "Date",
//                 "Start Time",
//                 "End Time",
//                 "Total Hours",
//                 "Status",
//                 "Action"
//               ]}
//             />
//           }
//         >

//           {attendance?.map?.((row, index) => (

//             <EntityTableRow
//               key={row.id}
//               row={row}
//               index={index}
//               columns={attendanceColumns}

//               onView={(item) => {
//                 setSelectedItem(item);
//                 setMode("view");
//               }}

//               onEdit={(item) => {
//                 setSelectedItem(item);
//                 setMode("form");
//               }}

//               onDelete={(id) =>
//                 EmployeeAttendanceAPI.delete(id).then(fetchAttendance)
//               }

//             />

//           ))}

//         </Table>

//       </PageContainer>
//     );
//   }

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

// const formattedSelected =
//   selectedItem && {
//     ...selectedItem,

//     start_time: selectedItem.start_time
//       ? selectedItem.start_time.split("T")[1]?.substring(0,5)
//       : "",

//     end_time: selectedItem.end_time
//       ? selectedItem.end_time.split("T")[1]?.substring(0,5)
//       : ""
//   };

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

  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Filter states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateObj, setSelectedDateObj] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [roleName, setRoleName] = useState(null); // Start with null
  const [loggedInEmployeeId, setLoggedInEmployeeId] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true); // Add role loading state
  
  // Loading state
  const [loading, setLoading] = useState(false);

  // ================= GET ROLE FROM BACKEND =================
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setIsRoleLoading(true);
        // Get user data from localStorage
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
  const fetchAttendance = async (date = null, month = null) => {
    // Don't fetch if role is still loading
    if (isRoleLoading || !roleName) return;
    
    setLoading(true);
    try {
      let response;
      
      if (roleName === "hr") {
        if (date) {
          response = await EmployeeAttendanceAPI.getByDate(date);
        } else if (month) {
          response = await EmployeeAttendanceAPI.getByMonth(month);
        } else {
          const weekRange = getLastWeekRange();
          response = await EmployeeAttendanceAPI.getByDateRange(weekRange.start, weekRange.end);
        }
      } else {
        const currentMonth = getCurrentMonth();
        console.log("Fetching for employee ID:", loggedInEmployeeId, "Month:", currentMonth);
        response = await EmployeeAttendanceAPI.getByEmployeeAndMonth(loggedInEmployeeId, currentMonth);
      }
      
      console.log("API Response:", response);
      
      // Extract data correctly
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
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  // Only fetch when role is determined
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

  // ================= HANDLE MONTH FILTER CHANGE =================
  const handleMonthChange = (e) => {
    const monthValue = e.target.value;
    console.log("Raw month value:", monthValue);
    
    if (monthValue) {
      const monthNumber = parseInt(monthValue.split('-')[1], 10);
      console.log("Extracted month number:", monthNumber);
      
      setSelectedMonth(monthValue);
      setSelectedDate("");
      setSelectedDateObj(null);
      setAttendance([]);
      fetchAttendance(null, monthNumber);
    } else {
      setSelectedMonth("");
      setSelectedDate("");
      setSelectedDateObj(null);
      setAttendance([]);
      fetchAttendance();
    }
  };

  // ================= RESET FILTERS =================
  const resetFilters = () => {
    console.log("Resetting filters");
    
    setSelectedDate("");
    setSelectedDateObj(null);
    setSelectedMonth("");
    setAttendance([]);
    fetchAttendance();
  };

  // ================= FORMAT TIME =================
  const formatTime = (value) => {
    if (!value) return "-";

    let timePart = value;

    if (value.includes("T")) {
      timePart = value.split("T")[1];
    }

    timePart = timePart.slice(0,5);

    let [hours, minutes] = timePart.split(":").map(Number);

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;

    return `${hours}:${minutes.toString().padStart(2,"0")} ${ampm}`;
  };

  // ================= SUBMIT FORM =================
// ================= SUBMIT FORM =================
const onSubmit = async (data) => {
  const payload = { ...data };
  
  console.log("Original data:", data);
  
  // Format time correctly
  if (payload.start_time && typeof payload.start_time === 'string' && !payload.start_time.includes('T')) {
    payload.start_time = `${payload.date}T${payload.start_time}:00`;
  }
  
  if (payload.end_time && typeof payload.end_time === 'string' && !payload.end_time.includes('T')) {
    payload.end_time = `${payload.date}T${payload.end_time}:00`;
  }
  
  // Remove fields that shouldn't be sent
  delete payload.id;
  delete payload.employee_name;
  delete payload.total_hours;
  
  // ✅ Don't send status, full_leave, half_leave - backend calculates them
  delete payload.status;
  delete payload.full_leave;
  delete payload.half_leave;
  
  console.log("Formatted payload:", payload);
  
  try {
    if (selectedItem) {
      await EmployeeAttendanceAPI.update(selectedItem.id, payload);
    } else {
      await EmployeeAttendanceAPI.create(payload);
    }
    
    setMode("list");
    fetchAttendance();
  } catch (error) {
    console.error("Error saving attendance:", error);
    alert("Error saving attendance. Please check the data format.");
  }
};

  // ================= TABLE COLUMNS =================
  const attendanceColumns = [
    // {
    //   key: "employee",
    //   render: (row) => {
    //     if (roleName !== "hr") {
    //       return row.employee_name || "-";
    //     }
    //     const emp = employees.find((e) => e.id === row.employee);
    //     return emp ? `${emp.first_name} ${emp.last_name}` : row.employee_name || "-";
    //   }
    // },
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
      render: (row) => row.total_hours || "-"
    },
    {
      key: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status ? "Present" : "Absent"}
        </span>
      )
    }
  ];

  // ================= VIEW FIELDS =================
  // const attendanceFields = [
  //   { key: "employee", label: "Employee" },
  //   { key: "date", label: "Date" },
  //   { key: "start_time", label: "Start Time" },
  //   { key: "end_time", label: "End Time" },
  //   { key: "status", label: "Status" },
  //   { key: "full_leave", label: "Full Leave" },
  //   { key: "half_leave", label: "Half Leave" },
  //   { key: "total_hours", label: "Total Hours" },
  // ];

// ================= VIEW FIELDS =================
const attendanceFields = [
  { 
    key: "employee", 
    label: "Employee",
    format: (value, row) => {
      if (roleName !== "hr") {
        return row?.employee_name || "-";
      }
      const emp = employees.find((e) => e.id === value);
      return emp ? `${emp.first_name} ${emp.last_name}` : "-";
    }
  },
  { key: "date", label: "Date" },
  { 
    key: "start_time", 
    label: "Start Time",
    format: (value) => value ? formatTime(value) : "-"
  },
  { 
    key: "end_time", 
    label: "End Time",
    format: (value) => value ? formatTime(value) : "-"
  },
  { 
    key: "status", 
    label: "Status",
    format: (value) => {
      // Convert to boolean first
      const isActive = value === true || value === "true" || value === 1 || value === "1";
      return isActive ? "Active" : "Inactive";
    }
  },
  { 
    key: "full_leave", 
    label: "Full Leave",
    format: (value) => {
      const isYes = value === true || value === "true" || value === 1 || value === "1";
      return isYes ? "Yes" : "No";
    }
  },
  { 
    key: "half_leave", 
    label: "Half Leave",
    format: (value) => {
      const isYes = value === true || value === "true" || value === 1 || value === "1";
      return isYes ? "Yes" : "No";
    }
  },
  { 
    key: "total_hours", 
    label: "Total Hours",
    format: (value) => {
      if (!value && value !== 0) return "0.00";
      if (typeof value === 'number') return value.toFixed(2);
      if (typeof value === 'string') return parseFloat(value).toFixed(2);
      return "0.00";
    }
  },
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

  // ================= LIST PAGE =================
  if (mode === "list") {
    // Show loading while role is being determined
    if (isRoleLoading) {
      return (
        <PageContainer>
          <div className="text-center py-8">Loading user information...</div>
        </PageContainer>
      );
    }
    
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle 
            title={
              roleName === "hr" 
                ? "Employee Attendance" 
                : "My Attendance"
            } 
          />
          
          {roleName === "hr" && (
            <ActionButtons
              showAdd
              addText="+ Add"
              onAdd={() => {
                setSelectedItem(null);
                setMode("form");
              }}
            />
          )}
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
                    : ["Employee", "Date", "Start Time", "End Time", "Total Hours", "Status", "View"]
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
                onEdit={roleName === "hr" ? (item) => {
                  setSelectedItem(item);
                  setMode("form");
                } : undefined}
                onDelete={roleName === "hr" ? (id) => {
                  EmployeeAttendanceAPI.delete(id).then(() => fetchAttendance());
                } : undefined}
                hideActions={roleName !== "hr"}
                showActions={roleName === "hr"}
              />
            ))}
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No attendance records found for {
              selectedDate 
                ? selectedDate 
                : selectedMonth 
                  ? `month ${selectedMonth.split('-')[1]}`
                  : "this period"
            }
          </div>
        )}
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  // if (mode === "view" && selectedItem) {
  //   return (
  //     <EntityPageLayout
  //       title="Attendance Details"
  //       showBack
  //       onBack={() => setMode("list")}
  //     >
  //       <EntityViewCard
  //         title="Attendance"
  //         data={selectedItem}
  //         fields={attendanceFields}
  //         api={EmployeeAttendanceAPI}
  //         onUpdated={fetchAttendance}
  //         onDeleted={fetchAttendance}
  //         headerKeys={["employee"]}
  //       />
  //     </EntityPageLayout>
  //   );
  // }
// ================= VIEW PAGE =================
if (mode === "view" && selectedItem) {
  // Format all data before passing to EntityViewCard
  const formattedData = {
    ...selectedItem,
    employee: (() => {
      if (roleName !== "hr") return selectedItem.employee_name || "-";
      const emp = employees.find((e) => e.id === selectedItem.employee);
      return emp ? `${emp.first_name} ${emp.last_name}` : "-";
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
        fields={[
          { key: "employee", label: "Employee" },
          { key: "date", label: "Date" },
          { key: "start_time", label: "Start Time" },
          { key: "end_time", label: "End Time" },
          { key: "status", label: "Status" },
          { key: "full_leave", label: "Full Leave" },
          { key: "half_leave", label: "Half Leave" },
          { key: "total_hours", label: "Total Hours" },
        ]}
        api={EmployeeAttendanceAPI}
        onUpdated={fetchAttendance}
        onDeleted={fetchAttendance}
        headerKeys={["employee"]}
      />
    </EntityPageLayout>
  );
}
  // ================= FORM PAGE =================
  const formattedSelected =
    selectedItem && {
      ...selectedItem,
      start_time: selectedItem.start_time
        ? selectedItem.start_time.split("T")[1]?.substring(0,5)
        : "",
      end_time: selectedItem.end_time
        ? selectedItem.end_time.split("T")[1]?.substring(0,5)
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
          // {
          //   label: "Status",
          //   name: "status",
          //   type: "select",
          //   options: [
          //     { label: "Present", value: true },
          //     { label: "Absent", value: false }
          //   ]
          // },
          // {
          //   label: "Full Leave",
          //   name: "full_leave",
          //   type: "select",
          //   options: [
          //     { label: "Yes", value: true },
          //     { label: "No", value: false }
          //   ]
          // },
          // {
          //   label: "Half Leave",
          //   name: "half_leave",
          //   type: "select",
          //   options: [
          //     { label: "Yes", value: true },
          //     { label: "No", value: false }
          //   ]
          // }
        ]}
      />
    </EntityPageLayout>
  );
}