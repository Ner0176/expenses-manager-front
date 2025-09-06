import { useState } from "react";
import { CustomInput, CustomSelect } from "../../base";
import { useTranslation } from "react-i18next";
import { CustomTextArea } from "../../base/text-area";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

export const CreateTransaction = () => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col gap-3 px-4 py-5 h-full">
      <div className="flex flex-row gap-3 items-center">
        <CustomInput
          type="number"
          value={amount}
          title={t("Transaction.Create.Amount")}
          onChange={(value) => setAmount(value as number)}
        />
        <CustomSelect
          title={t("Transaction.Create.Category.Title")}
          options={[
            { text: "JPY (¥)", value: "JPY (¥)" },
            { text: "KRW (₩)", value: "KRW (₩)" },
            { text: "Bat tailandés (฿)", value: "Bat tailandés (฿)" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-3 w-full">
        <CustomSelect
          customStyles={{ width: "100%" }}
          title={t("Transaction.Create.Currency")}
          options={[
            { text: "EUR (€)", value: "EUR (€)" },
            { text: "JPY (¥)", value: "JPY (¥)" },
            { text: "KRW (₩)", value: "KRW (₩)" },
            { text: "Bat tailandés (฿)", value: "Bat tailandés (฿)" },
          ]}
        />
        <Icon
          path={mdiArrowRight}
          className="size-5 mt-4 flex-shrink-0 text-neutral-700"
        />
        <CustomSelect
          customStyles={{ width: "100%" }}
          title={t("Transaction.Create.Currency")}
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
  );
};
