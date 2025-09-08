import { useState } from "react";
import * as mdiIcons from "@mdi/js";
import Icon from "@mdi/react";
import { ICategory, useDeleteCategory } from "../../api";
import { ICON_MAP } from "./category.interface";
import { useTranslation } from "react-i18next";
import { mdiDelete, mdiPencil } from "@mdi/js";

export const CategoryItem = ({
  category,
}: Readonly<{ category: ICategory }>) => {
  const { t } = useTranslation();

  const { id, tag, icon, isDefault } = category;

  const { mutate: deleteCategory } = useDeleteCategory();

  // const handleDeleteSuccess = (id: number) => {};

  return (
    <div className="flex flex-row items-center justify-between border border-neutral-200 rounded-xl py-1.5 px-3 cursor-pointer hover:bg-neutral-50">
      <div className="flex flex-row items-center gap-2">
        <Icon
          path={ICON_MAP[icon]}
          className="size-5 flex-shrink-0 text-neutral-500"
        />
        <span className="text-sm">
          {isDefault ? t(`Settings.Category.Default.${tag}`) : tag}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div onClick={() => {}}>
          <Icon path={mdiPencil} className="size-5 text-neutral-500" />
        </div>
        <div onClick={() => deleteCategory(id)}>
          <Icon path={mdiDelete} className="size-5 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export const IconPicker = ({
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
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar icono..."
        className="border p-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
        {filteredIcons.map((icon) => (
          <button
            key={icon.name}
            className="flex flex-col items-center p-2 border rounded hover:bg-gray-100"
            onClick={() => onSelect(icon.path, icon.name)}
          >
            <Icon path={icon.path} size={1.5} />
            <span className="text-[10px] mt-1 text-gray-600">{icon.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
