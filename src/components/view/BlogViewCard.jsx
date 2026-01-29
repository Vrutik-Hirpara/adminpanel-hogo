// import { themes } from "../../config/theme.config";

// export default function BlogViewCard({ blog }) {
//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       <div
//         className="rounded-xl overflow-hidden"
//         style={{
//           border: `1px solid ${themes.backgroundGray}`,
//           backgroundColor: themes.textWhite,
//           fontFamily: themes.fontPrimary,
//         }}
//       >
//         {/* 🔴 RED HEADER */}
//         <div
//           className="px-6 py-4"
//           style={{
//             backgroundColor: themes.primary,
//             color: themes.textWhite,
//           }}
//         >
//           <h3 className="text-lg font-semibold">{blog.title}</h3>
//           <p className="text-sm opacity-90">{blog.tag}</p>
//         </div>

//         {/* BODY */}
//         <div className="p-6 space-y-6 text-sm">

//           {/* 🖼 IMAGE */}
//           {blog.image && (
//             <div className="flex justify-center">
//               <img
//                 src={`https://hogofilm.pythonanywhere.com${blog.image}`}
//                 alt="blog"
//                 className="w-full max-w-md h-52 object-cover rounded-lg border"
//               />
//             </div>
//           )}

//           <Detail label="Date" value={blog.date} />
//           <Detail label="Month" value={blog.month} />
//           <Detail label="Short Content" value={blog.shortcontent} />
//           <Detail label="Full Content" value={blog.content} />

//         </div>
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1 text-gray-500">{label}</p>
//       <p className="text-sm text-gray-800">{value || "-"}</p>
//     </div>
//   );
// }








// import { themes } from "../../config/theme.config";
// import api from "../../services/api";   // ⭐ import API base

// export default function BlogViewCard({ blog }) {
//   const imageUrl = blog.image ? `${api.defaults.baseURL}${blog.image}` : null;

//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       <div
//         className="rounded-xl overflow-hidden"
//         style={{
//           border: `1px solid ${themes.backgroundGray}`,
//           backgroundColor: themes.textWhite,
//           fontFamily: themes.fontPrimary,
//         }}
//       >
//         {/* 🔴 HEADER */}
//         <div
//           className="px-6 py-4"
//           style={{
//             backgroundColor: themes.primary,
//             color: themes.textWhite,
//           }}
//         >
//           <h3 className="text-lg font-semibold">{blog.title}</h3>
//           <p className="text-sm opacity-90">{blog.tag}</p>
//         </div>

//         {/* BODY */}
//         <div className="p-6 space-y-6 text-sm">

//           {/* 🖼 IMAGE */}
//           {imageUrl && (
//             <div className="flex justify-center">
//               <img
//                 src={imageUrl}
//                 alt="blog"
//                 className="w-full max-w-sm h-40 object-cover rounded-lg border"
//               />
//             </div>
//           )}

//           <Detail label="Date" value={blog.date} />
//           <Detail label="Month" value={blog.month} />
//           <Detail label="Short Content" value={blog.shortcontent} />
//           <Detail label="Full Content" value={blog.content} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1 text-gray-500">{label}</p>
//       <p className="text-sm text-gray-800">{value || "-"}</p>
//     </div>
//   );
// }






import { themes } from "../../config/theme.config";
import api from "../../services/api";

export default function BlogViewCard({ blog }) {
  const imageUrl = blog.image ? `${api.defaults.baseURL}${blog.image}` : null;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-0 max-w-5xl mx-auto">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${themes.backgroundGray}`,
          backgroundColor: themes.textWhite,
          fontFamily: themes.fontPrimary,
        }}
      >
        {/* HEADER */}
        <div
          className="px-4 sm:px-6 py-4"
          style={{
            backgroundColor: themes.primary,
            color: themes.textWhite,
          }}
        >
          <h3 className="text-base sm:text-lg font-semibold">{blog.title}</h3>
          <p className="text-xs sm:text-sm opacity-90">{blog.tag}</p>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 space-y-5 text-sm">

          {imageUrl && (
            <div className="flex justify-center">
              <img
                src={imageUrl}
                alt="blog"
                className="w-full max-w-xs sm:max-w-sm h-36 sm:h-48 object-cover rounded-lg border"
              />
            </div>
          )}

          <Detail label="Date" value={blog.date} />
          <Detail label="Month" value={blog.month} />
          <Detail label="Short Content" value={blog.shortcontent} />
          <Detail label="Full Content" value={blog.content} />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-800 break-words">{value || "-"}</p>
    </div>
  );
}
