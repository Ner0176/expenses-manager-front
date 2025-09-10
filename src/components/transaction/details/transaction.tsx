import { Modal } from "../../base";
import { ITransaction } from "../../../api";
import { useTranslation } from "react-i18next";

export const TransactionDetails = ({
  transaction,
  handleClose,
}: Readonly<{ transaction: ITransaction; handleClose(): void }>) => {
  const { t } = useTranslation();

  const { title, amount, category, description } = transaction;

  return (
    <Modal handleClose={handleClose} title={t("Transaction.Details.Title")}>
      <div className="flex flex-col gap-2 border border-neutral-200 rounded-2xl py-2.5 px-4">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-neutral-500 text-sm">{description}</span>
        <div className="flex flex-row justify-between items-center">
          <span>{t("Transaction.Details.Import")}</span>
          <span>{amount}€</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span>{t("Transaction.Details.Category")}</span>
          <span>{category.tag}</span>
        </div>
      </div>
    </Modal>
  );
};
