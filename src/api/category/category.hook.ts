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

export function useGetCategory(id: number) {
  return useQuery<ICategory>({
    queryKey: ["getAllCategories", id],
    queryFn: () => categoryApi.getOne(id),
  });
}

export function useCreateCategory(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Category.Create";

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => categoryApi.create(payload),
    onSuccess() {
      handleSuccess();
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

export function useDeleteCategory(handleDelete: () => void) {
  const { t } = useTranslation();
  const basePath = "Category.Delete";

  return useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess() {
      handleDelete();
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
