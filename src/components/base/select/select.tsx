import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { CustomSelectContainer, StyledSelect } from "./select.styled";
import { ISelectOptions } from "./select.interface";
import { CSSProperties } from "react";

export const CustomSelect = ({
  value,
  title,
  options,
  customStyles,
  handleChange,
}: Readonly<{
  value?: string;
  title?: string;
  options: ISelectOptions[];
  customStyles?: CSSProperties;
  handleChange?: (value: string) => void;
}>) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {!!title && <span className="font-semibold text-xs">{title}</span>}
      <CustomSelectContainer
        isDisabled={!handleChange}
        style={{ ...customStyles }}
      >
        <StyledSelect
          value={value}
          disabled={!handleChange}
          onChange={(e) => {
            if (!!handleChange) handleChange(e.target.value);
          }}
        >
          {options.map(({ text, value }) => (
            <option key={value} value={value} className="bg-white px-2.5">
              {text}
            </option>
          ))}
        </StyledSelect>
        <Icon path={mdiChevronDown} className="size-3 mt-0.5 flex-shrink-0" />
      </CustomSelectContainer>
    </div>
  );
};
