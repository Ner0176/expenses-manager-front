export const CustomButton = ({
  text,
  onClick,
}: Readonly<{ text: string; onClick(): void }>) => {
  return (
    <button
      onClick={onClick}
      className="bg-emerald-400 rounded-full text-sm shadow-sm px-4 py-2 text-white cursor-pointer hover:shadow-xl whitespace-nowrap"
    >
      {text}
    </button>
  );
};
