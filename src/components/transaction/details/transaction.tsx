import { LoadingSpinner, Modal } from "../../base";
import { ITransaction, useDeleteTransaction } from "../../../api";
import { useTranslation } from "react-i18next";
import { getCategoryTitle } from "../../category";
import { format } from "date-fns";
import { SectionDetails } from "./transaction.content";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";

export const TransactionDetails = ({
  refetch,
  transaction,
  handleClose,
}: Readonly<{
  refetch(): void;
  handleClose(): void;
  transaction: ITransaction;
}>) => {
  const { t } = useTranslation();

  const { id, title, amount, category, description, date } = transaction;

  const { mutate: deleteTx, isPending } = useDeleteTransaction(refetch);

  return (
    <Modal handleClose={handleClose} title={t("Transaction.Details.Title")}>
      <div className="relative flex flex-col gap-3 border border-neutral-200 rounded-2xl p-4 my-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold">{title}</span>
          <span className="text-neutral-500 text-xs">{description}</span>
        </div>
        <SectionDetails type="Import" value={`${amount}€`} />
        <SectionDetails type="Category" value={getCategoryTitle(t, category)} />
        <SectionDetails type="Time" value={`${format(date, "HH:mm")}h`} />
        <SectionDetails type="Date" value={format(date, "dd/MM/yyyy")} />
        <div
          onClick={() => deleteTx(id)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          {isPending ? (
            <LoadingSpinner color="gray" />
          ) : (
            <Icon path={mdiDeleteOutline} className="text-red-500 size-5" />
          )}
        </div>
      </div>
    </Modal>
  );
};
