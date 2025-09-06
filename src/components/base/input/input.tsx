import { HTMLInputTypeAttribute } from "react";

export const CustomInput = ({
  title,
  value,
  onChange,
  type = "text",
}: Readonly<{
  title?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string | number) => void;
}>) => {
  return (
    <div className="flex flex-col gap-1">
      {!!title && <span className="font-semibold text-xs">{title}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-neutral-200 rounded-xl focus:outline-none px-3 py-1.5 text-sm"
      />
    </div>
  );
};
