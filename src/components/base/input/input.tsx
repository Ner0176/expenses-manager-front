import { HTMLInputTypeAttribute } from "react";

export const CustomInput = ({
  title,
  value,
  onChange,
  placeholder,
  type = "text",
  fullWidth = false,
}: Readonly<{
  title?: string;
  fullWidth?: boolean;
  placeholder?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  onChange?: (value: string | number) => void;
}>) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {!!title && <span className="font-semibold text-xs">{title}</span>}
      <input
        type={type}
        value={value}
        disabled={!onChange}
        placeholder={placeholder}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        style={{ width: fullWidth ? "100%" : undefined }}
        className="border border-neutral-200 rounded-xl focus:outline-none px-3 py-1.5 text-sm"
      />
    </div>
  );
};
