export function parseBackendErrors(error) {
  const backendErrors = error?.response?.data?.errors;

  if (!backendErrors) {
    return "Something went wrong";
  }

  let messages = [];

  Object.keys(backendErrors).forEach((field) => {
    backendErrors[field].forEach((msg) => {
      messages.push(`${field}: ${msg}`);
    });
  });

  return messages.join(" | ");
}