// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import BlogTableRow from "../components/table/BlogTableRow";

// import {
//   getBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } from "../services/blog.service";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import BlogViewCard from "../components/view/BlogViewCard";
// import EntityForm from "../components/form/EntityForm";

// export default function Blogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   const fetchBlogs = async () => {
//     const res = await getBlogs();
//     setBlogs(res.data.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

//       formData.append("title", data.title);
//       formData.append("shortcontent", data.shortcontent);
//       formData.append("content", data.content);
//       formData.append("date", data.date);
//       formData.append("month", data.month);
//       formData.append("tag", data.tag);

//       if (data.image && data.image[0] instanceof File) {
//         formData.append("image", data.image[0]);
//       }

//       if (selectedBlog) {
//         await updateBlog(selectedBlog.id, formData);
//       } else {
//         await createBlog(formData);
//       }

//       setMode("list");
//       fetchBlogs();
//     } catch (err) {
//       console.log("BLOG SAVE ERROR:", err.response?.data);
//     }
//   };

//   /* LIST */
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Blogs" />
//           <ActionButtons showAdd addText="+ Add Blog" onAdd={() => setMode("form")} />
//         </div>

//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Image",
//                 "Title",
//                 "Short Content",
//                 "Content",
//                 "Tag",
//                 "Month",
//                 "Date",
//                 "Action",
//               ]}
//             />
//           }
//         >
//           {blogs.map((b) => (
//             <BlogTableRow
//               key={b.id}
//               row={b}
//               onView={() => { setSelectedBlog(b); setMode("view"); }}
//               onEdit={() => { setSelectedBlog(b); setMode("form"); }}
//               onDelete={() => deleteBlog(b.id).then(fetchBlogs)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   /* VIEW */
//   if (mode === "view" && selectedBlog) {
//     return (
//       <EntityPageLayout title="Blog Details" showBack onBack={() => setMode("list")}>
//         <BlogViewCard blog={selectedBlog} />
//       </EntityPageLayout>
//     );
//   }

//   /* FORM */
//   return (
//     <EntityPageLayout title="Blog Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedBlog ? "Edit Blog" : "Create Blog"}
//         selectedItem={selectedBlog}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Title", name: "title", required: true },
//           { label: "Short Content", name: "shortcontent", type: "textarea" },
//           { label: "Full Content", name: "content", type: "textarea" },
//           { label: "Date", name: "date", type: "date" },
//           { label: "Month", name: "month" },
//           { label: "Tag", name: "tag" },
//           { label: "Image", name: "image", type: "file" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }



