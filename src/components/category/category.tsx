import { useTranslation } from "react-i18next";
import { CustomButton, CustomInput } from "../base";
import { ICategory, useGetCategories } from "../../api";
import { useEffect, useState } from "react";
import { CategoryItem, CreateCategoryModal } from "./category.content";
import Skeleton from "react-loading-skeleton";
import { mdiPlus } from "@mdi/js";
import { useSearchParams } from "react-router-dom";
import { CategoryDetails } from "./details";

export const CategoryDashboard = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const showDetails = searchParams.get("id");

  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filteredList, setFilteredList] = useState<ICategory[]>([]);

  const { data: categories, refetch, isLoading } = useGetCategories();

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
    <>
      {!!showDetails ? (
        <CategoryDetails refetch={refetch} />
      ) : (
        <div className="flex flex-col gap-5 size-full pt-3.5">
          <div className="flex flex-row items-center gap-3 px-4 w-full">
            <CustomInput
              fullWidth
              value={search}
              placeholder={t("Category.Search")}
              onChange={(value) => setSearch(value as string)}
            />
            <CustomButton
              icon={mdiPlus}
              text={t("Generic.Create")}
              onClick={() => setShowCreateModal(true)}
            />
          </div>
          <div className="flex flex-col overflow-y-auto">
            {isLoading
              ? [...Array(10)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full h-10 border-b border-neutral-200"
                  />
                ))
              : filteredList.map((category) => {
                  return <CategoryItem key={category.id} category={category} />;
                })}
          </div>
        </div>
      )}
      {showCreateModal && (
        <CreateCategoryModal
          refetch={refetch}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
};
