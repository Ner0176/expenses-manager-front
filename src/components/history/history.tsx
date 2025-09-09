import { useState } from "react";
import { CustomSelect } from "../base";
import { ITransaction, useGetTransactions } from "../../api";
import { useSearchParams } from "react-router-dom";
import { TransactionDetails } from "../transaction";
import { format } from "date-fns";

export const HistoryDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showTransaction = searchParams.get("modal") === "transaction";

  const [currentTransaction, setCurrentTransaction] = useState<ITransaction>();

  const { data: transactions } = useGetTransactions();

  const handleViewTransaction = (transaction: ITransaction) => {
    searchParams.set("modal", "transaction");
    setSearchParams(searchParams);
    setCurrentTransaction(transaction);
  };

  return (
    <>
      <div className="flex flex-col gap-5 size-full pt-3.5">
        <div className="flex flex-row w-full justify-end gap-3 px-4">
          <CustomSelect
            options={[
              { text: "Hola", value: "Hola" },
              { text: "Adéu", value: "Xao" },
            ]}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold text-3xl">1100€</span>
          <span className="text-sm">Total gastado</span>
        </div>
        <div className="flex flex-col gap-3 h-fit overflow-y-auto">
          {transactions?.list.map(({ total, transactions }) => {
            const date = format(new Date(transactions[0].date), "dd/MM/yyyy");
            return (
              <div key={date} className="flex flex-col gap-1 px-4 last:pb-3.5">
                <div className="flex justify-between">
                  <span className="font-bold text-sm">{date}</span>
                  <span className="text-xs text-neutral-600">{total}€</span>
                </div>
                <div className="flex flex-col rounded-2xl border border-neutral-200 w-full overflow-hidden">
                  {transactions.map((transaction) => {
                    const { title, amount, description } = transaction;
                    return (
                      <div
                        className="flex flex-row items-center gap-3 hover:bg-neutral-50 px-4 py-2 cursor-pointer"
                        onClick={() => handleViewTransaction(transaction)}
                      >
                        <div className="rounded-full border border-neutral-200 p-3" />
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm">{title}</span>
                            {!!description && (
                              <span className="text-xs">{description}</span>
                            )}
                          </div>
                          <span className="text-sm">{amount}€</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {!!showTransaction && !!currentTransaction && (
        <TransactionDetails transaction={currentTransaction} />
      )}
    </>
  );
};
