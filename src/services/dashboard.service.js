import api from "./api";

const safeArr = (res) => res.data?.data || res.data || [];

export const getDashboardStats = async () => {
  const [categories, donations, officebranches, contacts] = await Promise.all([
    api.get("/categories/"),
    api.get("/roles/"),
    api.get("/officebranches/"),
    api.get("/contact/"),
  ]);

  return {
    categories: safeArr(categories),
    roles: safeArr(roles),
    officebranches: safeArr(officebranches),
    contacts: safeArr(contacts),
  };
};
