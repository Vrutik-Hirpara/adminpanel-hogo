// export const getEmployeeFilter = (isHR, employeeId, url) => {
//   if (isHR) return url; // HR gets full list
//   return `${url}?employee=${employeeId}`;
// };

// export const getAssignedFilter = (isHR, employeeId, url) => {
//   if (isHR) return url;
//   return `${url}?assigned_to=${employeeId}`;
// };


export const appendQueryParams = (url, params) => {
  const query = new URLSearchParams(params).toString();
  return url.includes("?") ? `${url}&${query}` : `${url}?${query}`;
};

export const getEmployeeFilter = (isHR, employeeId, url) => {
  if (isHR) return url;
  return appendQueryParams(url, { employee: employeeId });
};

export const getAssignedFilter = (isHR, employeeId, url) => {
  if (isHR) return url;
  return appendQueryParams(url, { assigned_to: employeeId });
};