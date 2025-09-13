import { LoadingSpinner, Modal } from "../../base";
import { ITransaction, useDeleteTransaction } from "../../../api";
import { useTranslation } from "react-i18next";
import { getCategoryTitle } from "../../category";
import { format } from "date-fns";
import { SectionDetails, TransactionHeader } from "./transaction.content";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";
import { TransactionContainer } from "./transaction-details.styled";
import { CURRENCY_SYMBOLS } from "../transaction.interface";
import { useMemo } from "react";

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

  const {
    id,
    date,
    title,
    amount,
    category,
    currency,
    description,
    conversionRate,
  } = transaction;

  const handleSuccess = () => {
    refetch();
    handleClose();
  };

  const { mutate: deleteTx, isPending } = useDeleteTransaction(handleSuccess);

  const currencySymbol = useMemo(() => {
    return CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS];
  }, [currency]);

  return (
    <Modal handleClose={handleClose} title={t("Transaction.Details.Title")}>
      <TransactionContainer>
        <TransactionHeader title={title} description={description} />
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
      </TransactionContainer>
      <TransactionContainer>
        <TransactionHeader title={t("Transaction.Details.Payment")} />
        <SectionDetails type="Import" value={`${amount} €`} />
        <SectionDetails type="Conversion" value={`${currency} - ${"EUR"}`} />
        {!!conversionRate && (
          <SectionDetails
            type="PreImport"
            tVar={currencySymbol}
            value={`${Number(amount / conversionRate).toFixed(
              0
            )} ${currencySymbol}`}
          />
        )}
        {!!conversionRate && (
          <SectionDetails type="Rate" value={`${conversionRate}`} />
        )}
      </TransactionContainer>
    </Modal>
  );
};
