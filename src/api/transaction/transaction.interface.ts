import { ICategory } from "../category";

export interface CreateTransactionPayload {
  title: string;
  amount: number;
  currency: string;
  categoryId: number;
  description?: string;
}

export interface EditTransactionPayload {
  title?: string;
  amount?: number;
  currency?: string;
  categoryId?: number;
  description?: string;
}

export interface GetTransactionsPayload {
  endDate?: Date;
  startDate?: Date;
  categoryId?: number;
}

export interface ITransaction {
  id: number;
  date: Date;
  title: string;
  amount: number;
  currency: string;
  category: ICategory;
  description: string;
  conversionRate?: number;
}

export interface ITransactionsList {
  totalGeneral: number;
  list: { total: number; transactions: ITransaction[] }[];
}
