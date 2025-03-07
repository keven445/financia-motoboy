import { useState, useEffect } from "react";

interface SaldoMensal {
  mes: string;
  saldoBruto: number;
  saldoFinal: number;
}

interface ControleSaldoProps {
  onSaldoChange: (saldos: SaldoMensal[]) => void;
  saldosIniciais?: SaldoMensal[];
}

const ControleSaldo = ({
  onSaldoChange,
  saldosIniciais,
}: ControleSaldoProps) => {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [saldos, setSaldos] = useState<SaldoMensal[]>(
    saldosIniciais ||
      meses.map((mes) => ({
        mes,
        saldoBruto: 0,
        saldoFinal: 0,
      }))
  );

  useEffect(() => {
    onSaldoChange(saldos);
  }, [saldos, onSaldoChange]);

  const handleSaldoChange = (
    index: number,
    tipo: "saldoBruto" | "saldoFinal",
    valor: string
  ) => {
    const valorSemZerosEsquerda = valor.replace(/^0+/, "");
    const novoValor =
      valorSemZerosEsquerda === "" ? 0 : parseInt(valorSemZerosEsquerda);

    const novosSaldos = [...saldos];
    novosSaldos[index] = {
      ...novosSaldos[index],
      [tipo]: novoValor,
    };
    setSaldos(novosSaldos);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg w-full">
      <div className="text-white text-[14px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Controle de Saldo Mensal
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full">
        {saldos.map((saldo, index) => (
          <div
            key={index}
            className="flex flex-col space-y-2 p-4 bg-gray-700 rounded-lg"
          >
            <div className="text-white text-center text-[12px] sm:text-base md:text-lg lg:text-xl font-bold">
              {saldo.mes}
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <label className="text-white text-[10px] sm:text-sm md:text-base">
                  Saldo Bruto:
                </label>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2 text-[12px] sm:text-base">
                    R$
                  </span>
                  <input
                    type="number"
                    value={saldo.saldoBruto === 0 ? "" : saldo.saldoBruto}
                    onChange={(e) =>
                      handleSaldoChange(index, "saldoBruto", e.target.value)
                    }
                    className="w-full px-2 py-1 rounded bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none text-center text-[12px] sm:text-base"
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-white text-[10px] sm:text-sm md:text-base">
                  Saldo Final:
                </label>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2 text-[12px] sm:text-base">
                    R$
                  </span>
                  <input
                    type="number"
                    value={saldo.saldoFinal === 0 ? "" : saldo.saldoFinal}
                    onChange={(e) =>
                      handleSaldoChange(index, "saldoFinal", e.target.value)
                    }
                    className="w-full px-2 py-1 rounded bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none text-center text-[12px] sm:text-base"
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] sm:text-sm md:text-base pt-2 border-t border-gray-600">
              <span className="text-white">Diferença:</span>
              <span
                className={
                  saldo.saldoFinal - saldo.saldoBruto >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                R$ {saldo.saldoFinal - saldo.saldoBruto}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full p-4 bg-gray-700 rounded-lg mt-4">
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <span className="text-white text-[12px] sm:text-base md:text-lg font-semibold">
            Total Bruto:
          </span>
          <span className="text-green-500 font-bold text-[14px] sm:text-lg md:text-xl">
            R$ {saldos.reduce((acc, curr) => acc + curr.saldoBruto, 0)}
          </span>
        </div>
        <div className="flex flex-col items-center sm:items-end space-y-2">
          <span className="text-white text-[12px] sm:text-base md:text-lg font-semibold">
            Total Final:
          </span>
          <span className="text-green-500 font-bold text-[14px] sm:text-lg md:text-xl">
            R$ {saldos.reduce((acc, curr) => acc + curr.saldoFinal, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ControleSaldo;
