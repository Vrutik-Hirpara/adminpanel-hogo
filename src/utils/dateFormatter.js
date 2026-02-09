let DATE_FORMAT = "DD/MM/YYYY"; // default

export const setDateFormat = (format) => {
  DATE_FORMAT = format;
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const d = new Date(dateString);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  switch (DATE_FORMAT) {
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};
