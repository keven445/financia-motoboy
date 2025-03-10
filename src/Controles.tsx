import { useState } from "react";

interface ControlesProps {
  onMultiplicadorChange: (valor: number) => void;
  multiplicadorAtual: number;
}

const Controles = ({
  onMultiplicadorChange,
  multiplicadorAtual,
}: ControlesProps) => {
  const [inputValue, setInputValue] = useState(multiplicadorAtual.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setInputValue(valor);
    const numeroValido = parseInt(valor);
    if (!isNaN(numeroValido)) {
      onMultiplicadorChange(numeroValido);
    }
  };

  const aumentarMultiplicador = () => {
    onMultiplicadorChange(multiplicadorAtual + 0.5);
    setInputValue((multiplicadorAtual + 0.5).toString());
  };

  const diminuirMultiplicador = () => {
    if (multiplicadorAtual > 1) {
      onMultiplicadorChange(multiplicadorAtual - 0.5);
      setInputValue((multiplicadorAtual - 0.5).toString());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4 bg-gray-800 rounded-lg gap-2 sm:gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={diminuirMultiplicador}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>

        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-20 px-2 py-1 text-black rounded text-center"
          min="1"
        />

        <button
          onClick={aumentarMultiplicador}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>

      <span className="text-white text-center">
        Multiplicador atual: {multiplicadorAtual}x
      </span>
    </div>
  );
};

export default Controles;
