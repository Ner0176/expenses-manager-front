import tw from "twin.macro";
import { styled } from "styled-components";

export const CustomButtonContainer = styled.button<{
  buttonType: "default" | "cancel";
}>`
  ${tw`flex flex-row items-center justify-center gap-0.5 rounded-full text-sm min-w-[80px] px-4 py-1.5 text-white cursor-pointer whitespace-nowrap`}
  ${({ buttonType }) =>
    buttonType === "default"
      ? tw`bg-emerald-400 shadow-md hover:shadow-xl`
      : tw`border border-emerald-400 text-emerald-400`}
`;
