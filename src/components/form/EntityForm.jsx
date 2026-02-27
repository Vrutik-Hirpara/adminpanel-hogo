
// import { useEffect } from "react";
// import FormWrapper from "../form/FormWrapper";
// import FormContainer from "../form/FormContainer";
// import FormInput from "../form/FormInput";
// import FormSelect from "../form/FormSelect";
// import FormTextarea from "../form/FormTextarea";
// import FormActions from "../form/FormActions";

// export default function EntityForm({
//   title,
//   fields,
//   selectedItem,
//   onSubmit,
//   setMode,
// }) {
//   return (
//     <FormWrapper onSubmit={onSubmit}>
//       {(methods) => {
//         const {
//           register,
//           reset,
//           setError,
//           clearErrors,
//           formState: { errors },
//         } = methods;

//         useEffect(() => {
//           if (selectedItem) {
//             const data = { ...selectedItem };
//             fields.forEach((f) => {
//               if (f.type === "file") delete data[f.name];
//             });
//             reset(data);
//           } else {
//             const empty = {};
//             fields.forEach((f) => (empty[f.name] = ""));
//             reset(empty);
//           }
//         }, [selectedItem, reset, fields]);

//         const getRules = (field) => ({
//           required:
//             field.required || field.name === "status"
//               ? `${field.label} is required`
//               : false,
//         });

//         return (
//           <FormContainer title={title}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {fields.map((field) => {
//                 if (field.type === "textarea")
//                   return (
//                     <FormTextarea
//                       key={field.name}
//                       label={field.label}
//                       name={field.name}
//                       register={register}
//                       rules={getRules(field)}
//                       error={errors[field.name]}
//                     />
//                   );

//                 if (field.type === "select")
//                   return (
//                     <FormSelect
//                       key={field.name}
//                       label={field.label}
//                       name={field.name}
//                       options={field.options}
//                       register={register}
//                       rules={getRules(field)}
//                       error={errors[field.name]}
//                     />
//                   );

//                 return (
//                   <FormInput
//                     key={field.name}
//                     label={field.label}
//                     name={field.name}
//                     type={field.type || "text"}
//                     register={register}
//                     rules={getRules(field)}
//                     error={errors[field.name]}
//                   />
//                 );
                
//               })}
//             </div>

//             <FormActions onCancel={() => setMode("list")} />
//           </FormContainer>
//         );
//       }}
//     </FormWrapper>
//   );
// }


import { useEffect } from "react";
import FormWrapper from "../form/FormWrapper";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTextarea from "../form/FormTextarea";
import FormActions from "../form/FormActions";

// 🔥 axios instance (baseURL માટે)
import api from "../../services/api";

export default function EntityForm({
  title,
  fields,
  selectedItem,
  onSubmit,
  setMode,
}) {
  return (
    <FormWrapper onSubmit={onSubmit}>
      {(methods) => {
        const {
          register,
          reset,
          formState: { errors },
        } = methods;

        // ================= RESET =================
        useEffect(() => {
          if (selectedItem) {
            const data = { ...selectedItem };

            // 🔥 file fields ને undefined set કર (delete નહીં)
            fields.forEach((f) => {
              if (f.type === "file") data[f.name] = undefined;
            });

            reset(data);
          } else {
            const empty = {};
            fields.forEach((f) => (empty[f.name] = ""));
            reset(empty);
          }
        }, [selectedItem, reset, fields]);

        // ================= VALIDATION =================
        const getRules = (field) => ({
          required:
            field.required || field.name === "status"
              ? `${field.label} is required`
              : false,
        });

        return (
          <FormContainer title={title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map((field) => {
                // ===== TEXTAREA =====
                if (field.type === "textarea") {
                  return (
                    <FormTextarea
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      register={register}
                      rules={getRules(field)}
                      error={errors[field.name]}
                    />
                  );
                }

                // ===== SELECT =====
                if (field.type === "select") {
                  return (
                    <FormSelect
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      options={field.options}
                      register={register}
                      rules={getRules(field)}
                      error={errors[field.name]}
                    />
                  );
                }

                // ===== FILE INPUT (🔥 WITH PREVIEW) =====
                if (field.type === "file") {
                  let imageUrl = null;

                  if (
                    selectedItem &&
                    field.previewKey &&
                    selectedItem[field.previewKey]
                  ) {
                    const raw = selectedItem[field.previewKey];

                    // full url કે relative path handle કર
                    imageUrl = raw.startsWith("http")
                      ? raw
                      : `${api.defaults.baseURL}${raw}`;
                  }

                  return (
                    <div key={field.name} className="flex flex-col gap-2">
                      <FormInput
                        label={field.label}
                        name={field.name}
                        type="file"
                        register={register}
                        rules={getRules(field)}
                        error={errors[field.name]}
                      />

                      {/* 🔥 Existing Image Preview */}
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="preview"
className="h-24 w-auto object-contain rounded border self-start"                        />
                      )}
                    </div>
                  );
                }

                // ===== DEFAULT INPUT =====
                return (
                  <FormInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    register={register}
                    rules={getRules(field)}
                    error={errors[field.name]}
                  />
                );
              })}
            </div>

            {/* ACTION BUTTONS */}
            <FormActions onCancel={() => setMode("list")} />
          </FormContainer>
        );
      }}
    </FormWrapper>
  );
}