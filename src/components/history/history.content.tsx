import Icon from "@mdi/react";
import { ICON_MAP } from "../category";
import { ITransaction } from "../../api";

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
