// components/EmployeeAttendanceStatus.jsx
import { useEffect, useState } from "react";
import { EmployeeAttendanceAPI } from "../services";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import { themes } from "../config/theme.config";
import { Clock, CheckCircle, PlayCircle, LogOut, RefreshCw, Calendar } from "lucide-react";
import { useData } from "../context/DataContext";
import { useUser } from "../hooks/useUser";

const EmployeeAttendanceStatus = () => {
  const { employeeId } = useUser();
  const { 
    todayAttendance: allTodayAttendance, 
    refreshTodayAttendance,
    loading: globalLoading 
  } = useData();

  const attendance = Array.isArray(allTodayAttendance) 
    ? allTodayAttendance.find(a => Number(a.employee_id) === Number(employeeId)) || null
    : null;

  const [localLoading, setLocalLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHR, setIsHR] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [currentLiveTime, setCurrentLiveTime] = useState(new Date());

  // Update live time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get current user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        
        const userRole = user.role_name || user.role || user.user_role;
        const isHRUser = userRole === "HR" ||
          userRole === "Admin" ||
          userRole === "hr" ||
          userRole === "admin";
        
        setIsHR(isHRUser);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Fetch today's attendance
  const fetchTodayAttendance = async () => {
    if (!employeeId) return;
    await refreshTodayAttendance();
  };

  useEffect(() => {
    if (currentUser) {
      fetchTodayAttendance();
    }
  }, [currentUser]);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const isStarted = attendance && attendance.start_time && !attendance.end_time;
  const isCompleted = attendance && attendance.start_time && attendance.end_time;

  // Format time function (same as main component)
  const formatTime = (value) => {
    if (!value) return "-";

    try {
      let hours, minutes;

      if (value.includes('T')) {
        const timePart = value.split('T')[1];
        [hours, minutes] = timePart.split(':');
      } else if (value.includes(' ')) {
        const timePart = value.split(' ')[1];
        [hours, minutes] = timePart.split(':');
      } else {
        [hours, minutes] = value.split(':');
      }

      const hourNum = parseInt(hours);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;

      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return value;
    }
  };

  // Handle Check In (Start Time) - Same as main component
  const handleCheckIn = async () => {
    setLocalLoading(true);
    try {
      const now = new Date();
      
      // Format as YYYY-MM-DDTHH:MM:SS (with T - working format for start time)
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      const today = `${year}-${month}-${day}`;
      const employeeId = currentUser.id;
      
      const displayTime = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      const payload = {
        employee: employeeId,
        date: today,
        start_time: formattedDateTime,
        end_time: null,
        status: true
      };
      
      console.log("Check In Payload:", payload);
      
      const response = await EmployeeAttendanceAPI.create(payload);
      if (response.data) {
        setMessage({ text: `✅ Checked In successfully at ${displayTime}!`, type: "success" });
        fetchTodayAttendance();
      }
    } catch (error) {
      const errorMsg = parseBackendErrors(error);
      setMessage({ text: errorMsg || "❌ Check In Failed!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Check Out (End Time) - Same as main component (with space format)
  const handleCheckOut = async () => {
    if (!attendance?.start_time) {
      setMessage({ text: "⚠️ Please check in first!", type: "error" });
      return;
    }

    setLocalLoading(true);
    try {
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
      
      const payload = {
        ...attendance,
        end_time: formattedDateTime,
        status: true
      };

      delete payload.id;
      delete payload.employee_name;
      delete payload.total_hours;
      delete payload.full_leave;
      delete payload.half_leave;
      
      console.log("Check Out Payload:", payload);
      
      const response = await EmployeeAttendanceAPI.update(attendance.id, payload);
      if (response.data) {
        setMessage({ text: `✅ Checked Out successfully at ${displayTime}!`, type: "success" });
        fetchTodayAttendance();
      }
    } catch (error) {
      const errorMsg = parseBackendErrors(error);
      setMessage({ text: errorMsg || "❌ Check Out Failed!", type: "error" });
    } finally {
      setLocalLoading(false);
    }
  };

  const formattedLiveTime = currentLiveTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  if ((globalLoading || localLoading) && !attendance) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse flex justify-center">
          <div className="h-8 w-8 border-2 border-gray-300 rounded-full border-t-primary animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Message Toast */}
      {message.text && (
        <div className={`px-6 py-3 text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Attendance Status
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {isHR ? "HR Department" : "Employee Attendance"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchTodayAttendance}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Live Time Display */}
        <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Current Live Time</p>
          <p className="text-2xl font-bold text-blue-600 font-mono">
            {formattedLiveTime}
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Today's Status</p>
            
            {isCompleted ? (
              <div className="space-y-2">
                <div className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Attendance Completed
                </div>
                <div className="text-sm text-gray-500">
                  Check In: {formatTime(attendance.start_time)}
                  <br />
                  Check Out: {formatTime(attendance.end_time)}
                </div>
                <div className="text-xs text-gray-400 mt-2">
              <Calendar className="w-5 h-5 mr-3" />
              {new Date().toLocaleDateString("en-GB")}
                </div>
              </div>
            ) : isStarted ? (
              <div className="space-y-2">
                <div className="text-blue-600 font-semibold text-lg flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Checked In
                </div>
                <div className="text-sm text-gray-500">
                  Checked In at: {formatTime(attendance.start_time)}
                </div>
                <button
                  onClick={handleCheckOut}
                  disabled={localLoading}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {localLoading ? "Processing..." : "Check Out"}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-600 text-lg">
                  ⚪ Not Started Yet
                </div>
                <button
                  onClick={handleCheckIn}
                  disabled={localLoading}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  <PlayCircle className="w-4 h-4" />
                  {localLoading ? "Processing..." : `Check In (${formattedLiveTime})`}
                </button>
              </div>
            )}
          </div>
          
          {currentUser && (
            <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
              Logged in as: {currentUser.first_name} {currentUser.last_name} ({currentUser.email})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceStatus;