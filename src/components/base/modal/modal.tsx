import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { ReactNode } from "react";

export const Modal = ({
  title,
  children,
  handleClose,
}: Readonly<{ title: string; children: ReactNode; handleClose(): void }>) => {
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
        <div className="flex flex-col gap-3">
          <div className="border-b border-neutral-200 px-5 pt-5 pb-3">
            <span className="text-xl font-bold">{title}</span>
          </div>
          <div className="px-5">{children}</div>
        </div>
      </div>
    </div>
  );
};
