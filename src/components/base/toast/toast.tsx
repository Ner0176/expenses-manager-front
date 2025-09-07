import { isMobile } from "react-device-detect";
import { Slide, toast, ToastPosition, TypeOptions } from "react-toastify";

export const showToast = ({
  text,
  type,
  position,
  autoClose,
}: Readonly<{
  text: string;
  type: TypeOptions;
  autoClose?: number;
  position?: ToastPosition;
}>) => {
  toast(text, {
    type,
    theme: "colored",
    transition: Slide,
    pauseOnHover: true,

    hideProgressBar: true,
    autoClose: autoClose ?? 5000,
    style: isMobile ? { fontSize: 12 } : undefined,
    position: position ?? (isMobile ? "top-right" : "bottom-right"),
  });
};
