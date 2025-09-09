import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateTransactionPayload,
  GetTransactionsPayload,
  ITransactionsList,
} from "./transaction.interface";
import { transactionApi } from "./transaction.gateway";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";

export function useGetTransactions(payload?: GetTransactionsPayload) {
  return useQuery<ITransactionsList>({
    queryKey: ["getTransactions", payload],
    queryFn: () => transactionApi.findAll(payload),
  });
}

export function useCreateTransaction() {
  const { t } = useTranslation();
  const basePath = "Transaction.Create";

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      transactionApi.create(payload),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({ type: "error", text: t(`${basePath}.Error`) });
    },
  });
}

export function useDeleteTransaction() {
  const { t } = useTranslation();
  const basePath = "Transaction.Delete";

  return useMutation({
    mutationFn: (id: number) => transactionApi.delete(id),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({ type: "error", text: t(`${basePath}.Error`) });
    },
  });
}
