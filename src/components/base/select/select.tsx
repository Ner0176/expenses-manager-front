import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { CustomSelectContainer } from "./select.styled";
import { ISelectOptions } from "./select.interface";

export const CustomSelect = ({
  options,
}: Readonly<{ options: ISelectOptions[] }>) => {
  return (
    <CustomSelectContainer>
      <select className="text-sm bg-white appearance-none focus:outline-none w-full">
        {options.map(({ text, value }) => (
          <option key={value} value={value} className="bg-white px-2.5">
            {text}
          </option>
        ))}
      </select>
      <Icon path={mdiChevronDown} className="size-3 mt-0.5 flex-shrink-0" />
    </CustomSelectContainer>
  );
};
