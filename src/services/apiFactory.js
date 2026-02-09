import api from "./api";

/* Detect FormData automatically */
const withFormCheck = (data) => {
  const isForm = data instanceof FormData;
  return {
    body: data,
    config: isForm ? { headers: { "Content-Type": "multipart/form-data" } } : {},
  };
};

export const createCRUD = (endpoint) => ({
  getAll: () => api.get(`${endpoint}/`),

  getById: (id) => api.get(`${endpoint}/${id}/`),

  create: (data) => {
    const { body, config } = withFormCheck(data);
    return api.post(`${endpoint}/`, body, config);
  },

  update: (id, data) => {
    const { body, config } = withFormCheck(data);
    return api.patch(`${endpoint}/${id}/`, body, config);
  },

  delete: (id) => api.delete(`${endpoint}/${id}/`),
});
