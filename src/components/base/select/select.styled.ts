import tw from "twin.macro";
import styled from "styled-components";

export const CustomSelectContainer = styled.div<{ isDisabled: boolean }>`
  ${tw`flex items-center justify-between gap-2 rounded-xl border border-neutral-200 px-2 py-1.5 bg-white min-w-[80px]`}
  ${({ isDisabled }) => !!isDisabled && tw`bg-neutral-50`}
`;

export const StyledSelect = styled.select<{ disabled: boolean }>`
  ${tw`text-sm bg-white appearance-none focus:outline-none w-full`}
  ${({ disabled }) => !!disabled && tw`bg-neutral-50`}
`;
