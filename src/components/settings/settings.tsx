import { CustomSelect } from "../base";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "./settings.interface";

export const SettingsDashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-5 px-4 py-5 h-full">
        <CustomSelect
          title={t("Settings.Language.Title")}
          options={LANGUAGES.map((lng) => {
            return { value: lng, text: t(`Settings.Language.Options.${lng}`) };
          })}
        />
        <CustomSelect
          title="Moneda global"
          options={[{ text: "EUR (€)", value: "EUR (€)" }]}
        />
      </div>
    </>
  );
};
