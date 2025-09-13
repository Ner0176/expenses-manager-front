import { useTranslation } from "react-i18next";
import { TxContainerHeader } from "./transaction-details.styled";

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
