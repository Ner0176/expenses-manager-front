import { useTranslation } from "react-i18next";
import { TxContainerHeader } from "./transaction-details.styled";
import { mdiDeleteOutline, mdiPencilOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { LoadingSpinner } from "../../base";

export const SectionDetails = ({
  type,
  tVar,
  value,
}: Readonly<{ type: string; tVar?: string; value: string }>) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="text-sm font-semibold">
        {t(`Transaction.Details.${type}`, { value: tVar })}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
};

export const TransactionHeader = ({
  title,
  description,
}: Readonly<{ title: string; description?: string }>) => {
  return (
    <TxContainerHeader>
      <span className="text-base font-bold">{title}</span>
      {!!description && (
        <span className="text-neutral-500 text-xs">{description}</span>
      )}
    </TxContainerHeader>
  );
};

export const TransactionIcon = ({
  type,
  onClick,
  isLoading,
}: Readonly<{
  onClick(): void;
  isLoading: boolean;
  type: "edit" | "delete";
}>) => {
  return (
    <div
      onClick={() => {
        if (!isLoading) onClick();
      }}
    >
      {isLoading ? (
        <LoadingSpinner color="gray" />
      ) : (
        <Icon
          className="size-5 cursor-pointer"
          path={type === "edit" ? mdiPencilOutline : mdiDeleteOutline}
          style={{ color: type === "edit" ? "#737373" : "#ef4444" }}
        />
      )}
    </div>
  );
};
