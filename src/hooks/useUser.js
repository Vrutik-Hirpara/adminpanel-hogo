export const useUser = () => {
  const extra = JSON.parse(localStorage.getItem("user")) || {};

  const employeeId = extra?.id;
  const role = extra?.role_name?.toLowerCase();

  const isHR = role === "hr";
  const isLoggedIn = !!localStorage.getItem("token");

  return {
    employeeId,
    role,
    isHR,
    isLoggedIn,
    userData: extra
  };
};