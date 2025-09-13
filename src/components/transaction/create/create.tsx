import { useState } from "react";
import { Modal, showToast } from "../../base";
import { useTranslation } from "react-i18next";
import { TransactionForm } from "./create.content";
import { CreateTransactionPayload, useCreateTransaction } from "../../../api";

export const CreateTransaction = ({
  refetch,
  handleClose,
}: Readonly<{ refetch(): void; handleClose(): void }>) => {
  const { t } = useTranslation();

  const [txForm, setTxForm] = useState<CreateTransactionPayload>({
    title: "",
    amount: 0,
    categoryId: -1,
    currency: "EUR",
    description: "",
  });

  const handleSuccess = () => {
    refetch();
    handleClose();
  };

  const { mutate: createTransaction } = useCreateTransaction(handleSuccess);

  const handleUpdateForm = (fields: Partial<CreateTransactionPayload>) => {
    setTxForm((prev) => ({ ...prev, ...fields }));
  };

  const handleSubmit = async () => {
    const { title, currency, categoryId, amount, description } = txForm;

    if (!title || !currency || !categoryId || !amount) {
      return showToast({
        type: "error",
        text: t("Transaction.Create.EmptyFields"),
      });
    }

    createTransaction({
      title,
      amount,
      currency,
      categoryId,
      description,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={t("Transaction.Create.ModalTitle")}
    >
      <TransactionForm txForm={txForm} setTxForm={handleUpdateForm} />
    </Modal>
  );
};
