import Icon from "@mdi/react";
import { useState } from "react";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { CreateTransaction, TransactionDetails } from "../transaction";
import { ITransaction, useGetTransactions } from "../../api";
import { ICON_MAP } from "../category";
import { mdiCurrencyUsd, mdiFilterVariant, mdiPlus } from "@mdi/js";
import { ActionIcon } from "./history.content";

export const HistoryDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showCreateModal = searchParams.get("modal") === "create";
  const showTransaction = searchParams.get("modal") === "transaction";

  const [currentTransaction, setCurrentTransaction] = useState<ITransaction>();

  const { data: transactions } = useGetTransactions();

  const handleViewTx = (transaction: ITransaction) => {
    searchParams.set("modal", "transaction");
    setSearchParams(searchParams);
    setCurrentTransaction(transaction);
  };

  const handleCreateTx = () => {
    searchParams.set("modal", "create");
    setSearchParams(searchParams);
  };

  const handleCloseModal = () => {
    searchParams.delete("modal");
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="flex flex-col gap-5 size-full pt-3.5">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-3xl">
              {transactions?.totalGeneral}€
            </span>
            <span className="text-sm">Total gastado</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
            <ActionIcon
              text={"Moneda"}
              onClick={() => {}}
              icon={mdiCurrencyUsd}
            />
            <ActionIcon
              icon={mdiPlus}
              text={"Añadir gasto"}
              onClick={handleCreateTx}
            />
            <ActionIcon
              text={"Filtros"}
              onClick={() => {}}
              icon={mdiFilterVariant}
            />
          </div>
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
                    const { title, amount, description, category } =
                      transaction;
                    return (
                      <div
                        className="flex flex-row items-center gap-3 hover:bg-neutral-50 px-4 py-2 cursor-pointer"
                        onClick={() => handleViewTx(transaction)}
                      >
                        <div className="rounded-full border border-neutral-200 p-2">
                          <Icon
                            path={ICON_MAP[category.icon]}
                            className="size-5 text-neutral-400"
                          />
                        </div>
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
      {!!showCreateModal && (
        <CreateTransaction handleClose={handleCloseModal} />
      )}
      {!!showTransaction && !!currentTransaction && (
        <TransactionDetails
          handleClose={handleCloseModal}
          transaction={currentTransaction}
        />
      )}
    </>
  );
};
