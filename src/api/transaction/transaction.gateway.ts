import axios from "axios";
import {
  GetTransactionsPayload,
  CreateTransactionPayload,
} from "./transaction.interface";

export const transactionApi = {
  findAll: async (payload?: GetTransactionsPayload) => {
    const response = await axios.get("/transaction", { params: payload });
    return response.data;
  },
  create: async (payload: CreateTransactionPayload) => {
    await axios.post("/transaction", payload);
  },
  delete: async (id: number) => {
    await axios.delete(`/transaction/${id}`);
  },
};
