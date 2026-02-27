export const getEmployeeFilter = (isHR, employeeId, url) => {
  if (isHR) return url; // HR gets full list
  return `${url}?employee=${employeeId}`;
};

export const getAssignedFilter = (isHR, employeeId, url) => {
  if (isHR) return url;
  return `${url}?assigned_to=${employeeId}`;
};