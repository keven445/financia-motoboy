import { useEffect } from "react";

interface MultiplicacaoProps {
  onValoresChange: (valores: number[]) => void;
  multiplicador: number;
  folgaIndex: number;
  valores: number[];
}

const Multiplicaçao = ({
  onValoresChange,
  multiplicador,
  folgaIndex,
  valores,
}: MultiplicacaoProps) => {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  useEffect(() => {
    const resultado = valores.map((numero, index) =>
      index === folgaIndex ? 0 : numero * multiplicador
    );
    onValoresChange(resultado);
  }, [valores, multiplicador, folgaIndex, onValoresChange]);

  const resultadoParaExibicao = valores.map((numero, index) =>
    index === folgaIndex ? 0 : numero * multiplicador
  );

  return (
    <div className="text-amber-50 border border-gray-700 p-0.5 sm:p-2 md:p-4 rounded-lg w-full">
      <div className="p-0.5 sm:p-2 border-b border-gray-700 text-[8px] sm:text-sm md:text-base text-center">
        {multiplicador}x
      </div>
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-0.5 sm:gap-2 p-0.5 sm:p-1 justify-center">
        {resultadoParaExibicao.map((item, index) => (
          <div
            className={`w-[48%] sm:w-auto p-0.5 sm:p-2 text-[8px] sm:text-sm md:text-base ${
              index === folgaIndex ? "bg-gray-800" : ""
            } mb-0.5 flex justify-center`}
            key={index}
          >
            <div className="flex items-center justify-between gap-0.5">
              <span className="font-bold min-w-[12px] sm:min-w-[20px]">
                {diasSemana[index].charAt(0)}
              </span>
              <span className="flex items-center gap-0.5">
                {valores[index]}×{item}
                {index === folgaIndex && (
                  <span className="text-yellow-400">F</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiplicaçao;
