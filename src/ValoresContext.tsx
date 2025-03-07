import { createContext, ReactNode } from "react";

interface ValoresContextType {
  valoresMultiplicacao: number[];
  valoresEncosta: number[];
}

export const ValoresContext = createContext<ValoresContextType | undefined>(
  undefined
);

export const ValoresProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ValoresContext.Provider
      value={{
        valoresMultiplicacao: [],
        valoresEncosta: [],
      }}
    >
      {children}
    </ValoresContext.Provider>
  );
};
