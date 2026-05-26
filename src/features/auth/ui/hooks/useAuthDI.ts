import { useContext } from "react";
import { AuthDIContext } from "../providers/ioc/authDIContext";

export const useAuthDI = () => {
  const context = useContext(AuthDIContext);
  if (!context) {
    throw new Error("useAuthDI must be used inside AuthDIProvider");
  }
  return context;
};
