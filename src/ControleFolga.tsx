interface ControleFolgaProps {
  onFolgaChange: (index: number) => void;
  diasFolga: number[];
}

const ControleFolga = ({ onFolgaChange, diasFolga }: ControleFolgaProps) => {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  return (
    <div className="border-3 flex flex-col items-center p-0.5 sm:p-2 md:p-4 bg-gray-800 rounded-lg w-full">
      <span className="text-[10px] sm:text-sm md:text-lg lg:text-xl text-white mb-1 sm:mb-2 md:mb-4 text-center font-semibold">
        Folgas:
      </span>
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 justify-center w-full max-w-4xl mx-auto">
        {diasSemana.map((dia, index) => (
          <button
            key={index}
            onClick={() => onFolgaChange(index)}
            className={`min-w-[60px] sm:min-w-[80px] md:min-w-[100px] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded text-[10px] sm:text-sm md:text-base lg:text-lg font-bold border transition-colors duration-200 ${
              diasFolga.includes(index)
                ? "bg-yellow-500 text-black border-yellow-600"
                : "bg-gray-600 text-white border-gray-500 hover:bg-gray-500"
            }`}
          >
            {dia}{" "}
            {diasFolga.includes(index) && (
              <span className="text-yellow-900">(Folga)</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ControleFolga;
