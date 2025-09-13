import { Modal } from "../../base";
import {
  CreateTransactionPayload,
  ITransaction,
  useDeleteTransaction,
  useEditTransaction,
} from "../../../api";
import { useTranslation } from "react-i18next";
import { getCategoryTitle } from "../../category";
import { format } from "date-fns";
import {
  SectionDetails,
  TransactionHeader,
  TransactionIcon,
} from "./transaction.content";
import { TransactionContainer } from "./transaction-details.styled";
import { CURRENCY_SYMBOLS } from "../transaction.interface";
import { useMemo, useState } from "react";
import { TransactionForm } from "../create";

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

  const transformedTx: CreateTransactionPayload = useMemo(() => {
    const convertedAmount = !!conversionRate ? amount * conversionRate : amount;
    return {
      title,
      currency,
      description,
      categoryId: category.id,
      amount: convertedAmount,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  const [editTransaction, setEditTransaction] = useState(false);
  const [txForm, setTxForm] = useState<CreateTransactionPayload>(transformedTx);

  const handleDeleteSuccess = () => {
    refetch();
    handleClose();
  };

  const handleEditSucces = () => {
    refetch();
    handleClose();
    setEditTransaction(false);
  };

  const { mutate: editTx, isPending: isEditingTx } =
    useEditTransaction(handleEditSucces);
  const { mutate: deleteTx, isPending: isDeletingTx } =
    useDeleteTransaction(handleDeleteSuccess);

  const currencySymbol = useMemo(() => {
    return CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS];
  }, [currency]);

  const handleUpdateForm = (fields: Partial<CreateTransactionPayload>) => {
    setTxForm((prev) => ({ ...prev, ...fields }));
  };

  const handleEdit = () => {
    const diff = Object.keys(txForm).reduce((acc, key) => {
      const k = key as keyof CreateTransactionPayload;
      if (txForm[k] !== transformedTx[k]) {
        acc[k] = txForm[k] as any;
      }
      return acc;
    }, {} as Partial<CreateTransactionPayload>);

    if (Object.keys(diff).length > 0) {
      editTx({ id: transaction.id, payload: diff });
    } else setEditTransaction(false);
  };

  return (
    <Modal
      title={t("Transaction.Details.Title")}
      isLoading={editTransaction && isEditingTx}
      handleSubmit={editTransaction ? handleEdit : undefined}
      handleClose={
        editTransaction ? () => setEditTransaction(false) : handleClose
      }
    >
      {editTransaction ? (
        <TransactionForm txForm={txForm} setTxForm={handleUpdateForm} />
      ) : (
        <>
          <TransactionContainer>
            <div className="absolute top-3 right-3 flex flex-row items-center gap-2">
              <TransactionIcon
                type="edit"
                isLoading={isEditingTx}
                onClick={() => setEditTransaction(true)}
              />
              <TransactionIcon
                type="delete"
                isLoading={isDeletingTx}
                onClick={() => deleteTx(id)}
              />
            </div>
            <TransactionHeader title={title} description={description} />
            <SectionDetails
              type="Category"
              value={getCategoryTitle(t, category)}
            />
            <SectionDetails type="Time" value={`${format(date, "HH:mm")}h`} />
            <SectionDetails type="Date" value={format(date, "dd/MM/yyyy")} />
          </TransactionContainer>
          <TransactionContainer>
            <TransactionHeader title={t("Transaction.Details.Payment")} />
            <SectionDetails type="Import" value={`${amount} €`} />
            <SectionDetails
              type="Conversion"
              value={`${currency} - ${"EUR"}`}
            />
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
        </>
      )}
    </Modal>
  );
};
