


// import { useEffect } from "react";
// import FormWrapper from "../form/FormWrapper";
// import FormContainer from "../form/FormContainer";
// import FormInput from "../form/FormInput";
// import FormSelect from "../form/FormSelect";
// import FormTextarea from "../form/FormTextarea";
// import FormActions from "../form/FormActions";
// import api from "../../services/api"; // adjust path

// const baseURL = api.defaults.baseURL;
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
//         const { register, reset, watch } = methods;

//         /* 🔁 RESET FORM DATA */
//         useEffect(() => {
//           if (selectedItem) {
//             const data = { ...selectedItem };
//             fields.forEach(f => {
//               if (f.type === "file") delete data[f.name]; // prevent file reset bug
//             });
//             reset(data);
//           } else {
//             const empty = {};
//             fields.forEach((f) => (empty[f.name] = ""));
//             reset(empty);
//           }
//         }, [selectedItem, reset, fields]);

//         return (
//           <FormContainer title={title}>
//             {/* 🔥 RESPONSIVE GRID */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {fields.map((field) => {

//                 /* 🔹 TEXTAREA */
//                 if (field.type === "textarea") {
//                   return (
//                     <div key={field.name}>
//                       <FormTextarea
//                         label={field.label}
//                         name={field.name}
//                         register={register}
//                       />
//                     </div>
//                   );
//                 }

//                 /* 🔹 SELECT */
//                 if (field.type === "select") {
//                   return (
//                     <div key={field.name}>
//                       <FormSelect
//                         label={field.label}
//                         name={field.name}
//                         register={register}
//                         options={field.options}
//                       />
//                     </div>
//                   );
//                 }
//                 /* 🔹 CHECKBOX */
//                 if (field.type === "checkbox") {
//                   return (
//                     <div key={field.name} className="flex items-center gap-3 mt-2">
//                       <input
//                         type="checkbox"
//                         {...register(field.name)}
//                         className="h-4 w-4"
//                       />
//                       <label className="text-sm font-medium text-gray-700">
//                         {field.label}
//                       </label>
//                     </div>
//                   );
//                 }

//                 /* 🔹 FILE INPUT WITH TOP PREVIEW */
//                 if (field.type === "file") {
//                   const existingFile = selectedItem?.[field.name];

//                   return (
//                     <div key={field.name} className="flex flex-col gap-2">

//                       {/* LABEL */}
//                       <label className="text-sm font-medium text-gray-700">
//                         {field.label}
//                       </label>


//                       {existingFile && (
//                         <img
//                           src={
//                             existingFile.startsWith("http")
//                               ? existingFile
//                               : `${api.defaults.baseURL}${existingFile}`
//                           }
//                           alt={field.label}
//                           className="h-24 w-24 object-cover rounded border shadow"
//                         />
//                       )}


//                       {/* FILE BUTTON */}
//                       <label className="flex items-center gap-3">
//                         <span className="px-4 py-2 rounded text-white bg-red-600 cursor-pointer">
//                           Choose File
//                         </span>

//                         <span className="text-sm text-gray-500">
//                           {watch(field.name)?.[0]?.name || "No file chosen"}
//                         </span>

//                         <input
//                           type="file"
//                           {...register(field.name)}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   );
//                 }


//                 /* 🔹 DEFAULT INPUT */
//                 return (
//                   <div key={field.name}>
//                     <FormInput
//                       label={field.label}
//                       name={field.name}
//                       type={field.type || "text"}
//                       register={register}
//                       required={field.required}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* ACTION BUTTONS */}
//             <FormActions onCancel={() => setMode("list")} />
//           </FormContainer>
//         );
//       }}
//     </FormWrapper>
//   );
// }

// import { useEffect } from "react";
// import FormWrapper from "../form/FormWrapper";
// import FormContainer from "../form/FormContainer";
// import FormInput from "../form/FormInput";
// import FormSelect from "../form/FormSelect";
// import FormTextarea from "../form/FormTextarea";
// import FormActions from "../form/FormActions";
// import api from "../../services/api";

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
//           watch,
//           formState: { errors },   // ⭐ ADD THIS
//         } = methods;

//         /* 🔁 RESET FORM DATA */
//         useEffect(() => {
//           if (selectedItem) {
//             const data = { ...selectedItem };
//             fields.forEach(f => {
//               if (f.type === "file") delete data[f.name];
//             });
//             reset(data);
//           } else {
//             const empty = {};
//             fields.forEach((f) => (empty[f.name] = ""));
//             reset(empty);
//           }
//         }, [selectedItem, reset, fields]);

//         return (
//           <FormContainer title={title}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {fields.map((field) => {

//                 /* 🔹 TEXTAREA */
//                 if (field.type === "textarea") {
//                   return (
//                     <FormTextarea
//                       key={field.name}
//                       label={field.label}
//                       name={field.name}
//                       register={register}
//                       // rules={{ required: field.required ? "This field is required" : false }}
//                       rules={{
//                         required:
//                           field.required || field.name === "status"
//                             ? "This field is required"
//                             : false,
//                       }}

//                       error={errors[field.name]}
//                     />
//                   );
//                 }

//                 /* 🔹 SELECT */
//                 if (field.type === "select") {
//                   return (
//                     <FormSelect
//                       key={field.name}
//                       label={field.label}
//                       name={field.name}
//                       options={field.options}
//                       register={register}
//                       // rules={{ required: field.required ? "This field is required" : false }}
//                       rules={{
//                         required:
//                           field.required || field.name === "status"
//                             ? "This field is required"
//                             : false,
//                       }}

//                       error={errors[field.name]}
//                     />
//                   );
//                 }

//                 /* 🔹 CHECKBOX */
//                 if (field.type === "checkbox") {
//                   return (
//                     <div key={field.name} className="flex items-center gap-3 mt-2">
//                       <input
//                         type="checkbox"
//                         {...register(field.name)}
//                         className="h-4 w-4"
//                       />
//                       <label className="text-sm font-medium text-gray-700">
//                         {field.label}
//                       </label>
//                     </div>
//                   );
//                 }

//                 /* 🔹 FILE INPUT */
//                 if (field.type === "file") {
//                   const existingFile = selectedItem?.[field.name];

//                   return (
//                     <div key={field.name} className="flex flex-col gap-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         {field.label}
//                       </label>

//                       {existingFile && (
//                         <img
//                           src={
//                             existingFile.startsWith("http")
//                               ? existingFile
//                               : `${api.defaults.baseURL}${existingFile}`
//                           }
//                           alt={field.label}
//                           className="h-24 w-24 object-cover rounded border shadow"
//                         />
//                       )}

//                       <label className="flex items-center gap-3">
//                         <span className="px-4 py-2 rounded text-white bg-red-600 cursor-pointer">
//                           Choose File
//                         </span>

//                         <span className="text-sm text-gray-500">
//                           {watch(field.name)?.[0]?.name || "No file chosen"}
//                         </span>

//                         <input
//                           type="file"
//                           {...register(field.name)}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   );
//                 }

//                 /* 🔹 DEFAULT INPUT */
//                 return (
//                   // <FormInput
//                   //   key={field.name}
//                   //   label={field.label}
//                   //   name={field.name}
//                   //   type={field.type || "text"}
//                   //   register={register}
//                   //   rules={{ required: field.required ? "This field is required" : false }}
//                   //   error={errors[field.name]}
//                   // />

//                   <FormInput
//                     key={field.name}
//                     label={field.label}
//                     name={field.name}
//                     type={field.type || "text"}
//                     register={register}
//                     rules={{
//                       required:
//                         field.required || field.name === "status"
//                           ? "This field is required"
//                           : false,
//                     }}
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


// import { useEffect } from "react";
// import FormWrapper from "../form/FormWrapper";
// import FormContainer from "../form/FormContainer";
// import FormInput from "../form/FormInput";
// import FormSelect from "../form/FormSelect";
// import FormTextarea from "../form/FormTextarea";
// import FormActions from "../form/FormActions";
// import api from "../../services/api";

// export default function EntityForm({ title, fields, selectedItem, onSubmit, setMode }) {
//   return (
// <FormWrapper onSubmit={(data) => onSubmit(data, methods)}>
//       {(methods) => {
// // const { register, reset, watch, setError, clearErrors, formState: { errors } } = methods;
// const {
//   register,
//   reset,
//   watch,
//   setError,
//   clearErrors,
//   formState: { errors }
// } = methods;


//         useEffect(() => {
//           if (selectedItem) {
//             const data = { ...selectedItem };
//             fields.forEach(f => { if (f.type === "file") delete data[f.name]; });
//             reset(data);
//           } else {
//             const empty = {};
//             fields.forEach(f => empty[f.name] = "");
//             reset(empty);
//           }
//         }, [selectedItem, reset, fields]);

//         const getRules = (field) => ({
//           required: field.required || field.name === "status"
//             ? `${field.label} is required`
//             : false,
//         });

//         return (
//           <FormContainer title={title}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {fields.map((field) => {
//                 if (field.type === "textarea")
//                   return <FormTextarea key={field.name} label={field.label} name={field.name} register={register} rules={getRules(field)} error={errors[field.name]} />;

//                 if (field.type === "select")
//                   return <FormSelect key={field.name} label={field.label} name={field.name} options={field.options} register={register} rules={getRules(field)} error={errors[field.name]} />;

//                 return <FormInput key={field.name} label={field.label} name={field.name} type={field.type || "text"} register={register} rules={getRules(field)} error={errors[field.name]} />;
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
          setError,
          clearErrors,
          formState: { errors },
        } = methods;

        useEffect(() => {
          if (selectedItem) {
            const data = { ...selectedItem };
            fields.forEach((f) => {
              if (f.type === "file") delete data[f.name];
            });
            reset(data);
          } else {
            const empty = {};
            fields.forEach((f) => (empty[f.name] = ""));
            reset(empty);
          }
        }, [selectedItem, reset, fields]);

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
                if (field.type === "textarea")
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

                if (field.type === "select")
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

            <FormActions onCancel={() => setMode("list")} />
          </FormContainer>
        );
      }}
    </FormWrapper>
  );
}
