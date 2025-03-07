import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Multiplicaçao from "./Multiplicaçao";
import ResumoTotal from "./ResumoTotal";
import Controles from "./Controles";
import ControleFolga from "./ControleFolga";
import ControlePagamento from "./ControlePagamento";
import ControleGastos from "./ControleGastos";
import ControleEncosta from "./ControleEncosta";

// Valores padrão
const valoresPadrao = {
  valoresEncosta: [80, 80, 80, 0, 80, 80, 80],
  multiplicador: 5,
  diaFolga: 3,
  valoresPorDia: [0, 0, 0, 0, 0, 0, 0],
  gastos: {
    diarios: new Array(7).fill(0),
    semanais: [0],
  },
  saldosMensais: Array(12)
    .fill(0)
    .map((_, index) => ({
      mes: [
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
      ][index],
      saldoBruto: 0,
      saldoFinal: 0,
    })),
};

const App = () => {
  // Estados
  const [valoresMultiplicacao, setValoresMultiplicacao] = useState<number[]>(
    []
  );
  const [valoresEncosta, setValoresEncosta] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      try {
        const dados = JSON.parse(dadosSalvos);
        // Garante que o dia de folga está zerado nos valores iniciais
        const valoresIniciais =
          dados.valoresEncosta || valoresPadrao.valoresEncosta;
        const diaFolgaSalvo = dados.diaFolga || valoresPadrao.diaFolga;
        valoresIniciais[diaFolgaSalvo] = 0;
        return valoresIniciais;
      } catch (error) {
        console.error("Erro ao carregar valores da encosta:", error);
        return valoresPadrao.valoresEncosta;
      }
    }
    return valoresPadrao.valoresEncosta;
  });

  const [multiplicador, setMultiplicador] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.multiplicador || valoresPadrao.multiplicador;
    }
    return valoresPadrao.multiplicador;
  });

  const [diaFolga, setDiaFolga] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.diaFolga || valoresPadrao.diaFolga;
    }
    return valoresPadrao.diaFolga;
  });

  const [valoresPorDia, setValoresPorDia] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.valoresPorDia || valoresPadrao.valoresPorDia;
    }
    return valoresPadrao.valoresPorDia;
  });

  const [gastos, setGastos] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.gastos || valoresPadrao.gastos;
    }
    return valoresPadrao.gastos;
  });

  const [saldosMensais, setSaldosMensais] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.saldosMensais || valoresPadrao.saldosMensais;
    }
    return valoresPadrao.saldosMensais;
  });

  // Função para resetar todos os dados
  const resetarDados = () => {
    if (
      window.confirm(
        "Tem certeza que deseja resetar todos os dados para os valores padrão?"
      )
    ) {
      setValoresEncosta(valoresPadrao.valoresEncosta);
      setMultiplicador(valoresPadrao.multiplicador);
      setDiaFolga(valoresPadrao.diaFolga);
      setValoresPorDia(valoresPadrao.valoresPorDia);
      setGastos(valoresPadrao.gastos);
      setSaldosMensais(valoresPadrao.saldosMensais);
      localStorage.removeItem("financasApp");
    }
  };

  // Salva dados no localStorage quando houver mudanças
  useEffect(() => {
    const dadosParaSalvar = {
      valoresEncosta,
      multiplicador,
      diaFolga,
      valoresPorDia,
      gastos,
      saldosMensais,
    };

    try {
      localStorage.setItem("financasApp", JSON.stringify(dadosParaSalvar));
      console.log("Dados salvos:", dadosParaSalvar);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  }, [
    valoresEncosta,
    multiplicador,
    diaFolga,
    valoresPorDia,
    gastos,
    saldosMensais,
  ]);

  return (
    <div className="p-0.5 sm:p-2 md:p-4 space-y-1 sm:space-y-2 md:space-y-4 w-full mx-auto min-h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-1 sm:gap-2 max-w-7xl mx-auto">
        <h1 className="text-base sm:text-lg md:text-2xl text-white font-bold text-center">
          Controle Financeiro
        </h1>
        <div className="flex flex-col w-full gap-1 sm:gap-2">
          <Link
            to="/saldos"
            className="w-full px-1 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-2xs sm:text-sm md:text-base text-center"
          >
            Ver Saldos Mensais
          </Link>
          <button
            onClick={resetarDados}
            className="w-full px-1 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-2xs sm:text-sm md:text-base"
          >
            Resetar Dados
          </button>
          <button
            onClick={() => {
              const dadosSalvos = localStorage.getItem("financasApp");
              console.log(
                "Dados no localStorage:",
                dadosSalvos ? JSON.parse(dadosSalvos) : "Nenhum dado salvo"
              );
            }}
            className="w-full px-1 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-2xs sm:text-sm md:text-base"
          >
            Verificar Dados
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 sm:gap-2 max-w-full mx-auto">
        <div className="space-y-1 sm:space-y-2">
          <Controles
            multiplicadorAtual={multiplicador}
            onMultiplicadorChange={setMultiplicador}
          />
          <ControleFolga folgaAtual={diaFolga} onFolgaChange={setDiaFolga} />
          <ControlePagamento
            valores={valoresPorDia}
            onValoresChange={setValoresPorDia}
          />
          <ControleGastos onGastosChange={setGastos} gastosIniciais={gastos} />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
          <Multiplicaçao
            onValoresChange={setValoresMultiplicacao}
            multiplicador={multiplicador}
            folgaIndex={diaFolga}
            valores={valoresPorDia}
          />
          <ControleEncosta
            valores={valoresEncosta}
            onValoresChange={setValoresEncosta}
            diaFolga={diaFolga}
          />
          <ResumoTotal
            valoresMultiplicacao={valoresMultiplicacao}
            valoresEncosta={valoresEncosta}
            gastos={gastos}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
