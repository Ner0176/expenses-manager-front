import { useState } from "react";
import { format, parse } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateTransaction, TransactionDetails } from "../transaction";
import { ITransaction, useGetTransactions } from "../../api";
import {
  mdiAlertCircleOutline,
  mdiCurrencyUsd,
  mdiFilterVariant,
  mdiPlus,
} from "@mdi/js";
import {
  ActionIcon,
  HistoryFiltersModal,
  HistoryTransaction,
} from "./history.content";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import Skeleton from "react-loading-skeleton";

export const HistoryDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const showCreateModal = searchParams.get("modal") === "create";
  const showFiltersModal = searchParams.get("modal") === "filters";
  const showTransaction = searchParams.get("modal") === "transaction";

  const time = searchParams.get("time") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const startDate = searchParams.get("startDate") ?? undefined;
  const categoryId = searchParams.get("categoryId") ?? undefined;

  const [currentTransaction, setCurrentTransaction] = useState<ITransaction>();

  const {
    refetch,
    isLoading,
    data: transactions,
  } = useGetTransactions({
    categoryId: categoryId ? +categoryId : undefined,
    startDate: startDate
      ? parse(startDate, "dd-MM-yyyy", new Date())
      : undefined,
    endDate: endDate ? parse(endDate, "dd-MM-yyyy", new Date()) : undefined,
  });

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
              {isLoading ? (
                <Skeleton style={{ width: 150, height: 30 }} />
              ) : (
                `${transactions?.totalGeneral.toFixed(2) ?? 0}€`
              )}
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
              icon={mdiFilterVariant}
              text={t("History.Filters")}
              onClick={() => handleModal(true, "filters")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 h-fit overflow-y-auto">
          {!transactions?.list.length ? (
            <div className="flex flex-row items-center justify-center gap-1 mt-5">
              <Icon
                path={mdiAlertCircleOutline}
                className="size-5 mt-0.5 text-neutral-500"
              />
              <span className="text-sm text-neutral-500 font-semibold">
                {t("History.Empty")}
              </span>
            </div>
          ) : (
            transactions?.list.map(({ total, transactions }) => {
              const date = format(new Date(transactions[0].date), "dd/MM/yyyy");
              return (
                <div
                  key={date}
                  className="flex flex-col gap-1 px-4 last:pb-3.5"
                >
                  <div className="flex justify-between px-2">
                    <span className="font-bold text-xs">{date}</span>
                    <span className="text-xs text-neutral-600">{`${total.toFixed(
                      2
                    )}€`}</span>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-neutral-200 w-full overflow-hidden">
                    {transactions.map((transaction) => {
                      return (
                        <HistoryTransaction
                          tx={transaction}
                          key={transaction.id}
                          onSelect={() => {
                            handleModal(true, "transaction");
                            setCurrentTransaction(transaction);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {!!showFiltersModal && (
        <HistoryFiltersModal
          selectedTime={time}
          selectedCategoryId={categoryId}
          handleClose={() => handleModal(false)}
        />
      )}
      {!!showCreateModal && (
        <CreateTransaction
          refetch={refetch}
          handleClose={() => handleModal(false)}
        />
      )}
      {!!showTransaction && !!currentTransaction && (
        <TransactionDetails
          refetch={refetch}
          transaction={currentTransaction}
          handleClose={() => handleModal(false)}
        />
      )}
    </>
  );
};
