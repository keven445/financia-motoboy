interface ControlePagamentoProps {
  valores: number[];
  onValoresChange: (novosValores: number[]) => void;
}

const ControlePagamento = ({
  valores,
  onValoresChange,
}: ControlePagamentoProps) => {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const handleValorChange = (index: number, novoValor: string) => {
    // Remove zeros à esquerda
    const valorSemZerosEsquerda = novoValor.replace(/^0+/, "");
    const numeroValido =
      valorSemZerosEsquerda === "" ? 0 : parseInt(valorSemZerosEsquerda);

    const novosValores = [...valores];
    novosValores[index] = numeroValido;
    onValoresChange(novosValores);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg w-full">
      <span className="text-white text-[14px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-center w-full">
        quantas entregas
        
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 w-full">
        {diasSemana.map((dia, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 w-full"
          >
            <label className="text-white text-center text-[12px] sm:text-base md:text-lg lg:text-xl font-semibold w-full">
              {dia}
            </label>
            <div className="w-full px-4">
              <input
                type="number"
                value={valores[index] === 0 ? "" : valores[index]}
                onChange={(e) => handleValorChange(index, e.target.value)}
                className="w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-[12px] sm:text-base md:text-lg"
                min="0"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlePagamento;
