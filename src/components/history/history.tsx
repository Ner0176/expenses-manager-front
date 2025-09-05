import { useSearchParams } from "react-router-dom";
import { CustomSelect } from "../base";
import { useState } from "react";
import { ITransaction, TransactionDetails } from "../transaction";

const DATA = [
  {
    total: 75,
    date: "04/09/2025",
    expenses: [
      {
        amount: 35,
        date: new Date(),
        category: "Ocio",
        title: "Karaoke",
        description: "Karaoke loquisimo",
      },
      {
        amount: 15,
        date: new Date(),
        category: "Comida",
        title: "Ramen",
        description: "Ramen buenisimo",
      },
      {
        amount: 5,
        date: new Date(),
        category: "Transporte",
        title: "Yamanote Line",
        description: "",
      },
      {
        amount: 20,
        date: new Date(),
        category: "Fiesta",
        title: "Entrada Shibuya",
        description: "",
      },
    ],
  },
  {
    total: 75,
    date: "03/09/2025",
    expenses: [
      {
        amount: 35,
        date: new Date(),
        category: "Ocio",
        title: "Karaoke",
        description: "Karaoke loquisimo",
      },
      {
        amount: 15,
        date: new Date(),
        category: "Comida",
        title: "Ramen",
        description: "Ramen buenisimo",
      },
      {
        amount: 5,
        date: new Date(),
        category: "Transporte",
        title: "Yamanote Line",
        description: "",
      },
      {
        amount: 20,
        date: new Date(),
        category: "Fiesta",
        title: "Entrada Shibuya",
        description: "",
      },
    ],
  },
  {
    total: 75,
    date: "18/08/2025",
    expenses: [
      {
        amount: 35,
        date: new Date(),
        category: "Ocio",
        title: "Karaoke",
        description: "Karaoke loquisimo",
      },
      {
        amount: 15,
        date: new Date(),
        category: "Comida",
        title: "Ramen",
        description: "Ramen buenisimo",
      },
      {
        amount: 5,
        date: new Date(),
        category: "Transporte",
        title: "Yamanote Line",
        description: "",
      },
      {
        amount: 20,
        date: new Date(),
        category: "Fiesta",
        title: "Entrada Shibuya",
        description: "",
      },
    ],
  },
];

export const HistoryDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showTransaction = searchParams.get("modal") === "transaction";

  const [currentTransaction, setCurrentTransaction] = useState<ITransaction>();

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
        <div className="flex flex-col gap-3 h-fit overflow-y-auto">
          {DATA.map(({ date, total, expenses }) => (
            <div key={date} className="flex flex-col gap-1 px-4 last:pb-3.5">
              <div className="flex justify-between">
                <span className="font-bold text-sm">{date}</span>
                <span className="text-xs text-neutral-600">{total}€</span>
              </div>
              <div className="flex flex-col rounded-2xl border border-neutral-200 w-full overflow-hidden">
                {expenses.map((transaction) => {
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
          ))}
        </div>
      </div>
      {!!showTransaction && !!currentTransaction && (
        <TransactionDetails transaction={currentTransaction} />
      )}
    </>
  );
};
