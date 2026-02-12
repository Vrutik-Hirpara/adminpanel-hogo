// import FormWrapper from "../../components/form/FormWrapper";
// import FormContainer from "../../components/form/FormContainer";
// import FormInput from "../../components/form/FormInput";
// import FormActions from "../../components/form/FormActions";
// import { themes } from "../../config/theme.config";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const form = new FormData();
//       form.append("email", data.email);
//       form.append("password", data.password);

//       const res = await fetch(
//         "https://hogofilm.pythonanywhere.com/employee_login/",
//         {
//           method: "POST",
//           body: form,
//         }
//       );

//       const result = await res.json();
//       console.log("API Response:", result);

//       if (result.access_token) {
//         // ✅ Save tokens + user
//         localStorage.setItem("token", result.access_token);
//         localStorage.setItem("refresh", result.refresh_token);
//         localStorage.setItem("user", JSON.stringify(result.data));

//         // ✅ Redirect to dashboard (React way, not reload)
//         navigate("/dashboard");
//       } else {
//         alert(result.message || "Login failed");
//       }
//     } catch (e) {
//       console.log(e);
//       alert("Server error");
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

//                 <div className="mt-6 space-y-4">
//                   <FormActions submitLabel="Login" hideCancel />

//                   <p
//                     className="text-sm text-center"
//                     style={{ color: themes.backgroundGray }}
//                   >
//                     Don’t have an account?{" "}
//                     <Link
//                       to="/register"
//                       style={{ color: themes.primary }}
//                       className="font-medium hover:underline"
//                     >
//                       Register
//                     </Link>
//                   </p>
//                 </div>
//               </FormContainer>
//             );
//           }}
//         </FormWrapper>
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import FormWrapper from "../components/form/FormWrapper";
// import FormContainer from "../components/form/FormContainer";
// import FormInput from "../components/form/FormInput";
// import FormActions from "../components/form/FormActions";
// import { themes } from "../config/theme.config";

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
//       const form = new FormData();
//       form.append("email", data.email);
//       form.append("password", data.password);

//       const res = await fetch(
//         "https://hogofilm.pythonanywhere.com/employee_login/",
//         {
//           method: "POST",
//           body: form,
//         }
//       );

//       const result = await res.json();

//       if (result.access_token) {
//         localStorage.setItem("token", result.access_token);
//         localStorage.setItem("refresh", result.refresh_token);
//         localStorage.setItem("user", JSON.stringify(result.data));

//         navigate("/dashboard");
//       } else {
//         alert(result.message || "Login failed");
//       }
//     } catch (e) {
//       console.log(e);
//       alert("Server error");
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
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../components/form/FormWrapper";
import FormContainer from "../components/form/FormContainer";
import FormInput from "../components/form/FormInput";
import FormActions from "../components/form/FormActions";
import { themes } from "../config/theme.config";

export default function Login() {
  const navigate = useNavigate();

  // 🔥 If already logged in, skip login page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append("email", data.email);
      form.append("password", data.password);

      const res = await fetch(
        "https://hogofilm.pythonanywhere.com/employee_login/",
        {
          method: "POST",
          body: form,
        }
      );

      const result = await res.json();

      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("refresh", result.refresh_token);
        localStorage.setItem("user", JSON.stringify(result.data));

        navigate("/dashboard");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (e) {
      console.log(e);
      alert("Server error");
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
