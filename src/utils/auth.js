// export const getUserFromToken = () => {
//   const token = localStorage.getItem("access_token");
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload;
//   } catch (err) {
//     return null;
//   }
// };
 export const getUserFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return {
      ...payload,
      // 🔥 force boolean conversion here
      is_employee:
        payload.is_employee === true || payload.is_employee === "true",
    };
  } catch (err) {
    console.error("Token decode error:", err);
    return null;
  }
};
