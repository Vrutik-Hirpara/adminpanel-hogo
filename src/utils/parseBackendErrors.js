// export function parseBackendErrors(error) {
//   const backendErrors = error?.response?.data?.errors;

//   if (!backendErrors) {
//     return "Something went wrong";
//   }

//   let messages = [];

//   Object.keys(backendErrors).forEach((field) => {
//     backendErrors[field].forEach((msg) => {
//       messages.push(`${field}: ${msg}`);
//     });
//   });

//   return messages.join(" | ");
// }

export function parseBackendResponse(response) {
  // Handle error responses (status false or missing success)
  if (!response?.data?.success && response?.data?.status === "Invalid data") {
    // POST required / POST unique format
    const errors = response?.data?.errors;
    if (errors) {
      let messages = [];
      Object.keys(errors).forEach((field) => {
        const errorMsgs = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
        errorMsgs.forEach((msg) => {
          messages.push(`${field}: ${msg}`);
        });
      });
      return {
        success: false,
        message: messages.join(" | ")
      };
    }
    return {
      success: false,
      message: response?.data?.message || "Invalid data"
    };
  }

  // Handle GET, POST, DELETE success responses
  if (response?.data?.success === true) {
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      count: response.data.count
    };
  }

  // Handle PATCH/DELETE required field errors
  if (response?.data?.success === false && response?.data?.message) {
    return {
      success: false,
      message: response.data.message
    };
  }

  // Default fallback
  return {
    success: false,
    message: "Something went wrong"
  };
}

// Keep your original function for backward compatibility if needed
export function parseBackendErrors(error) {
  const backendErrors = error?.response?.data?.errors;
  
  if (!backendErrors) {
    return error?.response?.data?.message || "Something went wrong";
  }

  let messages = [];
  Object.keys(backendErrors).forEach((field) => {
    const errorMsgs = Array.isArray(backendErrors[field]) 
      ? backendErrors[field] 
      : [backendErrors[field]];
    errorMsgs.forEach((msg) => {
      messages.push(`${field}: ${msg}`);
    });
  });

  return messages.join(" | ");
}