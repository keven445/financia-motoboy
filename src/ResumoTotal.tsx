interface ResumoTotalProps {
  valoresMultiplicacao: number[];
  valoresEncosta: number[];
  gastos: {
    diarios: number[];
    semanais: number[];
  };
}

const ResumoTotal = ({
  valoresMultiplicacao,
  valoresEncosta,
  gastos,
}: ResumoTotalProps) => {
  const somaMultiplicacao = valoresMultiplicacao.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const somaEncosta = valoresEncosta.reduce((acc, curr) => acc + curr, 0);
  const totalGastosDiarios = gastos.diarios.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const totalGastosSemanais = gastos.semanais.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const totalGastos = totalGastosDiarios + totalGastosSemanais;

  const somaTotal = somaMultiplicacao + somaEncosta;
  const saldoFinal = somaTotal - totalGastos;

  return (
    <div className="text-white p-4 bg-gray-800 rounded-lg">
      <div className="text-2xl mb-4">Resumo Financeiro:</div>
      <div className="space-y-2">
        <div>Total Multiplicação: R$ {somaMultiplicacao}</div>
        <div>Total Encosta: R$ {somaEncosta}</div>
        <div className="text-red-400">Total Gastos: R$ {totalGastos}</div>
        <div className="text-3xl font-bold mt-4">
          <div className="text-yellow-400">Total Bruto: R$ {somaTotal}</div>
          <div
            className={`mt-2 ${
              saldoFinal >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            Saldo Final: R$ {saldoFinal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumoTotal;
