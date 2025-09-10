import { ICategory } from "../category";

export interface CreateTransactionPayload {
  title: string;
  amount: number;
  currency: string;
  categoryId: number;
  description?: string;
}

export interface GetTransactionsPayload {
  categoryId: number;
}

export interface ITransaction {
  date: Date;
  title: string;
  amount: number;
  category: ICategory;
  description: string;
}

export interface ITransactionsList {
  totalGeneral: number;
  list: { total: number; transactions: ITransaction[] }[];
}
