import { useTranslation } from "react-i18next";
import { CustomInput } from "../base";
import { ICategory, useGetCategories } from "../../api";
import { useEffect, useState } from "react";
import { CategoryItem } from "./category.content";

export const CategoryDashboard = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<ICategory[]>([]);

  const { data: categories, isLoading } = useGetCategories();

  useEffect(() => {
    if (!!categories) {
      const filteredCategories = categories.filter(({ tag, isDefault }) => {
        const formattedTag = isDefault
          ? t(`Settings.Category.Default.${tag}`).toLowerCase()
          : tag.toLowerCase();
        return formattedTag.includes(search.toLowerCase());
      });
      setFilteredList(filteredCategories);
    }
  }, [categories, search, t]);

  return (
    <div className="flex flex-col gap-5 size-full pt-3.5 px-4">
      <CustomInput
        value={search}
        placeholder="Buscar categoría..."
        onChange={(value) => setSearch(value as string)}
      />
      <div className="flex flex-col gap-3 overflow-y-auto">
        {filteredList.map((category) => {
          return <CategoryItem key={category.id} category={category} />;
        })}
      </div>
    </div>
  );
};
