import ControleSaldo from "../ControleSaldo";
import { Link } from "react-router-dom";

const SaldosPage = () => {
  const loadSaldos = () => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      return dados.saldosMensais || [];
    }
    return [];
  };

  const handleSaldoChange = (novosSaldos: any) => {
    const dadosSalvos = localStorage.getItem("financasApp");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      localStorage.setItem(
        "financasApp",
        JSON.stringify({ ...dados, saldosMensais: novosSaldos })
      );
    }
  };

  return (
    <div className="p-0.5 sm:p-2 md:p-4 space-y-1 sm:space-y-2 md:space-y-4 w-full mx-auto min-h-screen bg-gray-900">
      <div className="flex justify-between items-center w-full mb-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          ← Voltar
        </Link>
        <h1 className="text-base sm:text-lg md:text-2xl text-white font-bold text-center">
          Controle de Saldos
        </h1>
        <div className="w-[88px]"></div>
      </div>

      <div className="max-w-full mx-auto">
        <ControleSaldo
          onSaldoChange={handleSaldoChange}
          saldosIniciais={loadSaldos()}
        />
      </div>
    </div>
  );
};

export default SaldosPage;
