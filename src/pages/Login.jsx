
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import FormWrapper from "../components/form/FormWrapper";
// import FormContainer from "../components/form/FormContainer";
// import FormInput from "../components/form/FormInput";
// import FormActions from "../components/form/FormActions";
// import { themes } from "../config/theme.config";
// import api from "../services/api"; // 👈 import dynamic axios instance

// export default function Login() {
//   const navigate = useNavigate();

//   // 🔥 If already logged in, skip login page
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const onSubmit = async (data) => {
//     try {
//       // 👇 Using axios instance instead of static fetch
//       const res = await api.post("employee_login/", {
//         email: data.email,
//         password: data.password,
//       });

//       const result = res.data;

//       if (result.access_token) {
//         localStorage.setItem("token", result.access_token);
//         localStorage.setItem("refresh", result.refresh_token);
//         localStorage.setItem("user", JSON.stringify(result.data));

//         navigate("/dashboard");
//       } else {
//         alert(result.message || "Login failed");
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Server error");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{ backgroundColor: themes.backgroundGray }}
//     >
//       <div className="w-full max-w-md">
//         <FormWrapper onSubmit={onSubmit}>
//           {(methods) => {
//             const { register } = methods;

//             return (
//               <FormContainer title="Employee Login">
//                 <div className="space-y-5">
//                   <FormInput
//                     label="Email"
//                     name="email"
//                     type="email"
//                     register={register}
//                     required
//                     autoComplete="email"
//                   />

//                   <FormInput
//                     label="Password"
//                     name="password"
//                     type="password"
//                     register={register}
//                     required
//                     autoComplete="current-password"
//                   />
//                 </div>

//                 <div className="mt-6 flex justify-center items-center">
//                   <FormActions submitLabel="Login" hideCancel />
//                 </div>
//               </FormContainer>
//             );
//           }}
//         </FormWrapper>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/form/FormWrapper";
import FormContainer from "../components/form/FormContainer";
import FormInput from "../components/form/FormInput";
import FormActions from "../components/form/FormActions";
import { themes } from "../config/theme.config";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  // 🔒 Skip login page if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && window.location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("employee_login/", {
        email: data.email,
        password: data.password,
      });

      const result = res.data;

      if (result.access_token) {
        // 🔐 Store tokens
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("refresh", result.refresh_token);
        localStorage.setItem("user", JSON.stringify(result.data));

        // 🚀 Redirect
        navigate("/dashboard", { replace: true });
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: themes.backgroundGray }}
    >
      <div className="w-full max-w-md">
        <FormWrapper onSubmit={onSubmit}>
          {(methods) => {
            const { register } = methods;

            return (
              <FormContainer title="Employee Login">
                <div className="space-y-5">
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    required
                    autoComplete="email"
                  />

                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <div className="mt-6 flex justify-center items-center">
                  <FormActions submitLabel="Login" hideCancel />
                </div>
              </FormContainer>
            );
          }}
        </FormWrapper>
      </div>
    </div>
  );
}
