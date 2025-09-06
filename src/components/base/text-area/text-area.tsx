export const CustomTextArea = ({
  title,
  value,
  onChange,
}: Readonly<{
  value: string;
  title?: string;
  onChange: (value: string) => void;
}>) => {
  return (
    <div className="flex flex-col gap-1">
      {!!title && <span className="font-semibold text-xs">{title}</span>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-neutral-200 rounded-xl appearance-none resize-none focus:outline-none text-sm py-2 px-3 h-[150px]"
      />
    </div>
  );
};
