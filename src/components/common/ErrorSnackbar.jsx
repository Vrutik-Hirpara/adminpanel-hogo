export function parseBackendErrors(error) {
  const data = error?.response?.data;

  if (data?.errors) {
    return Object.values(data.errors).flat().join(" | ");
  }

  if (data?.detail) {
    return data.detail;
  }

  if (data?.message) {
    return data.message;
  }

  return "Something went wrong";
}