import Icon from "@mdi/react";

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
