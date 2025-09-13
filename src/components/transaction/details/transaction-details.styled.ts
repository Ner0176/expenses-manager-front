import tw from "twin.macro";
import { styled } from "styled-components";

export const TransactionContainer = styled.div(
  tw`relative flex flex-col gap-3 border border-neutral-200 rounded-2xl p-4 my-4 shadow-sm`
);

export const TxContainerHeader = styled.div(
  tw`flex flex-col gap-0.5 border-b border-neutral-200 pb-2`
);
