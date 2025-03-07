import { useEffect } from "react";

interface ControleEncostaProps {
  onValoresChange: (valores: number[]) => void;
  valores: number[];
  diaFolga: number;
}

const ControleEncosta = ({
  onValoresChange,
  valores,
  diaFolga,
}: ControleEncostaProps) => {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  // Atualiza a encosta quando o dia de folga muda, mas preserva os valores existentes
  useEffect(() => {
    // Só atualiza se o valor atual do dia de folga não for 0
    if (valores[diaFolga] !== 0) {
      const novosValores = valores.map((valor, index) => {
        if (index === diaFolga) {
          return 0; // Zera apenas o dia de folga
        }
        // Mantém o valor existente ou usa 80 se não houver valor
        return valor || 80;
      });
      onValoresChange(novosValores);
    }
  }, [diaFolga]);






 const handleValorChange = (index: number, novoValor: string) => {
    const numeroValido = parseInt(novoValor) || 0;
    const novosValores = [...valores];
    novosValores[index] = numeroValido;
    onValoresChange(novosValores);
  };

  return (
    <div className="text-white border border-gray-700 p-4 rounded-lg w-full">
      <div className="text-[14px] sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center w-full">
        Encosta
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {valores.map((valor, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 w-full"
          >
            <span className="text-[12px] sm:text-base md:text-lg lg:text-xl font-semibold w-full text-center">
              {diasSemana[index]}
              {index === diaFolga && (
                <span className="text-yellow-400 ml-1">F</span>
              )}
            </span>
            <input
              type="number"
              value={valor}
              onChange={(e) => handleValorChange(index, e.target.value)}
              className={`w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded text-[12px] sm:text-base md:text-lg text-center ${
                index === diaFolga
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-700 text-white"
              } border border-gray-600 focus:border-blue-500 focus:outline-none`}
              min="0"
              disabled={index === diaFolga}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControleEncosta;
