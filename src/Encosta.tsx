interface EncostaProps {
  onValoresChange: (valores: number[]) => void;
  valores: number[];
}

const Encosta = ({ onValoresChange, valores }: EncostaProps) => {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  // Função para aplicar máscara de moeda brasileira
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

  const handleValorMaskedChange = (index: number, valor: string) => {
    const valorMasc = maskMoeda(valor);
    const novosValores = [...valores];
    novosValores[index] =
      valorMasc === "" ? 0 : parseFloat(valorMasc.replace(",", "."));
    onValoresChange(novosValores);
  };

  return (
    <div className="text-white border-2 p-4 rounded-lg">
      <div className="text-xl font-bold mb-4">Valores da Encosta</div>
      <div className="space-y-2">
        {valores.map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-24">{diasSemana[index]}:</span>
            <input
              type="text"
              value={
                valores[index] === 0
                  ? ""
                  : maskMoeda(valores[index].toString().replace(/\./, ","))
              }
              onChange={(e) => handleValorMaskedChange(index, e.target.value)}
              className="w-24 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              min="0"
              inputMode="decimal"
              pattern="[0-9,]*"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Encosta;
