import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ResumoTotal from "./ResumoTotal";
import ControleFolga from "./ControleFolga";
import ControlePagamento from "./ControlePagamento";
import ControleGastos from "./ControleGastos";
import ControleEncosta from "./ControleEncosta";
import { SaldoMensal } from "./ControleSaldo";

// Valores padrão
const valoresPadrao = {
  valoresEncosta: [0, 0, 0, 0, 0, 0, 0],
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

// Mover funções auxiliares para cima para que possam ser usadas na inicialização do estado
const formatMoedaDisplay = (num: number) => {
  if (num === 0) return "";
  return num.toFixed(2).replace(".", ",");
};

const App = () => {
  // Estados
  const [valoresEncosta, setValoresEncosta] = useState(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      try {
        const dados = JSON.parse(dadosSalvos);
        // Garante que o dia de folga está zerado nos valores iniciais
        const valoresIniciais =
          dados.valoresEncosta || valoresPadrao.valoresEncosta;
        const diasFolgaSalvos = dados.diasFolga || [valoresPadrao.diaFolga];
        diasFolgaSalvos.forEach((dia: number) => {
          if (dia !== valoresPadrao.diaFolga) {
            valoresIniciais[dia] = 0;
          }
        });
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

  const [diasFolga, setDiasFolga] = useState<number[]>(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.diasFolga || [valoresPadrao.diaFolga];
    }
    return [valoresPadrao.diaFolga];
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

  // Adicionar estado para as taxas de entrega
  const [taxasEntrega, setTaxasEntrega] = useState<number[]>(() => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.taxasEntrega || [0, 0, 0, 0, 0];
    }
    return [0, 0, 0, 0, 0];
  });

  // NOVO: Estado separado para o valor de exibição dos inputs de taxa
  const [taxasEntregaDisplay, setTaxasEntregaDisplay] = useState<string[]>(
    () => {
      const dadosSalvos = localStorage.getItem("financasApp");
      if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        const taxasNum: number[] = dados.taxasEntrega || [0, 0, 0, 0, 0];
        return taxasNum.map(formatMoedaDisplay);
      }
      return ["", "", "", "", ""];
    }
  );

  // Função para resetar todos os dados
  const resetarDados = () => {
    if (
      window.confirm(
        "Tem certeza que deseja resetar todos os dados para os valores padrão?"
      )
    ) {
      setValoresEncosta(valoresPadrao.valoresEncosta);
      setMultiplicador(valoresPadrao.multiplicador);
      setDiasFolga([valoresPadrao.diaFolga]);
      setValoresPorDia(valoresPadrao.valoresPorDia);
      setGastos(valoresPadrao.gastos);
      setSaldosMensais(valoresPadrao.saldosMensais);
      setTaxasEntrega([0, 0, 0, 0, 0]);
      setTaxasEntregaDisplay(["", "", "", "", ""]);
      localStorage.removeItem("financasApp");
    }
  };

  // Função para alternar folga
  const handleToggleFolga = (index: number) => {
    setDiasFolga((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]
    );
  };

  // Função para aplicar máscara de moeda brasileira durante a digitação
  const maskMoedaInput = (valor: string) => {
    // Remove tudo que não for número ou vírgula
    let v = valor.replace(/[^\d,]/g, "");

    // Garante que haja apenas uma vírgula
    const partes = v.split(",");
    if (partes.length > 2) {
      v = partes[0] + "," + partes.slice(1).join("");
    }

    // Limita a duas casas decimais
    if (partes.length === 2) {
      const [int, dec] = partes;
      if (dec.length > 2) {
        v = `${int},${dec.substring(0, 2)}`;
      }
    }

    return v;
  };

  const handleTaxaEntregaMaskedChange = (index: number, valor: string) => {
    const valorMasc = maskMoedaInput(valor);

    // Atualiza o estado de exibição para que o usuário veja o que digita
    const newDisplayValues = [...taxasEntregaDisplay];
    newDisplayValues[index] = valorMasc;
    setTaxasEntregaDisplay(newDisplayValues);

    // Atualiza o estado numérico para os cálculos
    const newNumericValues = [...taxasEntrega];
    newNumericValues[index] = parseFloat(valorMasc.replace(",", ".") || "0");
    setTaxasEntrega(newNumericValues);
  };

  // NOVO: Formata o valor quando o usuário clica fora do input
  const handleTaxaEntregaBlur = (index: number) => {
    const valorNumerico = taxasEntrega[index];
    const valorFormatado = formatMoedaDisplay(valorNumerico);

    const novasTaxasDisplay = [...taxasEntregaDisplay];
    if (novasTaxasDisplay[index] !== valorFormatado) {
      novasTaxasDisplay[index] = valorFormatado;
      setTaxasEntregaDisplay(novasTaxasDisplay);
    }
  };

  const handleAdicionarTaxa = (index: number) => {
    const valorAdicionar = taxasEntrega[index];
    if (valorAdicionar === 0) return;

    const mesAtual = new Date().getMonth();
    const diaAtual = new Date().getDay();

    setSaldosMensais((prev: SaldoMensal[]) =>
      prev.map((saldo: SaldoMensal, i: number) =>
        i === mesAtual
          ? {
              ...saldo,
              saldoBruto: Number(
                (saldo.saldoBruto + valorAdicionar).toFixed(2)
              ),
            }
          : saldo
      )
    );

    setValoresPorDia((prev: number[]) => {
      const novoArr = [...prev];
      novoArr[diaAtual] = (novoArr[diaAtual] || 0) + 1;
      return novoArr;
    });
  };

  // Pega o saldoBruto do mês atual
  const mesAtual = new Date().getMonth();
  const saldoBrutoMesAtual = saldosMensais[mesAtual]?.saldoBruto || 0;

  // Salva dados no localStorage quando houver mudanças
  useEffect(() => {
    const dadosParaSalvar = {
      valoresEncosta,
      multiplicador,
      diasFolga,
      valoresPorDia,
      gastos,
      saldosMensais,
      taxasEntrega,
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
    diasFolga,
    valoresPorDia,
    gastos,
    saldosMensais,
    taxasEntrega,
  ]);

  return (
    <div className="p-0 sm:p-1 md:p-1 space-y-0.5 sm:space-y-0.5 md:space-y-1 w-full mx-auto bg-gray-900">
      <div className="flex flex-col items-center gap-0.5 sm:gap-1 max-w-7xl mx-auto">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0.5 sm:gap-1 max-w-full mx-auto">
        <div className="space-y-0.5 sm:space-y-1">
          <ControleFolga
            diasFolga={diasFolga}
            onFolgaChange={handleToggleFolga}
          />
          <div className="flex flex-col items-center w-full">
            <span className="text-xs text-gray-300 mb-1">Taxas Manuais</span>
            <div className="flex flex-row flex-wrap gap-2 justify-center w-full bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md py-2 px-2 mb-2">
              {[0, 1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden"
                >
                  <input
                    type="text"
                    value={taxasEntregaDisplay[idx]}
                    onChange={(e) =>
                      handleTaxaEntregaMaskedChange(idx, e.target.value)
                    }
                    onBlur={() => handleTaxaEntregaBlur(idx)}
                    className="w-16 px-2 py-1 rounded-l-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-blue-400 text-center text-sm transition-all"
                    placeholder={`Taxa #${idx + 1}`}
                    inputMode="decimal"
                    pattern="[0-9,]*"
                  />
                  <button
                    onClick={() => handleAdicionarTaxa(idx)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-r-lg font-bold text-base flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <span className="text-lg leading-none">+</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <ControlePagamento
            valores={valoresPorDia}
            onValoresChange={setValoresPorDia}
          />
          <ControleGastos onGastosChange={setGastos} gastosIniciais={gastos} />
        </div>
        <div className="flex flex-col gap-0.5 sm:gap-1 lg:gap-2">
          <ControleEncosta
            valores={valoresEncosta}
            onValoresChange={setValoresEncosta}
            diasFolga={diasFolga}
          />
          <ResumoTotal
            valoresMultiplicacao={[]}
            valoresEncosta={valoresEncosta}
            gastos={gastos}
            saldoBrutoMesAtual={saldoBrutoMesAtual}
            totalTaxasManuais={taxasEntrega.reduce((acc, v) => acc + v, 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
