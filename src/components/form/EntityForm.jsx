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
//         const { register, reset } = methods;

//         useEffect(() => {
//           if (selectedItem) reset(selectedItem);
//           else {
//             const empty = {};
//             fields.forEach(f => empty[f.name] = "");
//             reset(empty);
//           }
//         }, [selectedItem, reset]);

//         return (
//           <FormContainer title={title}>
//       {fields.map((field) => {
//   /* TEXTAREA */
//   if (field.type === "textarea") {
//     return (
//       <div key={field.name} className="mt-6">
//         <FormTextarea
//           label={field.label}
//           name={field.name}
//           register={register}
//         />
//       </div>
//     );
//   }

//   /* SELECT */
//   if (field.type === "select") {
//     return (
//       <div key={field.name} className="mt-6">
//         <FormSelect
//           label={field.label}
//           name={field.name}
//           register={register}
//           options={field.options}
//         />
//       </div>
//     );
//   }

//   /* 🔥 FILE INPUT (IMAGE UPLOAD) */
// if (field.type === "file") {
//   return (
//     <div key={field.name} className="mt-6 flex flex-col gap-2">
//       <label className="text-sm font-medium text-gray-700">
//         {field.label}
//       </label>

//       {/* IMAGE PREVIEW */}
//       {selectedItem?.image && (
//         <img
//           src={`https://hogofilm.pythonanywhere.com${selectedItem.image}`}
//           alt="preview"
//           className="h-20 w-28 object-cover rounded border"
//         />
//       )}

//       {/* CUSTOM FILE INPUT */}
//       <label className="flex items-center gap-4">
//         <span
//           className="px-4 py-2 rounded text-white cursor-pointer"
//           style={{ backgroundColor: "#dc2626" }}
//         >
//           Choose Image
//         </span>

//         <span className="text-sm text-gray-500">
//           {methods.watch(field.name)?.[0]?.name || "No file chosen"}
//         </span>

//         <input
//           type="file"
//           {...register(field.name)}
//           className="hidden"
//         />
//       </label>
//     </div>
//   );
// }



//   /* DEFAULT INPUT */
//   return (
//     <div key={field.name} className="mt-6">
//       <FormInput
//         label={field.label}
//         name={field.name}
//         type={field.type || "text"}
//         register={register}
//         required={field.required}
//       />
//     </div>
//   );
// })}


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
//         const { register, reset, watch } = methods;

//         /* 🔁 Reset Form */
//         useEffect(() => {
//           if (selectedItem) {
//             const data = { ...selectedItem };
//             delete data.image; // ⚠️ Prevent image reset issue
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
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               {fields.map((field) => {
//                 /* TEXTAREA */
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

//                 /* SELECT */
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

//                 /* FILE INPUT */
//                 if (field.type === "file") {
//                   const previewUrl = selectedItem?.image
//                     ? `${api.defaults.baseURL}${selectedItem.image}`
//                     : null;

//                   return (
//                     <div key={field.name} className="flex flex-col gap-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         {field.label}
//                       </label>

//                       {/* IMAGE PREVIEW */}
//                       {previewUrl && (
//                         <img
//                           src={previewUrl}
//                           alt="preview"
//                           className="h-20 w-28 object-cover rounded border"
//                         />
//                       )}

//                       {/* FILE BUTTON */}
//                       <label className="flex items-center gap-4">
//                         <span className="px-4 py-2 rounded text-white bg-red-600 cursor-pointer">
//                           Choose Image
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

//                 /* DEFAULT INPUT */
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
import api from "../../services/api"; // adjust path

const baseURL = api.defaults.baseURL;
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
        const { register, reset, watch } = methods;

        /* 🔁 RESET FORM DATA */
        useEffect(() => {
          if (selectedItem) {
            const data = { ...selectedItem };
            fields.forEach(f => {
              if (f.type === "file") delete data[f.name]; // prevent file reset bug
            });
            reset(data);
          } else {
            const empty = {};
            fields.forEach((f) => (empty[f.name] = ""));
            reset(empty);
          }
        }, [selectedItem, reset, fields]);

        return (
          <FormContainer title={title}>
            {/* 🔥 RESPONSIVE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {fields.map((field) => {

                /* 🔹 TEXTAREA */
                if (field.type === "textarea") {
                  return (
                    <div key={field.name}>
                      <FormTextarea
                        label={field.label}
                        name={field.name}
                        register={register}
                      />
                    </div>
                  );
                }

                /* 🔹 SELECT */
                if (field.type === "select") {
                  return (
                    <div key={field.name}>
                      <FormSelect
                        label={field.label}
                        name={field.name}
                        register={register}
                        options={field.options}
                      />
                    </div>
                  );
                }

                /* 🔹 FILE INPUT WITH PREVIEW */
            /* 🔹 FILE INPUT WITH SIDE PREVIEW */
// if (field.type === "file") {
//   const existingFile = selectedItem?.[field.name];

//   return (
//     <div key={field.name} className="flex items-center gap-4">

//       {/* LEFT SIDE: FILE INPUT */}
//       <div className="flex flex-col flex-1">
//         <label className="text-sm font-medium text-gray-700 mb-1">
//           {field.label}
//         </label>

//         <label className="flex items-center gap-3">
//           <span className="px-4 py-2 rounded text-white bg-red-600 cursor-pointer">
//             Choose File
//           </span>

//           <span className="text-sm text-gray-500">
//             {watch(field.name)?.[0]?.name || "No file chosen"}
//           </span>

//           <input
//             type="file"
//             {...register(field.name)}
//             className="hidden"
//           />
//         </label>
//       </div>

//       {/* RIGHT SIDE: EXISTING IMAGE */}
//       {existingFile && (
//         <img
// src={`${baseURL}${existingFile}`}
//           alt={field.label}
//           className="h-16 w-16 object-cover rounded border shadow"
//         />
//       )}
//     </div>
//   );
// }


/* 🔹 FILE INPUT WITH TOP PREVIEW */
if (field.type === "file") {
  const existingFile = selectedItem?.[field.name];

  return (
    <div key={field.name} className="flex flex-col gap-2">

      {/* LABEL */}
      <label className="text-sm font-medium text-gray-700">
        {field.label}
      </label>

      {/* 🖼 IMAGE ON TOP */}
      {existingFile && (
        <img
          src={`${api.defaults.baseURL}${existingFile}`}
          alt={field.label}
          className="h-24 w-24 object-cover rounded border shadow"
        />
      )}

      {/* FILE BUTTON */}
      <label className="flex items-center gap-3">
        <span className="px-4 py-2 rounded text-white bg-red-600 cursor-pointer">
          Choose File
        </span>

        <span className="text-sm text-gray-500">
          {watch(field.name)?.[0]?.name || "No file chosen"}
        </span>

        <input
          type="file"
          {...register(field.name)}
          className="hidden"
        />
      </label>
    </div>
  );
}


                /* 🔹 DEFAULT INPUT */
                return (
                  <div key={field.name}>
                    <FormInput
                      label={field.label}
                      name={field.name}
                      type={field.type || "text"}
                      register={register}
                      required={field.required}
                    />
                  </div>
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
