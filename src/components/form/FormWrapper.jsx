// import { useForm } from "react-hook-form";
// import { themes } from "../../config/theme.config";

// export default function FormWrapper({ children, onSubmit }) {
//   const methods = useForm();

//   return (
//     <form
//       onSubmit={methods.handleSubmit(onSubmit)}
//       className="w-full max-w-5xl mx-auto p-6 sm:p-8 rounded-xl "
//       style={{
//         backgroundColor: themes.textWhite,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       {children(methods)}
//     </form>
//   );
// }
import { useForm } from "react-hook-form";
import { themes } from "../../config/theme.config";

export default function FormWrapper({ children, onSubmit }) {
  const methods = useForm({ mode: "onSubmit" }); // ensure validation triggers

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full max-w-5xl mx-auto p-6 sm:p-8 rounded-xl"
      style={{
        backgroundColor: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >
      {children(methods)}
    </form>
  );
}
