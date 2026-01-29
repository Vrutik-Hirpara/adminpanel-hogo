import api from "./api";

// CREATE
export const createBlog = (data) => {
  return api.post("blogs/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// READ ALL
export const getBlogs = () => api.get("blogs/");

// UPDATE
export const updateBlog = (id, data) => {
  return api.patch(`blogs/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE
export const deleteBlog = (id) => api.delete(`blogs/${id}/`);
