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

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => categoryApi.create(payload),
    onSuccess() {
      showToast({ type: "success", text: t("Category.Delete.Success") });
    },
    onError() {
      showToast({ type: "error", text: t("Category.Delete.Error") });
    },
  });
}

export function useDeleteCategory() {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess() {
      showToast({ type: "success", text: t("Category.Delete.Success") });
    },
    onError() {
      showToast({ type: "error", text: t("Category.Delete.Error") });
    },
  });
}
