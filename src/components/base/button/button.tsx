import Icon from "@mdi/react";
import { CustomButtonContainer } from "./button.styled";
import { LoadingSpinner } from "../loading-spinner";

export const CustomButton = ({
  text,
  icon,
  onClick,
  customColor,
  isLoading = false,
  buttonType = "default",
}: Readonly<{
  text: string;
  icon?: string;
  onClick(): void;
  isLoading?: boolean;
  customColor?: string;
  buttonType?: "default" | "cancel";
}>) => {
  return (
    <CustomButtonContainer
      buttonType={buttonType}
      onClick={() => {
        if (!isLoading) onClick();
      }}
      style={{ backgroundColor: customColor }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!!icon && <Icon path={icon} className="size-4 mt-0.5" />}
          {text}
        </>
      )}
    </CustomButtonContainer>
  );
};
