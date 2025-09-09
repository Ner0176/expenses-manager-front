import { useSearchParams } from "react-router-dom";
import { ICategory, useDeleteCategory, useGetCategory } from "../../../api";
import Icon from "@mdi/react";
import { ICON_MAP } from "../category.interface";
import { useEffect, useState } from "react";
import { CustomButton, CustomInput } from "../../base";
import { useTranslation } from "react-i18next";
import { mdiDeleteOutline } from "@mdi/js";

export const CategoryDetails = ({ refetch }: Readonly<{ refetch(): void }>) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "-1";

  const [category, setCategory] = useState<ICategory>({
    id: -1,
    tag: "",
    icon: "",
    isDefault: false,
  });

  const { data } = useGetCategory(+id);

  const handleDeleteSuccess = () => {
    searchParams.delete("id");
    setSearchParams(searchParams);
    refetch();
  };
  const { mutate: deleteCategory, isPending } =
    useDeleteCategory(handleDeleteSuccess);

  useEffect(() => {
    if (data) setCategory(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-5 size-full pt-3.5 px-4">
      <div className="flex flex-row justify-end">
        <CustomButton
          isLoading={isPending}
          icon={mdiDeleteOutline}
          text={t("Generic.Delete")}
          onClick={() => deleteCategory(category.id)}
        />
      </div>
      <div className="flex flex-row gap-3 w-full">
        <Icon path={ICON_MAP[category.icon]} className="size-5" />
        <CustomInput
          value={
            category.isDefault
              ? t(`Category.Default.${category.tag}`)
              : category.tag
          }
          title={t("Category.Title")}
        />
      </div>
    </div>
  );
};
