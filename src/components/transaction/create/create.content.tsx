import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { getCategoryTitle } from "../../category";
import { CURRENCIES } from "../transaction.interface";
import { CustomInput, CustomSelect, CustomTextArea } from "../../base";
import { CreateTransactionPayload, useGetCategories } from "../../../api";

export const TransactionForm = ({
  txForm,
  setTxForm,
}: Readonly<{
  txForm: CreateTransactionPayload;
  setTxForm: (fields: Partial<CreateTransactionPayload>) => void;
}>) => {
  const { t } = useTranslation();

  const { title, amount, currency, description, categoryId } = txForm;

  const { data: categories } = useGetCategories();

  return (
    <div className="flex flex-col gap-3 py-2.5 h-full">
      <div className="flex flex-row gap-3 items-center">
        <CustomInput
          type="number"
          value={amount}
          title={t("Transaction.Create.Amount")}
          onChange={(value) => setTxForm({ amount: +value })}
        />
        <CustomSelect
          value={`${categoryId}`}
          title={t("Category.Title")}
          handleChange={(value) => setTxForm({ categoryId: +value })}
          options={
            categories?.map((category) => ({
              value: `${category.id}`,
              text: getCategoryTitle(t, category),
            })) ?? []
          }
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-3 w-full">
        <CustomSelect
          value={currency}
          customStyles={{ width: "100%" }}
          title={t("Transaction.Create.From")}
          handleChange={(value) => setTxForm({ currency: value })}
          options={Object.entries(CURRENCIES).map(([key, value]) => ({
            text: value,
            value: key,
          }))}
        />
        <Icon
          path={mdiArrowRight}
          className="size-5 mt-4 flex-shrink-0 text-neutral-700"
        />
        <CustomSelect
          customStyles={{ width: "100%" }}
          title={t("Transaction.Create.To")}
          options={[{ text: "EUR (€)", value: "EUR (€)" }]}
        />
      </div>
      <CustomInput
        value={title}
        title={t("Transaction.Create.Title")}
        onChange={(value) => setTxForm({ title: value as string })}
      />
      <CustomTextArea
        value={description ?? ""}
        title={t("Transaction.Create.Description")}
        onChange={(value) => setTxForm({ description: value })}
      />
    </div>
  );
};
