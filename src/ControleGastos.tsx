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
    <div className="p-0.5 sm:p-2 md:p-4 space-y-1 sm:space-y-2 md:space-y-4 w-full mx-auto min-h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-1 sm:gap-2 max-w-7xl mx-auto relative pb-32">
        {/* Botão de Finalizar Semana */}
        <div className="w-full flex justify-end mt-4">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Deseja finalizar esta semana? Os valores serão salvos e zerados."
                )
              ) {
                const dadosAtuais = localStorage.getItem("financasApp");
                if (dadosAtuais) {
                  const dados = JSON.parse(dadosAtuais);

                  // Calcula os totais da semana
                  const totalMultiplicacao = dados.valoresPorDia.reduce(
                    (acc: number, val: number, index: number) =>
                      index === dados.diaFolga
                        ? acc
                        : acc + val * dados.multiplicador,
                    0
                  );
                  const totalEncosta = dados.valoresEncosta.reduce(
                    (acc: number, val: number) => acc + val,
                    0
                  );
                  const totalGastos =
                    dados.gastos.diarios.reduce(
                      (acc: number, val: number) => acc + val,
                      0
                    ) + dados.gastos.semanais[0];

                  const totalSemana =
                    totalMultiplicacao + totalEncosta - totalGastos;

                  // Atualiza os saldos mensais
                  const mesAtual = new Date().getMonth();

                  // Inicializa ou atualiza os saldos mensais dentro do próprio objeto dados
                  if (!dados.saldosMensais) {
                    dados.saldosMensais = new Array(12).fill(null).map(() => ({
                      saldoBruto: 0,
                      saldoFinal: 0,
                    }));
                  }

                  // Atualiza o mês atual
                  if (!dados.saldosMensais[mesAtual]) {
                    dados.saldosMensais[mesAtual] = {
                      saldoBruto: 0,
                      saldoFinal: 0,
                    };
                  }

                  dados.saldosMensais[mesAtual] = {
                    saldoBruto:
                      Number(dados.saldosMensais[mesAtual].saldoBruto) +
                      totalMultiplicacao +
                      totalEncosta,
                    saldoFinal:
                      Number(dados.saldosMensais[mesAtual].saldoFinal) +
                      totalSemana,
                  };

                  // Salva tudo de volta no financasApp
                  localStorage.setItem("financasApp", JSON.stringify(dados));

                  // Reseta os valores para a próxima semana
                  const valoresPadrao = {
                    ...dados,
                    valoresEncosta: [80, 80, 80, 0, 80, 80, 80],
                    multiplicador: 5,
                    diaFolga: 3,
                    valoresPorDia: [0, 0, 0, 0, 0, 0, 0],
                    gastos: {
                      diarios: new Array(7).fill(0),
                      semanais: [0],
                    },
                  };

                  localStorage.setItem(
                    "financasApp",
                    JSON.stringify(valoresPadrao)
                  );

                  alert(
                    `Semana finalizada!\n\nValores salvos no mês de ${
                      [
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
                      ][mesAtual]
                    }\n\nSaldo Bruto: R$${
                      totalMultiplicacao + totalEncosta
                    }\nSaldo Final: R$${totalSemana}`
                  );

                  window.location.reload();
                }
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 text-base sm:text-lg"
          >
            <span></span>
            <span>Finalizar Semana</span>
          </button>
        </div>

        <h1 className="text-base sm:text-lg md:text-2xl text-white font-bold text-center">
          Controle Financeiro
        </h1>

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
                  onChange={(e) =>
                    handleGastoDiarioChange(index, e.target.value)
                  }
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
    </div>
  );
};

export default ControleGastos;
