import { ReactNode } from "react";
import {
  mdiCogOutline,
  mdiFormatListBulleted,
  mdiPlusCircleOutline,
} from "@mdi/js";
import Icon from "@mdi/react";

const SIDEBAR_OPTIONS = [
  mdiCogOutline,
  mdiPlusCircleOutline,
  mdiFormatListBulleted,
];

export const SidebarLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-500">
      <div className="flex flex-col justify-between w-full h-full bg-white">
        <div className="flex justify-center w-full border-b border-neutral-200 py-3">
          <span className="text-2xl font-bold">Lista de gastos</span>
        </div>
        <div className="flex-1 min-h-0">{children}</div>
        <div className="flex flex-row justify-evenly w-full border-t border-neutral-200 py-5">
          {SIDEBAR_OPTIONS.map((item) => (
            <div className="cursor-pointer">
              <Icon path={item} className="size-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
