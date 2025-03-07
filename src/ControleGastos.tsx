import { useState, useEffect } from "react";

interface ControleGastosProps {
  onGastosChange: (gastos: { diarios: number[]; semanais: number[] }) => void;
  gastosIniciais?: {
    diarios: number[];
    semanais: number[];
  };
}

const ControleGastos = ({
  onGastosChange,
  gastosIniciais,
}: ControleGastosProps) => {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const [gastosDiarios, setGastosDiarios] = useState<number[]>(
    gastosIniciais?.diarios || new Array(7).fill(0)
  );
  const [gastosSemanais, setGastosSemanais] = useState<number[]>(
    gastosIniciais?.semanais || [0]
  );

  useEffect(() => {
    onGastosChange({ diarios: gastosDiarios, semanais: gastosSemanais });
  }, [gastosDiarios, gastosSemanais, onGastosChange]);

  const handleGastoDiarioChange = (index: number, valor: string) => {
    const valorSemZerosEsquerda = valor.replace(/^0+/, "");
    const novoValor =
      valorSemZerosEsquerda === "" ? 0 : parseInt(valorSemZerosEsquerda);
    const novosGastos = [...gastosDiarios];
    novosGastos[index] = novoValor;
    setGastosDiarios(novosGastos);
  };

  const handleGastoSemanalChange = (valor: string) => {
    const valorSemZerosEsquerda = valor.replace(/^0+/, "");
    const novoValor =
      valorSemZerosEsquerda === "" ? 0 : parseInt(valorSemZerosEsquerda);
    setGastosSemanais([novoValor]);
  };

  const totalGastos =
    gastosDiarios.reduce((acc, curr) => acc + curr, 0) + gastosSemanais[0];

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg w-full">
      <div className="text-white text-[14px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Controle de Gastos
      </div>

      {/* Gastos Diários */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-center max-w-4xl mx-auto">
        {diasSemana.map((dia, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 w-full max-w-[200px]"
          >
            <label className="text-white text-center text-[12px] sm:text-base md:text-lg lg:text-xl font-semibold">
              {dia}:
            </label>
            <div className="flex items-center justify-center w-full">
              <span className="text-green-500 mr-2 text-[12px] sm:text-base md:text-lg lg:text-xl">
                R$
              </span>
              <input
                type="number"
                value={gastosDiarios[index] === 0 ? "" : gastosDiarios[index]}
                onChange={(e) => handleGastoDiarioChange(index, e.target.value)}
                className="w-full min-w-[80px] sm:min-w-[100px] md:min-w-[120px] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-[12px] sm:text-base md:text-lg"
                min="0"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Gastos Semanais */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 border-t border-gray-700 pt-4 w-full max-w-4xl">
        <label className="text-white text-center text-[12px] sm:text-base md:text-lg lg:text-xl font-semibold">
          Gastos Semanais:
        </label>
        <div className="flex items-center justify-center">
          <span className="text-green-500 mr-2 text-[12px] sm:text-base md:text-lg lg:text-xl">
            R$
          </span>
          <input
            type="number"
            value={gastosSemanais[0] === 0 ? "" : gastosSemanais[0]}
            onChange={(e) => handleGastoSemanalChange(e.target.value)}
            className="w-full min-w-[100px] sm:min-w-[120px] md:min-w-[140px] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-[12px] sm:text-base md:text-lg"
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      {/* Total */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 border-t border-gray-700 pt-4 w-full max-w-4xl">
        <span className="text-white text-center text-[12px] sm:text-base md:text-lg lg:text-xl font-semibold">
          Total de Gastos:
        </span>
        <span className="text-green-500 font-bold text-[14px] sm:text-lg md:text-xl lg:text-2xl">
          R$ {totalGastos}
        </span>
      </div>
    </div>
  );
};

export default ControleGastos;
