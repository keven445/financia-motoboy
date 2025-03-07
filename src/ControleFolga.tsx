interface ControleFolgaProps {
  onFolgaChange: (index: number) => void;
  folgaAtual: number;
}

const ControleFolga = ({ onFolgaChange, folgaAtual }: ControleFolgaProps) => {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  return (
    <div className="border-3 flex flex-col items-center p-0.5 sm:p-2 md:p-4 bg-gray-800 rounded-lg w-full">
      <span className="text-[10px] sm:text-sm md:text-lg lg:text-xl text-white mb-1 sm:mb-2 md:mb-4 text-center font-semibold">
        Folga:
      </span>
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 justify-center w-full max-w-4xl mx-auto">
        {diasSemana.map((dia, index) => (
          <button
            key={index}
            onClick={() => onFolgaChange(index)}
            className={`min-w-[60px] sm:min-w-[80px] md:min-w-[100px] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded text-[10px] sm:text-sm md:text-base lg:text-lg ${
              index === folgaAtual
                ? "bg-yellow-500 text-black font-bold"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
          >
            {dia}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ControleFolga;
