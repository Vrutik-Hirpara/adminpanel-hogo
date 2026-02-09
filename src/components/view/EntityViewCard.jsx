
// import { useState } from "react";
// import ActionButtons from "../form/ActionButton";
// import EntityForm from "../form/EntityForm";
// import api from "../../services/api";  // adjust path if needed

// export default function EntityViewCard({
//   title,
//   data = {},
//   fields = [],
//   api,
//   headerKeys = [],   // ⭐ ADD THIS
  
//   onUpdated,
//   onDeleted,
// }) {

//   const [editMode, setEditMode] = useState(false);
// const BASE_URL = api.defaults.baseURL?.replace(/\/$/, "");

//   const handleDelete = async () => {
//     if (!data?.id) return;
//     if (!window.confirm(`Delete this ${title}?`)) return;

//     await api.delete(data.id);
//     onDeleted?.();
//   };

//   const handleUpdate = async (formData) => {
//     if (!data?.id) return;

//     await api.update(data.id, formData);
//     setEditMode(false);
//     onUpdated?.();
//   };

//   if (editMode) {
//     return (
//       <EntityForm
//         title={`Edit ${title}`}
//         initialData={data}
//         onSubmit={handleUpdate}
//         onCancel={() => setEditMode(false)}
//       />
//     );
//   }


//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

//       {/* 🔴 HEADER */}
//       <div className="bg-red-600 text-white p-5">
//         <h2 className="text-xl font-bold">
//           {headerKeys.length
//             ? headerKeys.map(k => data?.[k]).filter(Boolean).join(" - ")
//             : title}
//         </h2>
//         <p className="text-sm opacity-90">{title}</p>
//       </div>


//       {/* 📋 DETAILS */}
//       <div className="p-6 space-y-5">
//         {fields.map((field) => (
//           <div key={field.key}>
//             <p className="text-sm text-gray-500">{field.label}</p>
//            <div className="font-semibold text-gray-900">
//   {(() => {
//     const value = data?.[field.key];
//     if (!value) return "-";

//     const fullUrl =
//       typeof value === "string" && !value.startsWith("http")
//         ? `${BASE_URL}${value}`
//         : value;

//     // 🖼 Image preview
//     if (typeof fullUrl === "string" && /\.(jpg|jpeg|png|webp)$/i.test(fullUrl)) {
//       return (
//         <img
//           src={fullUrl}
//           alt={field.label}
//           className="h-24 rounded-lg border mt-1"
//         />
//       );
//     }

//     // 📄 Document link
//     if (typeof fullUrl === "string" && /\.(pdf|doc|docx)$/i.test(fullUrl)) {
//       return (
//         <a
//           href={fullUrl}
//           target="_blank"
//           rel="noreferrer"
//           className="text-blue-600 underline"
//         >
//           View Document
//         </a>
//       );
//     }

//     return field.format ? field.format(value) : value;
//   })()}
// </div>


//           </div>
//         ))}
//       </div>

//       {/* ⚙ ACTIONS */}
//       <div className="p-5 border-t flex justify-end gap-3 bg-gray-50">
//         <ActionButtons
//           onEdit={() => setEditMode(true)}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );

// }

// import { useState } from "react";
// import ActionButtons from "../form/ActionButton";
// import EntityForm from "../form/EntityForm";
// import apiClient from "../../services/api"; // axios instance

// export default function EntityViewCard({
//   title,
//   data = {},
//   fields = [],
//   api,
//   headerKeys = [],
//   onUpdated,
//   onDeleted,
// }) {
//   const [editMode, setEditMode] = useState(false);

//   // 🔥 Get base URL from axios config
//   const BASE_URL = apiClient.defaults.baseURL.replace(/\/$/, "");

//   // 🔥 Safe URL builder
//   // const buildUrl = (path) => {
//   //   if (!path) return null;
//   //   if (path.startsWith("http")) return path;

//   //   const cleanPath = path.startsWith("/") ? path : `/${path}`;
//   //   return `${BASE_URL}${cleanPath}`;
//   // };
//   // 🔥 Safe URL builder (never crashes)
// const buildUrl = (path) => {
//   if (!path || typeof path !== "string") return null;

//   // Already full URL
//   if (path.startsWith("http")) return path;

//   const cleanPath = path.startsWith("/") ? path : `/${path}`;
//   return `${BASE_URL}${cleanPath}`;
// };

//   const handleDelete = async () => {
//     if (!data?.id) return;
//     if (!window.confirm(`Delete this ${title}?`)) return;

//     await api.delete(data.id);
//     onDeleted?.();
//   };

//   const handleUpdate = async (formData) => {
//     if (!data?.id) return;

//     await api.update(data.id, formData);
//     setEditMode(false);
//     onUpdated?.();
//   };

//   if (editMode) {
//     return (
//       <EntityForm
//         title={`Edit ${title}`}
//         initialData={data}
//         onSubmit={handleUpdate}
//         onCancel={() => setEditMode(false)}
//       />
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
//       {/* 🔴 HEADER */}
//       <div className="bg-red-600 text-white p-5">
//         <h2 className="text-xl font-bold">
//           {headerKeys.length
//             ? headerKeys.map(k => data?.[k]).filter(Boolean).join(" - ")
//             : title}
//         </h2>
//         <p className="text-sm opacity-90">{title}</p>
//       </div>

//       {/* 📋 DETAILS */}
//       <div className="p-6 space-y-5">
//         {fields.map((field) => {
//           const value = data?.[field.key];
//           const fullUrl = buildUrl(value);

//           return (
//             <div key={field.key}>
//               <p className="text-sm text-gray-500">{field.label}</p>

//               <div className="font-semibold text-gray-900">
//                 {(() => {
//                   if (!value) return "Inactive";

//                   // 🖼 Image preview
//                   if (typeof fullUrl === "string" && /\.(jpg|jpeg|png|webp)$/i.test(fullUrl)) {
//                     return (
//                       <img
//                         src={fullUrl}
//                         alt={field.label}
//                         className="h-24 rounded-lg border mt-1"
//                       />
//                     );
//                   }

//                   // 📄 Document link
//                   if (typeof fullUrl === "string" && /\.(pdf|doc|docx)$/i.test(fullUrl)) {
//                     return (
//                       <a
//                         href={fullUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View Document
//                       </a>
//                     );
//                   }

//                   return field.format ? field.format(value) : value;
//                 })()}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ⚙ ACTIONS */}
//       <div className="p-5 border-t flex justify-end gap-3 bg-gray-50">
//         <ActionButtons
//           onEdit={() => setEditMode(true)}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import ActionButtons from "../form/ActionButton";
import EntityForm from "../form/EntityForm";
import apiClient from "../../services/api";

export default function EntityViewCard({
  title,
  data = {},
  fields = [],
  api,
  headerKeys = [],
  onUpdated,
  onDeleted,
  emptyText = "inactive", // 🔥 customizable empty text
}) {
  const [editMode, setEditMode] = useState(false);

  const BASE_URL = apiClient.defaults.baseURL.replace(/\/$/, "");

  const buildUrl = (path) => {
    if (!path || typeof path !== "string") return null;
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const handleDelete = async () => {
    if (!data?.id) return;
    if (!window.confirm(`Delete this ${title}?`)) return;
    await api.delete(data.id);
    onDeleted?.();
  };

  const handleUpdate = async (formData) => {
    await api.update(data.id, formData);
    setEditMode(false);
    onUpdated?.();
  };

  if (editMode) {
    return (
      <EntityForm
        title={`Edit ${title}`}
        initialData={data}
        onSubmit={handleUpdate}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  // 🔥 SPLIT LEFT / RIGHT
  const leftFields = fields.filter(f => f.column !== "right");
  const rightFields = fields.filter(f => f.column === "right");

  const renderField = (field) => {
    const value = data?.[field.key];
    const fullUrl = buildUrl(value);

    return (
      <div key={field.key}>
        <p className="text-sm text-gray-500">{field.label}</p>
        <div className="font-semibold text-gray-900">
          {(() => {
            if (!value) return emptyText;

            if (typeof fullUrl === "string" && /\.(jpg|jpeg|png|webp)$/i.test(fullUrl)) {
              return <img src={fullUrl} className="h-28 rounded-lg border mt-1" />;
            }

            if (typeof fullUrl === "string" && /\.(pdf|doc|docx)$/i.test(fullUrl)) {
              return <a href={fullUrl} target="_blank" className="text-blue-600 underline">View Document</a>;
            }

            return field.format ? field.format(value) : value;
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

      {/* 🔴 HEADER */}
      <div className="bg-red-600 text-white p-5">
        <h2 className="text-xl font-bold">
          {headerKeys.length
            ? headerKeys.map(k => data?.[k]).filter(Boolean).join(" - ")
            : title}
        </h2>
        <p className="text-sm opacity-90">{title}</p>
      </div>

      {/* 📋 GRID */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        <div className="space-y-5">{leftFields.map(renderField)}</div>
        <div className="space-y-5">{rightFields.map(renderField)}</div>
      </div>

      {/* ⚙ ACTIONS */}
      <div className="p-5 border-t flex justify-end gap-3 bg-gray-50">
        <ActionButtons onEdit={() => setEditMode(true)} onDelete={handleDelete} />
      </div>
    </div>
  );
}
