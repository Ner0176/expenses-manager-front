import {
  GetTransactionsPayload,
  CreateTransactionPayload,
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
  delete: async (id: number) => {
    await axiosInstance.delete(`/transaction/${id}`);
  },
};
