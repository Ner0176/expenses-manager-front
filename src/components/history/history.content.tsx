/* eslint-disable @typescript-eslint/no-unused-vars */
import Icon from "@mdi/react";
import { getCategoryTitle, ICON_MAP } from "../category";
import { ITransaction, useGetCategories } from "../../api";
import { CustomDatePicker, CustomSelect, Modal, showToast } from "../base";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { TIME_FILTERS } from "./history.interface";
import { getDatesFromTimeFilter } from "./history.utils";
import { format, isAfter } from "date-fns";
import { useSearchParams } from "react-router-dom";

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
  handleClose,
}: Readonly<{
  handleClose(): void;
}>) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();

  const [time, setTime] = useState("-");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("-");
  const [startDate, setStartDate] = useState("");

  const { data: categories, isLoading } = useGetCategories();

  const getCategories = () => {
    const baseOption = [{ text: "-", value: "-" }];

    return [
      ...baseOption,
      ...(categories?.map((category) => ({
        value: `${category.id}`,
        text: getCategoryTitle(t, category),
      })) ?? []),
    ];
  };

  const handleSubmit = () => {
    let endDateFilter: Date | undefined = !!endDate
      ? new Date(endDate)
      : undefined;
    let startDateFilter: Date | undefined = !!startDate
      ? new Date(startDate)
      : undefined;

    if (time !== "-") {
      if (time !== "custom") {
        const dates = getDatesFromTimeFilter(time);
        startDateFilter = dates.startDate;
        endDateFilter = dates.endDate;
      } else {
        if (startDate && endDate && isAfter(startDate, endDate)) {
          return showToast({
            type: "error",
            text: t("History.TimeFilters.InvalidDates"),
          });
        }
      }
    }

    setSearchParams((sParams) => {
      if (time === "-") {
        sParams.delete("time");
        sParams.delete("endDate");
        sParams.delete("startDate");
      } else {
        sParams.set("time", time);
        if (!!endDateFilter) {
          sParams.set("endDate", format(endDateFilter, "dd-MM-yyyy"));
        }
        if (!!startDateFilter) {
          sParams.set("startDate", format(startDateFilter, "dd-MM-yyyy"));
        }
      }

      !!category && category !== "-"
        ? sParams.set("categoryId", category)
        : sParams.delete("categoryId");

      sParams.delete("modal");

      return sParams;
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
            value={category}
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
