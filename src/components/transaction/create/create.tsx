import { useEffect, useState } from "react";
import { CustomInput, CustomSelect, Modal, showToast } from "../../base";
import { useTranslation } from "react-i18next";
import { CustomTextArea } from "../../base/text-area";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { useCreateTransaction, useGetCategories } from "../../../api";
import { CURRENCIES } from "../transaction.interface";
import { getCategoryTitle } from "../../category";

export const CreateTransaction = ({
  refetch,
  handleClose,
}: Readonly<{ refetch(): void; handleClose(): void }>) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [categoryId, setCategoryId] = useState(-1);
  const [description, setDescription] = useState("");

  const handleSuccess = () => {
    refetch();
    handleClose();
  };

  const { data: categories } = useGetCategories();
  const { mutate: createTransaction } = useCreateTransaction(handleSuccess);

  useEffect(() => {
    if (categories) {
      setCurrency("EUR");
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const handleSubmit = async () => {
    if (!title || !currency || !categoryId || !amount) {
      return showToast({
        type: "error",
        text: t("Transaction.Create.EmptyFields"),
      });
    }

    createTransaction({
      title,
      currency,
      categoryId,
      description,
      amount: +amount,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={t("Transaction.Create.ModalTitle")}
    >
      <div className="flex flex-col gap-3 py-2.5 h-full">
        <div className="flex flex-row gap-3 items-center">
          <CustomInput
            type="number"
            value={amount}
            title={t("Transaction.Create.Amount")}
            onChange={(value) => setAmount(value as number)}
          />
          <CustomSelect
            title={t("Category.Title")}
            handleChange={(value) => setCategoryId(+value)}
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
            handleChange={(value) => setCurrency(value)}
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
          onChange={(value) => setTitle(value as string)}
        />
        <CustomTextArea
          value={description}
          onChange={(value) => setDescription(value)}
          title={t("Transaction.Create.Description")}
        />
      </div>
    </Modal>
  );
};
