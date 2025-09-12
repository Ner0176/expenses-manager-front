import "react-datepicker/dist/react-datepicker.css";

import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { format, isValid, parse } from "date-fns";
import { useEffect } from "react";

export const CustomDatePicker = ({
  value,
  title,
  handleChange,
  isTime = false,
}: Readonly<{
  value: string;
  title?: string;
  isTime?: boolean;
  handleChange?: (value: string) => void;
}>) => {
  const parsedDate = isTime
    ? parse(value, "HH:mm", new Date())
    : parse(value, "yyyy-MM-dd", new Date());

  useEffect(() => {
    registerLocale("es", es);
  }, []);

  return (
    <div className="flex flex-col gap-1 w-full">
      {!!title && <span className="font-semibold text-xs">{title}</span>}
      <DatePicker
        locale={"es"}
        timeIntervals={15}
        timeCaption="Hora"
        showTimeSelect={isTime}
        showTimeSelectOnly={isTime}
        dateFormat={isTime ? "HH:mm" : "dd/MM/yyyy"}
        selected={value && isValid(parsedDate) ? parsedDate : null}
        onChange={(date) => {
          if (!!date && !!handleChange) {
            handleChange(format(date, isTime ? "HH:mm" : "yyyy-MM-dd"));
          }
        }}
        className="w-full text-xs sm:text-sm px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none"
      />
    </div>
  );
};
