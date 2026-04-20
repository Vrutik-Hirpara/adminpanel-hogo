// components/EmployeeAttendanceStatus.jsx
import { useEffect, useState } from "react";
import { EmployeeAttendanceAPI } from "../services";
import { parseBackendErrors, parseBackendResponse } from "../utils/parseBackendErrors";
import { themes } from "../config/theme.config";
import { Clock, CheckCircle, PlayCircle, LogOut, RefreshCw, Calendar } from "lucide-react";
import { useOutletContext } from "react-router-dom";


const EmployeeAttendanceStatus = () => {
  const { setError, setSuccess } = useOutletContext(); // ✅ ADD THIS

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isHR, setIsHR] = useState(false);
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
  // const fetchTodayAttendance = async () => {
  //   if (!currentUser) return;
  //   setLoading(true);
  //   try {
  //     const today = new Date().toISOString().split('T')[0];
  //     const employeeId = currentUser.id; // Use id from user object

  //     // Get all attendance and filter for today
  //     const res = await EmployeeAttendanceAPI.getAll();
  //     const allAttendance = res.data?.data || [];

  //     const todayAttendance = allAttendance.find(
  //       att => att.employee === employeeId && att.date === today
  //     );

  //     setAttendance(todayAttendance || null);
  //   } catch (error) {
  //     console.error("Error fetching attendance:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchTodayAttendance = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const employeeId = currentUser.id;

      const res = await EmployeeAttendanceAPI.getAll();
      const parsed = parseBackendResponse(res);
      const allAttendance = parsed.success && parsed.data ? (Array.isArray(parsed.data) ? parsed.data : []) : [];

      const todayAttendance = allAttendance.find(
        att => att.employee === employeeId && att.date === today
      );

      setAttendance(todayAttendance || null);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchTodayAttendance();
    }
  }, [currentUser]);



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
    setLoading(true);
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
      const parsed = parseBackendResponse(response);
      if (parsed.success) {
        setSuccess(parsed.message || `Checked In successfully at ${displayTime}!`); // ✅ CHANGE
        fetchTodayAttendance();
      }else {
      setError(parsed.message || "Check In Failed!"); // ✅ ADD
    }
    } catch (error) {
      const errorMsg = parseBackendErrors(error);
    setError(errorMsg || "Check In Failed!"); // ✅ CHANGE
    } finally {
      setLoading(false);
    }
  };

  // Handle Check Out (End Time) - Same as main component (with space format)
  const handleCheckOut = async () => {
    if (!attendance?.start_time) {
    setError("Please check in first!"); // ✅ CHANGE
      return;
    }

    setLoading(true);
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
      const parsed = parseBackendResponse(response);
      if (parsed.success) {
      setSuccess(parsed.message || `Checked Out successfully at ${displayTime}!`); // ✅ CHANGE
        fetchTodayAttendance();
      } else {
      setError(parsed.message || "Check Out Failed!"); // ✅ ADD
    }
    } catch (error) {
      const errorMsg = parseBackendErrors(error);
    setError(errorMsg || "Check Out Failed!"); // ✅ CHANGE
    } finally {
      setLoading(false);
    }
  };

  const formattedLiveTime = currentLiveTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  if (loading && !attendance) {
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
                  disabled={loading}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {loading ? "Processing..." : "Check Out"}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-600 text-lg">
                  ⚪ Not Started Yet
                </div>
                <button
                  onClick={handleCheckIn}
                  disabled={loading}
                  className="mt-3 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                  style={{ backgroundColor: themes.primary }}
                >
                  <PlayCircle className="w-4 h-4" />
                  {loading ? "Processing..." : `Check In (${formattedLiveTime})`}
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