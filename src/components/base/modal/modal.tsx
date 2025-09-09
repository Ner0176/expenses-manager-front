import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { ReactNode } from "react";
import { CustomButton } from "../button";
import { useTranslation } from "react-i18next";

export const Modal = ({
  title,
  children,
  handleClose,
  handleSubmit,
  isLoading = false,
}: Readonly<{
  title: string;
  children: ReactNode;
  handleClose(): void;
  isLoading?: boolean;
  handleSubmit?: () => void;
}>) => {
  const { t } = useTranslation("");

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black opacity-25" />
      <div className="relative bg-white w-full h-[85%] border-t border-neutral-200 rounded-t-2xl">
        <div onClick={handleClose} className="absolute top-3.5 right-3.5">
          <Icon
            path={mdiClose}
            className="size-5 cursor-pointer text-neutral-500"
          />
        </div>
        <div className="flex flex-col h-full">
          <div className="border-b border-neutral-200 px-5 pt-5 pb-3">
            <span className="text-xl font-bold">{title}</span>
          </div>
          <div className="px-5 h-full overflow-y-auto">{children}</div>
          {!!handleSubmit && (
            <div className="flex flex-row gap-3 justify-end border-t border-neutral-200 py-3 px-5">
              <CustomButton
                buttonType="cancel"
                onClick={handleClose}
                text={t("Generic.Cancel")}
              />
              <CustomButton
                isLoading={isLoading}
                onClick={handleSubmit}
                text={t("Generic.SaveChanges")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
