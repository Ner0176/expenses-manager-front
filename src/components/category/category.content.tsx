import { useState } from "react";
import * as mdiIcons from "@mdi/js";
import Icon from "@mdi/react";
import { ICategory, useCreateCategory } from "../../api";
import { ICON_MAP } from "./category.interface";
import { useTranslation } from "react-i18next";
import { mdiChevronRight, mdiHelp } from "@mdi/js";
import { CustomInput, Modal } from "../base";
import { useSearchParams } from "react-router-dom";
import { getCategoryTitle } from "./category.utils";

export const CategoryItem = ({
  category,
}: Readonly<{ category: ICategory }>) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { id, icon } = category;

  const handleShowDetails = () => {
    searchParams.set("id", `${id}`);
    setSearchParams(searchParams);
  };

  return (
    <div
      onClick={handleShowDetails}
      className="flex flex-row items-center justify-between first:border-t border-b border-neutral-200 py-3.5 px-7 cursor-pointer hover:bg-neutral-50"
    >
      <div className="flex flex-row items-center gap-2">
        <Icon
          path={ICON_MAP[icon]}
          className="size-5 flex-shrink-0 text-neutral-500"
        />
        <span className="text-sm">{getCategoryTitle(t, category)}</span>
      </div>
      <Icon path={mdiChevronRight} className="size-5 text-neutral-400" />
    </div>
  );
};

export const CreateCategoryModal = ({
  onClose,
  refetch,
}: Readonly<{ refetch(): void; onClose(): void }>) => {
  const { t } = useTranslation();

  const [tag, setTag] = useState("");
  const [icon, setIcon] = useState<{ path: string; name: string }>();

  const handleSuccess = () => {
    onClose();
    refetch();
  };

  const { mutate: create, isPending } = useCreateCategory(handleSuccess);

  const handleSubmit = () => {
    if (!!tag && !!icon) {
      create({ icon: icon.name, tag });
    }
  };

  return (
    <Modal
      isLoading={isPending}
      handleClose={onClose}
      handleSubmit={handleSubmit}
      title={t("Category.Create.Title")}
    >
      <div className="flex flex-col gap-2 py-2.5 h-full">
        <CustomInput
          value={tag}
          title={t("Category.Title")}
          onChange={(value) => setTag(value as string)}
          placeholder={t("Category.Create.Placeholder")}
        />
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="font-semibold text-xs">
              {t("Category.Create.Icon")}
            </span>
            <div className="flex items-center justify-center border border-neutral-200 w-full rounded-2xl h-[80px]">
              <Icon path={icon?.path ?? mdiHelp} className="size-8" />
            </div>
          </div>
          <IconPicker onSelect={(path, name) => setIcon({ path, name })} />
        </div>
      </div>
    </Modal>
  );
};

const IconPicker = ({
  onSelect,
}: Readonly<{
  onSelect: (iconPath: string, iconName: string) => void;
}>) => {
  const [search, setSearch] = useState("");

  const allIcons = Object.entries(mdiIcons).map(([name, path]) => ({
    name,
    path: path as string,
  }));

  const filteredIcons = allIcons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <CustomInput
        value={search}
        placeholder="Buscar icono..."
        onChange={(value) => setSearch(value as string)}
      />
      <div className="grid grid-cols-5 gap-4 flex-1 max-h-[300px] overflow-y-auto">
        {filteredIcons.map((icon) => (
          <button
            key={icon.name}
            onClick={() => onSelect(icon.path, icon.name)}
            className="flex flex-col items-center p-2 border rounded hover:bg-gray-100"
          >
            <Icon path={icon.path} className="size-7" />
          </button>
        ))}
      </div>
    </div>
  );
};
