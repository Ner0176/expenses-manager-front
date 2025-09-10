import { ReactNode } from "react";
import {
  mdiArrowLeft,
  mdiCogOutline,
  mdiFormatListBulleted,
  mdiLabelMultipleOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useLocation, useNavigate } from "react-router-dom";
import { TITLES_MAP } from "./sidebar.interface";
import { useTranslation } from "react-i18next";

const SIDEBAR_OPTIONS = [
  { icon: mdiCogOutline, path: "/settings" },
  { icon: mdiFormatListBulleted, path: "/" },
  { icon: mdiLabelMultipleOutline, path: "/categories" },
];

export const SidebarLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const showGoBack = !!location.search && !location.search.includes("modal");

  const handleGoBack = () => navigate(location.pathname);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-500">
      <div className="flex flex-col justify-between w-full h-full bg-white">
        <div className="relative flex justify-center w-full border-b border-neutral-200 py-3">
          <span className="text-2xl font-bold">
            {t(`Sidebar.Titles.${TITLES_MAP[location.pathname]}`)}
          </span>
          {showGoBack && (
            <div onClick={handleGoBack} className="absolute top-5 left-3">
              <Icon
                path={mdiArrowLeft}
                className="size-6 cursor-pointer text-neutral-600"
              />
            </div>
          )}
        </div>
        <div className="flex-1 min-h-0">{children}</div>
        <div className="flex flex-row justify-evenly w-full border-t border-neutral-200 py-5">
          {SIDEBAR_OPTIONS.map(({ icon, path }) => (
            <div
              key={path}
              className="cursor-pointer"
              onClick={() => navigate(path)}
            >
              <Icon path={icon} className="size-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
