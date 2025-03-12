import { createContext, ReactNode } from "react";

interface ResultadoSemanal {
  semana: number;
  valoresMultiplicacao: number[];
  valoresEncosta: number[];
  valoresPorDia: number[];
  gastos: {
    diarios: number[];
    semanais: number[];
  };
  total: number;
  data: string;
}

interface ValoresContextType {
  historicoSemanal: ResultadoSemanal[];
  salvarSemana: () => void;
}

export const ValoresContext = createContext<ValoresContextType | undefined>(
  undefined
);

export const ValoresProvider = ({ children }: { children: ReactNode }) => {
  const salvarSemana = () => {
    const dadosAtuais = localStorage.getItem("financasApp");
    if (dadosAtuais) {
      const valoresPadrao = {
        valoresEncosta: [80, 80, 80, 0, 80, 80, 80],
        multiplicador: 5,
        diaFolga: 3,
        valoresPorDia: [0, 0, 0, 0, 0, 0, 0],
        gastos: {
          diarios: new Array(7).fill(0),
          semanais: [0],
        },
      };

      localStorage.setItem("financasApp", JSON.stringify(valoresPadrao));
      window.location.reload();
    }
  };

  return (
    <ValoresContext.Provider
      value={{
        historicoSemanal: [],
        salvarSemana,
      }}
    >
      {children}
    </ValoresContext.Provider>
  );
};
