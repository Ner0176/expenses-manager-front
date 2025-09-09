export interface CreateTransactionPayload {
  date: Date;
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
  category: string;
  description: string;
}

export interface ITransactionsList {
  total: number;
  list: { total: number; transactions: ITransaction[] }[];
}
