import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryApi } from "./category.gateway";
import { CreateCategoryPayload, ICategory } from "./create-category.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";

export function useGetCategories() {
  return useQuery<ICategory[]>({
    queryKey: ["getAllCategories"],
    queryFn: () => categoryApi.getAll(),
  });
}

export function useCreateCategory() {
  const { t } = useTranslation();
  const basePath = "Settings.Category.Create";

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => categoryApi.create(payload),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({ type: "error", text: t(`${basePath}.Error`) });
    },
  });
}

export function useDeleteCategory() {
  const { t } = useTranslation();
  const basePath = "Settings.Category.Delete";

  return useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({ type: "error", text: t(`${basePath}.Error`) });
    },
  });
}
