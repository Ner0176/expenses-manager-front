import { axiosInstance } from "../axios-instance";
import { CreateCategoryPayload } from "./create-category.interface";

export const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/category");
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await axiosInstance.get(`/category/${id}`);
    return response.data;
  },
  create: async (payload: CreateCategoryPayload) => {
    await axiosInstance.post("/category", payload);
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`/category/${id}`);
  },
};
