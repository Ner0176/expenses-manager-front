import { TFunction } from "i18next";
import { ICategory } from "../../api";

export function getCategoryTitle(
  t: TFunction<"translation", undefined>,
  { isDefault, tag }: ICategory
) {
  return isDefault ? t(`Category.Default.${tag}`) : tag;
}
