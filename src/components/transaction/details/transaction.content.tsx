import { useTranslation } from "react-i18next";

export const SectionDetails = ({
  type,
  value,
}: Readonly<{ type: string; value: string }>) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="text-sm font-semibold">
        {t(`Transaction.Details.${type}`)}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
};
