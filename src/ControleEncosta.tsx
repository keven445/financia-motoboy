import { useEffect } from "react";

interface ControleEncostaProps {
  onValoresChange: (valores: number[]) => void;
  valores: number[];
  diasFolga: number[];
}

const ControleEncosta = ({
  onValoresChange,
  valores,
  diasFolga,
}: ControleEncostaProps) => {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  // Atualiza a encosta quando os dias de folga mudam, zerando todos os dias de folga
  useEffect(() => {
    let precisaAtualizar = false;
    const novosValores = valores.map((valor, index) => {
      if (diasFolga.includes(index) && valor !== 0) {
        precisaAtualizar = true;
        return 0;
      }
      return valor || 0;
    });
    if (precisaAtualizar) {
      onValoresChange(novosValores);
    }
  }, [diasFolga]);

  const maskMoeda = (valor: string) => {
    // Remove tudo que não for número ou vírgula
    let v = valor.replace(/[^\d,]/g, "");

    // Se tem mais de uma vírgula, mantém só a primeira
    const partes = v.split(",");
    if (partes.length > 2) {
      v = partes[0] + "," + partes[1];
    }

    // Se for só vírgula, retorna vazio
    if (v === ",") return "";

    // Se começar com vírgula, adiciona zero na frente
    if (v.startsWith(",")) {
      v = "0" + v;
    }

    // Se não tem vírgula e tem mais de 2 dígitos, formata com vírgula
    if (!v.includes(",") && v.length > 2) {
      v = v.slice(0, -2) + "," + v.slice(-2);
    }

    // Se tem vírgula, garante que tenha até 2 casas decimais
    if (v.includes(",")) {
      const [int, dec] = v.split(",");
      v = int + "," + (dec || "").padEnd(2, "0").slice(0, 2);
    }

    return v;
  };

  const handleValorChange = (index: number, novoValor: string) => {
    const valorMasc = maskMoeda(novoValor);
    const numeroValido =
      valorMasc === "" ? 0 : parseFloat(valorMasc.replace(",", "."));
    const novosValores = [...valores];
    novosValores[index] = numeroValido;
    onValoresChange(novosValores);
  };

  // Função para alternar seleção de dias de folga
  const handleToggleFolga = () => {
    // Corrigir: remover variável não utilizada
    // let novosDiasFolga = [];
    // if (diasFolga.includes(index)) {
    //   novosDiasFolga = diasFolga.filter((d) => d !== index);
    // } else {
    //   novosDiasFolga = [...diasFolga, index];
    // }
    // A lógica correta deve ser feita no componente pai via props
  };

  return (
    <div className="text-white border border-gray-700 p-4 rounded-lg w-full">
      <div className="text-[14px] sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center w-full">
        Encosta
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {diasSemana.map((dia, index) => (
          <button
            key={index}
            onClick={() => handleToggleFolga()}
            className={`px-2 py-1 rounded text-xs font-bold border ${
              diasFolga.includes(index)
                ? "bg-yellow-400 text-black border-yellow-500"
                : "bg-gray-700 text-white border-gray-600"
            }`}
          >
            {dia} {diasFolga.includes(index) && "(Folga)"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {valores.map((valor, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 w-full"
          >
            <span className="text-[12px] sm:text-base md:text-lg lg:text-xl font-semibold w-full text-center">
              {diasSemana[index]}
              {diasFolga.includes(index) && (
                <span className="text-yellow-400 ml-1">F</span>
              )}
            </span>
            <input
              type="text"
              value={
                valor === 0 ? "" : maskMoeda(valor.toString().replace(".", ","))
              }
              onChange={(e) => handleValorChange(index, e.target.value)}
              className={`w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded text-[12px] sm:text-base md:text-lg text-center ${
                diasFolga.includes(index)
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-700 text-white"
              } border border-gray-600 focus:border-blue-500 focus:outline-none`}
              min="0"
              disabled={diasFolga.includes(index)}
              inputMode="decimal"
              pattern="[0-9,]*"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControleEncosta;
