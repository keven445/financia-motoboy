import { useContext } from "react";
import { ValoresContext } from "../ValoresContext";

export const useValores = () => {
  const context = useContext(ValoresContext);
  if (!context) {
    throw new Error("useValores deve ser usado dentro de um ValoresProvider");
  }
  return context;
};
