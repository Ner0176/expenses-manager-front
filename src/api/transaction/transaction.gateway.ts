import {
  GetTransactionsPayload,
  CreateTransactionPayload,
  EditTransactionPayload,
} from "./transaction.interface";
import { axiosInstance } from "../axios-instance";

export const transactionApi = {
  findAll: async (payload?: GetTransactionsPayload) => {
    const response = await axiosInstance.get("/transaction", {
      params: payload,
    });
    return response.data;
  },
  create: async (payload: CreateTransactionPayload) => {
    await axiosInstance.post("/transaction/create", payload);
  },
  edit: async (id: number, payload: EditTransactionPayload) => {
    await axiosInstance.patch(`/transaction/edit/${id}`, payload);
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`/transaction/${id}`);
  },
};
