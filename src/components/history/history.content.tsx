import Icon from "@mdi/react";
import { getCategoryTitle, ICON_MAP } from "../category";
import {
  GetTransactionsPayload,
  ITransaction,
  useGetCategories,
} from "../../api";
import { CustomDatePicker, CustomSelect, Modal, showToast } from "../base";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { TIME_FILTERS } from "./history.interface";
import { getDatesFromTimeFilter } from "./history.utils";
import { isAfter } from "date-fns";

export const ActionIcon = ({
  icon,
  text,
  onClick,
}: Readonly<{ text: string; icon: string; onClick(): void }>) => {
  return (
    <div className="flex flex-col items-center gap-1" onClick={onClick}>
      <div className="rounded-full border border-neutral-200 p-2 cursor-pointer hover:bg-neutral-50 w-min">
        <Icon path={icon} className="size-4 text-neutral-500" />
      </div>
      <span className="text-[10px] font-semibold text-neutral-500">{text}</span>
    </div>
  );
};

export const HistoryTransaction = ({
  tx,
  onSelect,
}: Readonly<{ onSelect(): void; tx: ITransaction }>) => {
  const { title, description, amount, category } = tx;
  return (
    <div
      onClick={onSelect}
      className="flex flex-row items-center gap-3 hover:bg-neutral-50 px-3.5 py-2 cursor-pointer"
    >
      <div className="rounded-full border border-neutral-200 p-1.5">
        <Icon
          path={ICON_MAP[category.icon]}
          className="size-4 text-neutral-400"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{title}</span>
          {!!description && (
            <span className="text-xs italic">{description}</span>
          )}
        </div>
        <span className="text-sm">{amount}€</span>
      </div>
    </div>
  );
};

export const HistoryFiltersModal = ({
  setFilters,
  handleClose,
}: Readonly<{
  handleClose(): void;
  setFilters(filters: GetTransactionsPayload): void;
}>) => {
  const { t } = useTranslation();

  const [time, setTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");

  const { data: categories, isLoading } = useGetCategories();

  const getCategories = () => {
    const baseOption = [{ text: "-", value: "-" }];

    return [
      ...baseOption,
      ...(categories?.map((category) => ({
        value: category.tag,
        text: getCategoryTitle(t, category),
      })) ?? []),
    ];
  };

  const handleSubmit = () => {
    let endDateFilter: Date | undefined;
    let startDateFilter: Date | undefined;

    if (time !== "custom") {
      const dates = getDatesFromTimeFilter(time);
      endDateFilter = dates.endDate;
      startDateFilter = dates.startDate;
    } else {
      if (startDate && endDate && isAfter(startDate, endDate)) {
        return showToast({
          type: "error",
          text: t("History.TimeFilters.InvalidDates"),
        });
      }

      endDateFilter = !!endDate ? new Date(endDate) : undefined;
      startDateFilter = !!startDate ? new Date(startDate) : undefined;
    }

    setFilters({
      endDate: endDateFilter,
      startDate: startDateFilter,
      categoryId: Number(category) || undefined,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={t("History.Filters")}
    >
      <div className="flex flex-col gap-3 border border-neutral-200 rounded-2xl py-3 px-4 my-4">
        <span className="font-semibold text-sm">{t("Generic.FilterBy")}</span>
        {isLoading ? (
          <Skeleton />
        ) : (
          <CustomSelect
            value={category ?? "-"}
            options={getCategories()}
            title={t("Category.Title")}
            handleChange={(value) => setCategory(value)}
          />
        )}
        <CustomSelect
          value={time}
          title={t("History.TimeFilters.Time")}
          handleChange={(value) => setTime(value)}
          options={TIME_FILTERS.map((option) => ({
            value: option,
            text: option !== "-" ? t(`History.TimeFilters.${option}`) : option,
          }))}
        />
        {time === "custom" && (
          <div className="flex flex-row items-center gap-3">
            <CustomDatePicker
              value={startDate}
              title={t("History.TimeFilters.startDate")}
              handleChange={(value) => setStartDate(value)}
            />
            <CustomDatePicker
              value={endDate}
              title={t("History.TimeFilters.endDate")}
              handleChange={(value) => setEndDate(value)}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
