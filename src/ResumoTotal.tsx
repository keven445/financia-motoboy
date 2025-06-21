interface ResumoTotalProps {
  valoresMultiplicacao: number[];
  valoresEncosta: number[];
  gastos: {
    diarios: number[];
    semanais: number[];
  };
  saldoBrutoMesAtual?: number;
  totalTaxasManuais?: number;
  children?: React.ReactNode;
}

const ResumoTotal = ({
  valoresMultiplicacao,
  valoresEncosta,
  gastos,
  saldoBrutoMesAtual = 0,
  totalTaxasManuais = 0,
  children,
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

  const somaTotal = somaMultiplicacao + somaEncosta + saldoBrutoMesAtual;
  const saldoFinal = somaTotal - totalGastos;

  return (
    <div className="text-white p-4 bg-gray-800 rounded-lg">
      <div className="text-2xl mb-4">Resumo Financeiro:</div>
      <div className="space-y-2">
        <div>Total Encosta: R$ {somaEncosta.toFixed(2)}</div>
        {totalTaxasManuais > 0 && (
          <div>Taxa: R$ {totalTaxasManuais.toFixed(2)}</div>
        )}
        <div className="text-red-400">
          Total Gastos: R$ {totalGastos.toFixed(2)}
        </div>
        {children}
        <div className="text-3xl font-bold mt-4">
          <div className="text-yellow-400">
            Total Bruto: R$ {somaTotal.toFixed(2)}
          </div>
          <div
            className={`mt-2 ${
              saldoFinal >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            Saldo Final: R$ {saldoFinal.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2"></div>
    </div>
  );
};

export default ResumoTotal;
