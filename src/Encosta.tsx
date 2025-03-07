interface EncostaProps {
  onValoresChange: (valores: number[]) => void;
  valores: number[];
}

const Encosta = ({ onValoresChange, valores }: EncostaProps) => {
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
    const numeroValido = parseInt(novoValor) || 0;
    const novosValores = [...valores];
    novosValores[index] = numeroValido;
    onValoresChange(novosValores);
  };

  return (
    <div className="text-white border-2 p-4 rounded-lg">
      <div className="text-xl font-bold mb-4">Valores da Encosta</div>
      <div className="space-y-2">
        {valores.map((valor, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-24">{diasSemana[index]}:</span>
            <input
              type="number"
              value={valor}
              onChange={(e) => handleValorChange(index, e.target.value)}
              className="w-24 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              min="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Encosta;
