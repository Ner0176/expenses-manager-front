import Icon from "@mdi/react";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateTransaction, TransactionDetails } from "../transaction";
import { ITransaction, useGetTransactions } from "../../api";
import { ICON_MAP } from "../category";
import { mdiCurrencyUsd, mdiFilterVariant, mdiPlus } from "@mdi/js";
import { ActionIcon } from "./history.content";
import { useTranslation } from "react-i18next";

export const HistoryDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const showCreateModal = searchParams.get("modal") === "create";
  const showTransaction = searchParams.get("modal") === "transaction";

  const [currentTransaction, setCurrentTransaction] = useState<ITransaction>();

  const { data: transactions, refetch } = useGetTransactions();

  const handleModal = (isOpen: boolean, path?: string) => {
    isOpen && path
      ? searchParams.set("modal", path)
      : searchParams.delete("modal");
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
            <span className="text-sm">{t("History.Total")}</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-8">
            <ActionIcon
              icon={mdiCurrencyUsd}
              text={t("History.Currency")}
              onClick={() => navigate("/settings")}
            />
            <ActionIcon
              icon={mdiPlus}
              text={t("History.AddTx")}
              onClick={() => handleModal(true, "create")}
            />
            <ActionIcon
              onClick={() => {}}
              icon={mdiFilterVariant}
              text={t("History.Filters")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 h-fit overflow-y-auto">
          {transactions?.list.map(({ total, transactions }) => {
            const date = format(new Date(transactions[0].date), "dd/MM/yyyy");
            return (
              <div key={date} className="flex flex-col gap-1 px-4 last:pb-3.5">
                <div className="flex justify-between px-2">
                  <span className="font-bold text-xs">{date}</span>
                  <span className="text-xs text-neutral-600">{total}€</span>
                </div>
                <div className="flex flex-col rounded-2xl border border-neutral-200 w-full overflow-hidden">
                  {transactions.map((transaction) => {
                    const { title, amount, description, category } =
                      transaction;
                    return (
                      <div
                        className="flex flex-row items-center gap-3 hover:bg-neutral-50 px-3.5 py-2 cursor-pointer"
                        onClick={() => {
                          handleModal(true, "transaction");
                          setCurrentTransaction(transaction);
                        }}
                      >
                        <div className="rounded-full border border-neutral-200 p-1.5">
                          <Icon
                            path={ICON_MAP[category.icon]}
                            className="size-4 text-neutral-400"
                          />
                        </div>
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm">{title}</span>
                            {!!description && (
                              <span className="text-xs italic">
                                {description}
                              </span>
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
        <CreateTransaction handleClose={() => handleModal(false)} />
      )}
      {!!showTransaction && !!currentTransaction && (
        <TransactionDetails
          refetch={() => {
            refetch();
            handleModal(false);
          }}
          transaction={currentTransaction}
          handleClose={() => handleModal(false)}
        />
      )}
    </>
  );
};
